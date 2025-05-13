![[CQRS_2회차.pdf]]

## 비동기 모델 동기화
1. application이 이벤트 발행
2. commandModelDB가 BINLog/WAL catch 후 이벤트 발행