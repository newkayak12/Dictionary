# Redis(REmote DIctionary Server)

[learn_redis](https://github.com/newkayak12/Learn_Redis)
[참고1](https://inpa.tistory.com/entry/REDIS-%F0%9F%93%9A-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%83%80%EC%9E%85Collection-%EC%A2%85%EB%A5%98-%EC%A0%95%EB%A6%AC)

## 특징
1. key-value 스토어 (Dictionary)
2. 컬렉션을 지원한다.(List, Set, SortedSet Hash)
3. Pub/Sub 지원
4. 단순 Memory DB/Cache 뿐만 아니라 디스크에 파일로 저장해서 DB로서 사용할 수 있다.
5. master-slave의 replication이 가능하다.

## 데이터 타입

### 1. Strings
- value에 문자, 숫자를 저장. (`incr`, `incrby`, `decr`, `decrby` 같은 atomicCounter 연산이 가능하다.)
- 최대 길이 512MB
- 단순 증감 연산에 좋음
- 

#### 명령어
- DECR : 감소 연산자
- DECRBY : 감소 연산자
- DEL : Key로 삭제
- GET : Key 조회
- GETSET : Key로 조회하고 새 데이터 저장
- INCR : 증가 연산자
- INCRBY : 증가 연산자
- MGET : Multi Get
- SET : Key로 저장 있으면 덮어쓴다.
- SETNX : set Not X로 보임 없으면 저장
- MSET : Multi Set
- APPEND : 데이터 추가, KEY가 없다면 첫 저장
- SETEX : SET EXPIRATION 으로 TTL 둔 SET으로 보임 단위는 (초)
- PSETEX : 지정한 시간 후 자동 삭제  단위는 (밀리세컨드)
- GETEX : 데이터 조회와 만료 시간 설정
- GETDEL : 데이터 조회와 삭제

### 2. Bitmaps
- String의 변형
- bit 연산에 특화
- 저장 공간 절약이 장점

#### 명령어
- GETBIT : bit 값 조회
- SETBIT : bit 값 조정
- BITCOUNT : 1인 BIT를 센다.
- BITOP : BIT OPeration (AND, OR, XOR, NOT) 실행 ( BITOP operation destKey)
- BITPOS : BIT POSition 지정한 비트 위치를 구한다. ( BITPOS key start [end] )
```redis
-- setbit key offset(0 ~ ) value 
setbit    key      0        1
```

### 3. Lists
- value에 List를 저장
- 추가/ 삭제/ 조회 O(1)이지만 랜덤 액세스는 O(N)속도
- 메시지 QUEUE로 사용하기 적절
- 양방향 큐로 생각해도 나쁘지 않을거 같다.

#### 명령어
- LPUSH : 왼쪽에 push
- RPUSH : 오른쪽에 push
- LPUSHX : 기존에 있을 경우 LPUSH
- RPUSHX : 기존에 리스트가 있을경우만 RPUSH
- LSET : 인덱스로 특정 위치 값을 바꿈 (LSET key index value)
- LINSERT : 지정한 값 앞, 뒤에 새 값 저장 (LINSERT key BEFORE|AFTER pivot value)
- RPOPLPUSH : RPOP + LPUSH
- LRANGE : 인덱스 범위로 조회 (LRANGE key start end)
- LINDEX : 인덱스로 조회 ( LINDEX index)
- LLEN : 리스트 총 개수 조회
- LPOP : 왼쪽에서 꺼내고 삭제
- RPOP : 오른쪽에서 꺼내고 삭제
- BLPOP : 리스트에 값이 없으면 지정 시간 만큼 기다려서 값이 생기면 LPOP (BLPOP key timeout)
- BRPOP : 리스트에 값이 없으면 지정 시간 만큼 기다려서 값이 생기면 RPOP (BLPOP key timeout) 
- BRPOPLPUSH : 리스트에 값이 없으면 지정 시간 만큼 기다려서 값이 생기면 RPOPLPUSH  (BLPOP key timeout)
- LREM : 값을 지정해서 삭제 (LREM key count value)
- LTRIM : 인덱스로 지정한 범위 밖의 값들을 삭제 (LTRIM key start stop)

### 4.Sets
- value에 set을 저장. 당연히 중복 안됌 
- 유니크한 key값
- 정렬되지 않은 집합
- 같은 키는 있으면 값을 덮어쓴다.
- 집합 연산(교집합, 합집합) 등을 지원
- 단, 모든 데이터를 요청할 수 있는 명령이 있으므로 주의 요망

#### 명령어
- SADD : 집합에 멤버 추가
- SMOVE : 소스 집합에서 타겟 집합으로 멤버 이동
- SMEMBERS : 집합에 모든 멤버 조회
- SCARD : 멤버 개수를 조회
- SRANDMEMBER : 무작위로 멤버 조회
- SISMEMBER : 멤버 존재 여부 확인
- SSCAN : 멤버를 일정 단위 개수 만큼 조회
- SPOP : 무작위로 멤버를 가져옴
- SREM : 집합에서 멤버 삭제
- SUNION : 합집합 (SUNION key [key...])
- SINTER : 교집합
- SDIFF : 차집합
- SUNIONSTORE : 합집합 후 새로운 집합에 저장
- SINTERSTORE : 교집합 후 새로운 집합에 저장
- SDIFFSTORE : 차집합 후 새로운 집합에 저장

### 5.Hashes
- value에 Key:value Map을 저장
- key 하위에 subKey로 HashTable을 제공하는 자료구조
- 저장 한도는 메모리 한도를 따라간다.

#### 명령어
- HSET : 저장 (HSET key (field value) -> hash Key,  value)
- HMSET : HSET 의 multi (HMSET key field value [... field value])
- HSETNX : field가 없으면 저장( 있으면 X )
- HGET : 조회 (key field)
- HMGET : HGET의 Multi (HGETM key field [field...])
- HLEN : field 개수 조회 ( HLEN key )
- HKEYS : key에 속한 field 조회 ( HKEYS key )
- HVALS : key에 속한 value 조회 (HVALS key)
- HGETALL : key에 속한 모든 field, value 조회 (HGETALL key)
- HSTRLEN : value 길이 조회 (HSTRLEN key field)
- HSCAN : field를 일정 단위 개수만큼 조회 (HSCAN key cursor [MATCH pattern])
- HEXISTS : field 가 있는지 확인 ( HEXISTS key field)
- HDEL : field로 value 삭제 (HDEL key, field[...field])
- HINCRBY : value를 increment 만큼 증가, 감소 (HINCRBY key field increment)
- HINCRBYFLOAT  : value를 increment 만큼 증가, 감소 (HINCRBYFLOAT key field increment)

### SORTED SET
- set에 score라는 필드가 추가된 데이터 형(Score는 일종의 가중치다.)
- 일단 insert 순서대로 들어간다. 
- 데이터가 저장되면 score 순으로 정렬되며 저장된다.
- sorted set은 오름차순으로 내부 정렬된다.
- value 중복 불가! score는 중복 가능
- score가 같으면 사전으로 정렬

#### 명령어
- ZADD : 집합에 score, member를 추가 (ZADD key score member [... score, member])

- ZRANGE : index로 범위 지정해서 조회 (ZRAGNE key start stop [withscores])
- ZRANGEBYSCORE : score로 범위를 지정해서 조회 (key min max [withscores])
- ZRANGEBYLEX : member로 범위 지정해서 조회 (key min max [withscores])

- ZREVRANGE : index로 범위를 지정해서 큰 것부터 조회 (key start stop [withscores])
- ZREVRANGEBYSCORE : score로 범위를 지정해서 큰 것부터 조회 (key, max, min)
- ZREVRANGEBYLEX : member로 범위를 지정해서 큰 것부터 조회 (key, max, min)

- ZRANK : member로 지정해서 rank
- ZREVRANK : member로 지정해서 rank reverse

- ZSCORE : member로 score 조회
- ZCARD : 집합에 속한 member의 개수 조회
- 
- ZCOUNT : score로 범위 지정해서 개수 조회
- ZLEXCOUNT : member로 범위 지정해서 개수 조회

- ZSCAN : score, member를 일정 단위 개수 만큼씩 조회 (key cursor [MATCH pattern] [COUNT count])

- ZPOPMIN : 작은 값부터 꺼내온다.
- ZPOPMAX : 큰 값부터 꺼내온다.

- ZREM : 집합에서 member를 삭제
- ZREMRANGEBYSCORE : score로 범위를 지정해서 member 삭제
- ZREMRANGEBYRANK : index로 범위 지정해서 member 삭제
- ZREMRANGEBYLEX : member로 지정해서 member삭제

- ZINCRBY : 지정한 만큼 score 증가, 감소

- ZUNIONSTORE : 합집합 구해서 새로운 집합에 저장
- ZINTERSTORE : 교집합 구해서 새로운 집합에 저장

### HyperLogLogs
- 굉장히 많은 양의 데이터를 DUMP 할 때 사용
- 중복되지 않은 대용량 데이터를 COUNT 할 때 사용
- SET과 비슷하지만 저용량
- 저장된 데이터는 다시 확인 불가 (?)

#### 명령어
- PFADD : 원소 추가 (PFADD key ele)
- PFCOUNT : 원소 개수 조회 (PFCOUNT key[...key])
- PFMERGE : 집합 머지 (PFMERGE destKey sourceKey [...sourceKey])

### Streams
- log를 저장하기 좋은 자료 구조
- append-only 이며 중간에 데이터가 바뀌지 않는다.
- 읽어 올때 id 값으로 시간 범위로 검색
- tail -f 처럼 신규 추가 데이터 수신


## [캐싱 전략](../cs/CacheStrategy.md)

