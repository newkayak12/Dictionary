
# Kafka Payload 패턴 상세 분석

## 1. ZeroPayload

### 구조 예시

json

```json
// 메시지 본문 없음, 키와 헤더만 사용
key: "user:12345"
headers: { "event-type": "user-deleted", "timestamp": "2024-01-01T10:00:00Z" }
value: null
```

### 상세 특징

- **메시지 크기**: ~100bytes (헤더 포함)
- **처리 속도**: 가장 빠름 (파싱 오버헤드 없음)
- **Consumer 부담**: DB/API 조회 필수
- **일관성 이슈**: 이벤트와 실제 데이터 간 시차 발생 가능

### 실무 사용 사례

- Redis 캐시 무효화 신호
- ElasticSearch 인덱스 리프레시 트리거
- 배치 작업 실행 신호

---

## 2. MinimalPayload

### 구조 예시

json

```json
{
  "id": "12345",
  "eventType": "USER_UPDATED", 
  "timestamp": "2024-01-01T10:00:00Z",
  "version": 5
}
```

### 상세 특징

- **메시지 크기**: 200-500bytes
- **조회 최적화**: ID 기반 캐시/DB 조회
- **버전 관리**: 낙관적 락 지원 가능
- **네트워크 효율**: 높은 처리량 유지

### 실무 고려사항

- Consumer에서 조회 실패 시 DLQ 처리
- 캐시 Miss 시 DB 부하 증가
- API Rate Limiting 고려 필요

---

## 3. FullPayload

### 구조 예시

json

```json
{
  "id": "12345",
  "eventType": "USER_UPDATED",
  "timestamp": "2024-01-01T10:00:00Z",
  "data": {
    "userId": "12345",
    "name": "홍길동",
    "email": "hong@example.com",
    "profile": { /* 전체 프로필 데이터 */ },
    "preferences": { /* 모든 설정 */ }
  }
}
```

### 상세 특징

- **메시지 크기**: 1KB-100KB+ (데이터 의존적)
- **독립성**: Consumer가 완전 자립적 처리
- **스키마 진화**: 하위 호환성 관리 필요
- **압축 효과**: Kafka 압축 알고리즘 효과적

### 성능 고려사항

- **파티션 크기**: 큰 메시지로 인한 파티션 불균형
- **메모리 사용**: Consumer 힙 메모리 증가
- **네트워크**: 대역폭 사용량 증가

---

## 4. DeltaPayload

### 구조 예시

json

```json
{
  "id": "12345",
  "eventType": "USER_UPDATED",
  "timestamp": "2024-01-01T10:00:00Z",
  "changes": {
    "email": {
      "old": "old@example.com",
      "new": "new@example.com"
    },
    "lastLoginAt": {
      "new": "2024-01-01T09:30:00Z"
    }
  }
}
```

### 상세 특징

- **메시지 크기**: 변경량에 비례 (100bytes-10KB)
- **순서 보장**: 파티션 키 설계 중요
- **상태 재구성**: 이벤트 순서대로 재생 필요
- **압축 효율**: 변경 데이터만으로 높은 압축률

### 구현 복잡도

- **Conflict 해결**: 동시 수정 시 충돌 처리
- **Missing Events**: 이벤트 유실 시 복구 전략
- **Schema Evolution**: 필드 추가/삭제 시 호환성

---

## 5. ReferencePayload

### 구조 예시

json

```json
{
  "id": "12345", 
  "eventType": "FILE_UPLOADED",
  "timestamp": "2024-01-01T10:00:00Z",
  "reference": {
    "type": "S3",
    "bucket": "my-data-bucket",
    "key": "users/12345/profile.json",
    "version": "v1.2.0",
    "checksum": "sha256:abc123..."
  }
}
```

### 상세 특징

- **메시지 크기**: 고정적으로 작음 (~1KB)
- **대용량 처리**: GB 단위 데이터 처리 가능
- **저장소 확장**: S3, GCS, Redis 등 다양한 백엔드
- **체크섬 검증**: 데이터 무결성 보장

### 운영 고려사항

- **TTL 관리**: 참조 데이터의 생명주기
- **접근 권한**: 저장소 권한 관리
- **장애 격리**: 저장소 장애 시 영향도
- **비용 최적화**: 저장소 비용 vs Kafka 비용

---

## 패턴 선택 매트릭스

### 메시지 크기별

- **< 1KB**: ZeroPayload, MinimalPayload
- **1KB-10KB**: FullPayload, DeltaPayload
- **> 10KB**: ReferencePayload

### 처리량별

- **High TPS** (10k+): ZeroPayload, MinimalPayload
- **Medium TPS** (1k-10k): FullPayload, DeltaPayload
- **Low TPS** (< 1k): 모든 패턴 적용 가능

### Consumer 복잡도별

- **단순 처리**: FullPayload
- **조회 로직 포함**: MinimalPayload, ZeroPayload
- **상태 재구성**: DeltaPayload
- **외부 시스템 연계**: ReferencePayload

### 일관성 요구사항별

- **강한 일관성**: FullPayload, DeltaPayload
- **최종 일관성**: MinimalPayload, ReferencePayload
- **일관성 불필요**: ZeroPayload