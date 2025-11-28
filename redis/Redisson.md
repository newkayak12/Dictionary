## 정의

- Redis 기반 분산 유틸리티 구현체.
- Redis의 primitive 명령어를 활용해 분산 락, 컬렉션, 동기화 구조 등을 구체적으로 구현. 
- Lettuce/Jedis는 Redis 명령어 wrapper, Redisson은 분산 시스템 패턴 구현.
- Netty 기반 비동기 non-blocking I/O.

## 1. 분산 락 (Distributed Lock)

### 왜 필요한가?
멀티 서버 환경에서 동시성 문제 해결이 필요하다.
**모놀리식이라면:**
```
synchronized, ReentrantLock 등으로 JVM 내에서 해결
```

**마이크로서비스라면:**
```
Server A와 Server B가 동시에 같은 작업을 시도
→ 경쟁 조건 발생
→ 데이터 일관성 깨짐
```

**기본 원리:**
- Redis의 SET NX EX 명령어 활용
- 원자적 연산으로 락 획득/해제
- TTL로 데드락 방지

**Redisson의 개선사항:**
- **Watchdog**: 작업 시간이 길어지면 자동으로 락 연장
- **재시도**: tryLock으로 대기 시간 설정 가능
- **공정성**: Fair Lock으로 FIFO 순서 보장


### 1. 기본 락 (RLock)
##### 특징
- **재진입 가능**: 같은 스레드가 여러 번 락 획득 가능
- **Watchdog**: 작업 시간이 길어지면 자동으로 락 연장
- **비공정**: 먼저 온 요청이 먼저 처리된다는 보장 없음
##### 사용처
- **일반적인 동시성 제어**
- 성능이 중요하고 순서는 상관없을 때
- 대부분의 비즈니스 로직에서 사용


### 2. 공정 락 (RFairLock)
##### 특징
- **FIFO 순서 보장**: 먼저 요청한 순서대로 락 획득
- **기아 현상 방지**: 계속 밀려나는 요청 없음
- **성능 오버헤드**: 순서 관리로 인한 추가 비용
##### 사용처
- 순서가 중요한 시스템


### 3.멀티 락 (MultiLock)
##### 특징
- **여러 락 동시 획득**: 모든 락을 성공적으로 획득해야 완료
- **데드락 방지**: 내부적으로 순서 관리
- **원자성**: 일부만 획득하면 모두 해제
##### 사용처
- 여러 리소스를 동시에 사용해야 하는 경우
 
 
### 4. 읽기-쓰기 락 (ReadWriteLock)
##### 특징
- **읽기 락**: 여러 스레드가 동시 획득 가능
- **쓰기 락**: 독점적 획득 (읽기/쓰기 모두 차단)
- **성능 최적화**: 읽기 작업이 많은 경우 유리
##### 사용처
- 읽기 성능이 중요한 경우


### 5. 스핀 락 (SpinLock)
##### 특징
- **바쁜 대기**: 락을 획득할 때까지 계속 시도
- **컨텍스트 스위치 없음**: 스레드가 블록되지 않음
- **CPU 소모**: 대기 중에도 CPU 사용
##### 사용처
- 임계 구역이 짧은 경우
- 락 보유 시간 < 컨텍스트 스위칭 비용


### 6. 펜스 락 (FencedLock)
##### 특징
- **토큰 기반**: 락 획득시 증가하는 토큰 제공
- **과거 락 소유자 차단**: 토큰으로 낡은 락 작업 방지
- **분산 환경 안전성**: 네트워크 지연/분할 상황 대응
##### 사용처
- 분산 환경에서 순서가 중요한 경우


### 7. 세마포어 (RSemaphore)
##### 특징
- **N개 허가증**: 동시에 N개까지 락 획득 가능
- **카운팅**: 사용 중인 허가증 수 추적
- **블로킹**: 허가증이 없으면 대기
#### 사용처
- API 동시 호출 제한


### 8. 만료 세마포어 (RPermitExpirableSemaphore)
##### 특징
- **자동 만료**: 허가증이 일정 시간 후 자동 반납
- **데드락 방지**: 프로세스 크래시 시에도 안전
- **허가증 ID**: 각 허가증에 고유 식별자
##### 사용처
- 장시간 작업의 리소스 제한


### 9. 카운트다운 래치
##### 특징
- **N개 작업 대기**: 여러 작업이 완료될 때까지 대기
- **카운트 감소**: 작업 완료시마다 카운트 1씩 감소
- **0 도달시 해제**: 모든 작업 완료 후 대기 중인 스레드들 깨움
##### 사용처
- 병렬 작업 완료 대기 (병렬 작업이 끝나면 `countDown()`를 하고 끝나면 원래 작업 깨움)

--------
## 2. RateLimiter
### 왜 필요한가?
- 시스템 보호와 공정한 리소스 사용을 위해서이다.
### 핵심 문제들
- **시나리오 1: API 남용 공격**
- 시나리오 2: 외부 API 제한 준수
- 시나리오 3: 비용 폭증

### 특징
#### 1. 토큰 버킷 알고리즘
- **일정 시간마다 토큰 생성**
- **요청시 토큰 소모**
- **토큰 없으면 요청 거부**
#### 2. 제한 타입 (RateType)
- **PER_CLIENT (클라이언트별)**
- OVERALL (전체 통합)








-------
# ⚠️ 그 외

## Redisson 전체 기능 목록

### 🔐 **분산 락 & 동기화**
- 분산 락 (RLock, RFairLock, RFencedLock)
- 멀티 락 (MultiLock)
- 읽기/쓰기 락 (ReadWriteLock)
- 세마포어 (RSemaphore, RPermitExpirableSemaphore)
- 카운트다운래치 (RCountDownLatch)

### ⚡ **속도 제한 & 제어**
- Rate Limiter (RRateLimiter)
- 유효기간 세마포어

### 📚 **분산 컬렉션**
- 맵 (RMap, RMapCache, RLocalCachedMap, RMultimap)
- 리스트 (RList, RQueue, RDeque, RBlockingQueue)
- 셋 (RSet, RSortedSet, RSetCache, RLexSortedSet)
- JSON 저장소 (RJsonStore - PRO)

### 🎯 **분산 객체**
- 버킷 (RBucket) - 단일 객체 홀더
- 바이너리 스트림 (RBinaryStream)
- 원자적 숫자 (RAtomicLong, RAtomicDouble)
- 비트셋 (RBitSet, RClusteredBitSet - PRO)
- 지리공간 (RGeo)

### 📊 **확률적 데이터 구조**
- 블룸 필터 (RBloomFilter, RClusteredBloomFilter - PRO)
- 하이퍼로그로그 (RHyperLogLog)

### 📢 **발행/구독**
- 토픽 (RTopic, RPatternTopic)
- 신뢰성 토픽 (RReliableTopic)
- 샤드 토픽 (RShardedTopic)
- 클러스터 토픽 (RClusteredTopic - PRO)

### ⚙️ **분산 서비스**
- 실행자 서비스 (RExecutorService, RScheduledExecutorService)
- 원격 서비스 (RRemoteService)
- MapReduce
- 라이브 객체 (RLiveObjectService)
- 스크립트 (RScript)
- 함수 (RFunction)

### 💾 **캐시 통합**
- JCache (JSR-107)
- Spring Cache
- Hibernate 2nd Level Cache
- MyBatis Cache
- Tomcat Session Manager

### 🔄 **트랜잭션**
- 트랜잭션 (RTransaction)
- XA 트랜잭션 (RXAResource - PRO)

### 🔍 **검색 & 분석**
- 전문 검색 (RSearch)
- 스펠체크 (Spellcheck)
- 집계 (Aggregation)
- 인덱스 관리

### 🌐 **클러스터 관리**
- 노드 그룹 (RClusterNodesGroup)
- 슬롯 이동
- 멀티 클러스터 (Multi-Cluster - PRO)

### 🔧 **개발자 도구**
- 객체 참조 (Object References)
- 이벤트 리스너
- 코덱 (Codec)
- 연결 풀 관리