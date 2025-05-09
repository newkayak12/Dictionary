![[CQRS_1회차.pdf]]

1. 읽기 압도적으로 많다.
2. 단일 모델로 성능, 확장성 둘 중 하나를 선택하기가 어렵다.
3. 기술 선택에 어려움이 많다.(쓰기는 RDB, 읽기는 NoSQL)
4. SRP 입장에서도 분리가 맞다.
----
### 읽기와 쓰기는 분리해야 한다. -> CQRS

## CQRS(Command and Query Responsibility Segregation)
- 읽기와 쓰기의 분리
- CQS(Command and Query Separation) :코드 모듈 단위의 분리
- CQRS: 읽기,쓰기의 책임을 완전히 다른 모델/레이어로 분리



## 일관성
