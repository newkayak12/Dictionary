

## 컬렉션 명령어
- db.createCollection("name", {capped:true, size:6142800, max:10000) (create table name ();)

| field  |  type   |           description           |
|:------:|:-------:|:-------------------------------:|
| capped | boolean |     고정된 크기를 가진 컬렉션을 만들 것인가      |
|  size  | number  | 컬렉션 최대 사이즈(capped=true 일 경우 필수) |
|  max   | number  |           최대 도큐먼트 세트            |


- show collections() (SHOW CREATE TABLE [tableName])
- db.[collectionName].drop() (DROP TABLE [tableName])
