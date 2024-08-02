# Redis(REmote DIctionary Server)

[learn_redis](https://github.com/newkayak12/Learn_Redis)
[참고1](https://inpa.tistory.com/entry/REDIS-%F0%9F%93%9A-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%83%80%EC%9E%85Collection-%EC%A2%85%EB%A5%98-%EC%A0%95%EB%A6%AC)
[참고2](https://inpa.tistory.com/entry/REDIS-%F0%9F%93%9A-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%83%80%EC%9E%85Collection-%EC%A2%85%EB%A5%98-%EC%A0%95%EB%A6%AC#strings_%EB%AA%85%EB%A0%B9%EC%96%B4_%EB%A6%AC%EC%8A%A4%ED%8A%B8)

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


### 4.Sets
- value에 set을 저장. 당연히 중복 안됌 

### 5.Hashes
- value에 Key:value Map을 저장



## [캐싱 전략](../cs/CacheStrategy.md)

