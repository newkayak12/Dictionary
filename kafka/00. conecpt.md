## 1. Kafka 기본 개념과 아키텍처

### 핵심 컴포넌트

- **Kafka 클러스터**: 여러 Broker로 구성된 분산 시스템
- **Broker**: Kafka 서버 인스턴스. 메시지 저장/전달 담당
- **Topic**: 메시지 카테고리. 논리적 메시지 분류 단위
- **Partition**: Topic의 물리적 분할 단위. 병렬 처리와 확장성 제공
- **Producer**: 메시지 발행자. Topic에 메시지 전송
- **Consumer**: 메시지 구독자. Topic에서 메시지 소비
- **Consumer Group**: 동일 Topic을 병렬로 소비하는 Consumer들의 집합

### 분산 아키텍처 원리

**왜 분산인가?**

- 대용량 데이터 처리를 위한 수평 확장성
- 단일 장애점 제거를 통한 고가용성
- 지리적 분산을 통한 지연시간 최적화

**Partition의 존재 이유**

- **병렬성**: 여러 Consumer가 동시에 다른 Partition 처리
- **순서 보장**: Partition 내에서만 메시지 순서 보장
- **확장성**: Partition 수 = 최대 Consumer 수

### 메시지 저장 구조

```
Topic: user-events
├── Partition 0: [msg0, msg3, msg6, ...]
├── Partition 1: [msg1, msg4, msg7, ...]
└── Partition 2: [msg2, msg5, msg8, ...]
```

**Offset 메커니즘**

- 각 Partition 내 메시지의 고유 순번
- Consumer가 읽을 위치 추적
- 불변성: 한 번 할당되면 변경 불가

**Replication Factor**

- 데이터 복제본 수 (일반적으로 3)
- Leader Partition: 읽기/쓰기 담당
- Follower Partition: Leader 복제본 유지

**Log Retention**

- 시간 기반: 7일 후 삭제
- 크기 기반: 1GB 초과 시 삭제
- Compaction: 키별 최신 메시지만 유지

### 메시지 순서 보장 전략

- **Partition 레벨**: 같은 Partition 내 순서 보장
- **Key 기반 라우팅**: 동일 키 → 동일 Partition
- **Global 순서**: 전체 Topic에서 순서 필요 시 Partition 1개 사용