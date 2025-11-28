## # Cache Stampede (스탬피드)

## 문제 상황

- **정의**: 캐시 만료 시 동시 요청들이 모두 DB 조회
- **결과**: DB 부하 급증, 응답시간 증가
- **별명**: Thunder Herd Problem

## 발생 시나리오

```
인기 데이터 캐시 만료 → 100개 동시 요청 → 100개 DB 쿼리 실행
```

## 해결 방법

### 1. Mutex Lock (가장 일반적)

kotlin

```kotlin
// Redis SETNX 활용
if (redis.setNX("lock:user:${id}", "1", 10)) {
    // DB 조회 후 캐시 저장
} else {
    // 잠시 대기 후 캐시 재조회
}
```

### 2. Probabilistic Early Expiration

- **방식**: TTL의 일정 비율 전에 미리 갱신
- **예시**: TTL 10분이면 8-9분에 랜덤 갱신

### 3. Background Refresh

- **방식**: 만료 전 백그라운드에서 미리 갱신
- **구현**: Spring `@Async` + 스케줄러

### 4. Cache Warming

- **방식**: 서버 시작 시 인기 데이터 미리 로드