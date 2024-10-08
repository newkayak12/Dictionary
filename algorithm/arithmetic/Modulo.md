# Modulo(%)의 분배 법칙

```
(A + B) % N = ((A % N) + (B % N)) % N
(A * B) % N = ((A % N) * (B % N)) % N
(A - B) % N = ((A % N) - (B % N) + N) % N
```

위의 식이 성립한다. 

## 증명1 `(A + B) % N = ((A % N) + (B % N)) % N`
A와 B에 해당하는 몫, 나머지 [q1, r1], [q2, r2]라고 하자

````
A = q1 * N + r1
B = q2 * N + r2
````
이므로

```
( (q1 * N + r1) + (q2 * N + r2) ) % N = ( (q1 + q2) * N + r1 + r2 ) % N

(q1 + q2) * N % N = 0 이고 나머지를 계산하면 (r1 + r2) % N 가 된다. 

A % N = r1
B % N = r2
```


`modulo`는 나머지 연산이기 때문에 `q1`, `q2`는 연산 과정에서 `0`이 된다.
결과적으로 `(r1 + r2) % N`이 남는다.



`r1 = A % N` 
`r2 = B % N`

⁖ `(A + B) % N = ((A % N) + (B % N)) % N`


## 증명2 `(A * B) % N = ((A % N) * (B % N)) % N`

```
( (q1 * N + r1) * (q2 * N + r2) ) % N = (q1 * q2) * N % N + (r1 * r2) % N


(q1 * q2) * N % N = 0

A % N = r1
B % N = r2
```

⁖ `(A * B) % N = ((A % N) * (B % N)) % N`


## 증명3 `(A - B) % N = ((A % N) - (B % N) + N) % N`

```
(( q1 * N + r1) - (q2 * N + r2)) % N  = ((q1 - q2) * N + (r1 - r2)) % N

((q1 - q2) * N) % N = 0
A % N = r1
B % N = r2 
```

결과적으로 `(r1 - r2) % N`가 남는다. 이는 결과적으로 `r1 - r2`

우측 식을 풀어 보면 `((r1 % N) - (r2 % N)) % N`

> 그런데! `(A - B) % N = ((A % N) - (B % N) + N) % N`으로 +N을 하는 경우가 있다.
> B가 < 0이면 고려되는 상황으로 보이는데?
> 정확히는 모르겠다.