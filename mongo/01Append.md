

## 컬렉션 명령어
- db.createCollection("name", {capped:true, size:6142800, max:10000) (create table name ();)

| field  |  type   |           description           |
|:------:|:-------:|:-------------------------------:|
| capped | boolean |     고정된 크기를 가진 컬렉션을 만들 것인가      |
|  size  | number  | 컬렉션 최대 사이즈(capped=true 일 경우 필수) |
|  max   | number  |           최대 도큐먼트 세트            |


- show collections() (SHOW CREATE TABLE [tableName])
- db.[collectionName].drop() (DROP TABLE [tableName])

## 도큐먼트 명령어

- insert : 단일, 다수의 Document 입력에 사용한다. 컬렉션이 존재하지 않으면 자동으로 생성하고 insert한다.

```javascript
// 단일
db.apple.insert({"model":"iPhone"})

// 다수
db.apple.insert({"model":"iPhone"}, {"model": "iPad"})
```

- insertOne : 단일 Document 입력에 사용

```javascript
// 단일
db.apple.insertOne({"model":"iPhone"})
```

- insertMany : 다중 Document 입력에 사용

```javascript
// 다수
db.apple.insertMany({"model":"iPhone"}, {"model": "iPad"})
```


## 조회

- `find({조건}, {projection})` : 리스트를 확인

```javascript
//리스트
db.appe.find().pretty();

//조건
db.appe.find({"model":{$eq:"iphone"}}).pretty();
```

### 논리 연산자

- `{key: {$gt: value}}`  :  graterThan
- `{key: {$lt: value}}`  :  lessThan
- `{key: {$gte: value}}`  :  graterOrEqual
- `{key: {$lte: value}}`  :  lessOrEqual
- `{key: {$eq: value}}` : equal
- `{key: {$ne: value}}` : not equal
- `{key: {$in: [value1, value2, value3]}}` : in
- `{key: {$nin: [value1, value2, value3]}}` : not 
- `{key: {$and: [{조건1}, {조건2}]}}` : and 
- `{key: {$or: [{조건1}, {조건2}]}}` : or
- `{key: {$nor: [{조건1}, {조건2}]}}` : or
- `{key: {$not: {조건}}}` : not


### 정규표현식

- `{key: {$regx: /[regex]/, $options:["g","i"]}}` : 정규표현식을 사용해서 검색


### 조건(Js)

자바스크립트를 사용해서 검색할 수 있다. `this`를 사용해야 한다.

- `{$where: "this.model === 'Iphone'}`

### 정렬
1은 asc, -1은 desc

- `sort({model: 1})`

```js
db.apple.find().sort({model: 1}).pretty()
```
    
