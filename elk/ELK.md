# ElasticSearch
- ApacheLucene 기반 Java 오픈 소스 분산 검색 엔진
- 대규모 로그 파일 관리나 실시간 검색 서비스 등과 같은 대용량 데이터를 빠르게 처리해야 하는 경우 사용

## RDB와 차이점
1. ElasticSearch는  JSON 형태로 비정형 데이터를 저장하고 인덱싱할 수 있다.
2. 단어를 기반으로 데이터를 저장한다.
3. NoSQL와 같이 저장된다.

|        RDB        |    ElasticSearch     |
|:-----------------:|:--------------------:|
|     Database      |        Index         |
|       Table       |         Type         |
|        Row        |       Document       |
|      Column       |        Field         |
|       Index       |       Analyze        |
|    Primary key    |         _id          |
|      Schema       |       Mapping        |
| PhysicalPartition |        Shard         |
| LogicalPartition  |        Route         |
|    Relational     | Parent/Child, Nested |

- Cluster : 노드 집합
- Node : 기본 작동 단위
- Index : Document 집합을 Index라고 한다.
- Shard : Kafka의 파티션과 유사

## 장점
1. 데이터를 여러 노드에 분산 저장하고 처리 및 새로운 노드를 추가(ScaleOut)할 수 있고, 스키마리스이므로, 비구조화된 대량 데이터 처리 유연성이 높다.
2. 모든 데이터를 역 색인 구조로 저장해 가공된 텍스트를 검색한다.
3. JSON으로 데이터를 유연하게 저장할 수 있다.
4. Replication, Sharding으로 노드 실패에도 서비스 중단 없이 작업을 할 수 있다.

## 단점
1. 트랜잭션 미지원
2. 데이터 수정 삭제에 비효율


# ELK(Elasticsearch/ Logstash/ Kibana)
로그를 모아서 원하는 데이터를 빠르게 검색한 뒤 시각화해서 모니터링하기 위해서 사용한다.
![](img/스크린샷 2024-04-10 12.32.25.png)

## Beats
여러 데이터를 서버에서 다른 곳으로 전송하는 역할(로그 파일의 변화를 감지해서 logstash, elasticSearch로 전달)

## Logstash
실시간 파이프라인 기능을 가져 데이터를 수집하는 역할을 한다.
1. input: 데이터 저장소로부터 ㅈ데이터를 입력받는 작업
2. filter: 데이터를 확장, 변경, 필터링 및 삭제 처리하는 가공 작업
3. output: elasticsearch로 전송

## Elasticsearch
데이터 저장소 역할 + 검색 엔진
1. indexing : 엘라스틱 서치는 모든 레코드를 JSON으로 관리. 도큐먼트를 인덱싱해 쿼리 결과에 일치하는 원본 도큐먼트를 반환
2. 병렬/ 분산 처리 : 텍스트, 도큐먼트의 경우 인덱싱 시점에 분석을 거쳐 용어 단위로 분해하고 역인덱스 사전을 구축한다.
3. Lucene 기반 검색엔진 : 루씬 기반으로 스코어링, 연관도에 따른 정렬을 지원한다.
4. REST API : REST API로 언어를 타지 않는다.

## Kibana
저장된 데이터를 모아서 시각화하는 역할