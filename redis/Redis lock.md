
## Redis lock?
 - 분산 환경에서 동시성 제어(Distributed Lock)을 구현하기 위한 기술
 - 여러 서버가 동시에 같은 자원에 접근할 때, 중복 처리나 데이터 충돌을 방지하기 위해서 사용한다.


### Redis를 선택하는 이유?
|     방식     |     장점     |      단점       |
| :--------: | :--------: | :-----------: |
|  DB Lock   | 데이터 일관성 확실 |   느림, DB 병목   |
| Redis Lock | 빠름, 분산 처리  | Redis 장애 시 영향 |

## 핵심 개념
1. 목적: 동일 자원에 대한 동시 접근 제어
2. 원리: Redis의 원자적 연산 이용
	1. Redis는 SingleThread로 동작
	2. 모든 명령을 순차적으로 처리
	3. TTL로 데드락 방지

## 구현 방식

### Mutex
1. Binary Lock: 0 또는 1
2. 1개만 접근: 한 번에 하나만 접근 가능
3. 소유권 : 획득자만 해제할 수 있음

#### Redis lock

1. `SETNX` 기반 
> - SET if Not eXists
> - 키가 없을 떄만 값 설정
> - 이미 있으면 실패
> - TTL 설정이 X

2. `SET NX PX` 기반
> - `SET lock:product:123 "uuid" NX PX 3000`
> 	- lock:product:123 -> 어떤 자원에 대한 락인지
> 	- "uuid" -> 누가 만든 락인지
> 	- NX -> Not eXists
> 	- PX 3000 -> 3초

3. Lua Script
> - Redis에서 실행되는 스크립트 언어
> - 여러 명령을 하나로 묶어서 원자적 실행

```lua
if redis.call("GET", KEYS[1]) == ARGV[1] then
	return redis.call("DEL", KEYS[1]) 
else
	return 0 end
```


### Semaphore
1. counting: 0개 이상
2. 동시 접근 : 동시에 여러 개 접근 가능
3. 소유권: 없음

#### Redis lock
1. `SET semaphore:restaurant:123:18:00 3`
> - `SET`
> - `semaphore:restaurant:123`
> - `18:00`
> - `3` : 남은 개수

---

## Redissen
- Redis 기반 분산 락을 쉽게 사용할 수 있는 검증된 Java 라이브러리
- 직접 구현해야 하는 복잡한 로직들이 이미 구현되어 있음

### 제공 기능
1. Lua 스크립트 기반 안전한 락 
   ➡️ 내부적으로 안전한 획득/ 해제 구현
2. Pub/Sub 기반 대기
   ➡️ Spin Lock + Pub/Sub
3. Watchdog(자동 TTL 연장)
   ➡️ 작업이 오래 걸리면 자동으로 TTL 연장
   ➡️ 작업 중 락 만료 방지
4. Reentrant Lock(재진입 락)
   ➡️ 같은 쓰레드가 여러 번 획득 가능



---
## RedLock?
- 여러 개의 독립적인 Redis 인스턴스를 사용하여, 단일 장애점 없이 분산 락을 구현하는 방법

```text
과반수 투표 방식

N개의 독립 Redis 중 ➡️ 과반수 이상에서 락을 획득 했다면 ➡️ 전체 락 획득으로 간주
```

- Single Redis는 `Single Point of Failure` 로 작용할 수 있음
- Master-Slave Replication는 Master-Replication 간 타이밍 이슈로 Master가 죽으면 락이 소실될 수 있음

## RedLock
- 각각 독립적인 인스턴스(홀수)
- 각각 락을 가지고 과반수 이상이라면 Lock 획득

## 속성
1. 상호 배제(Mutual Exclusion) : 2개 이상의 클라이언트 락 획득 불가
2. Deadlock Free : TTL로 교착상태 없음
3. Fault Tolerance : 과반수 이상일 때 Lock을 부여하므로 과반 이외의 경우 장애 허용
4. Eventually Acquired : 락을 원하는 클라이언트는 결과적으로 락을 획득하도록 설계됨
## 한계
- 장애 상황: 5개의 Redis 중 2개까지는 장애가 발생해도 락 획득이 가능한 구조
- 네트워크 파티션 : Client가 5개 중 3개와 통신이 끊기면 아무리 2개에서 락을 획득해도 결과적으로 락 획득에 실패하는 구조
- 느린 응답 : 하나의 느린 Redis 인스턴스가 나머지 인스턴스 속도 상관 없이 락을 획득하는 시간을 좌우
- Clock Drift: 서버 간 시간 불일치로 TTL 차이 발생 가능
- GC Pause: 하나의 인스턴스에서 GC 발생으로 Pause가 되면 나머지는 TTL이 흐르는 상황 발생