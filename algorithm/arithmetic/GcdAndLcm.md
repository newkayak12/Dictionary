# GCD, LCM

## 최대 공약수(Greatest common divisor)
공약수 중 가장 큰 수

1. 두 수의 공통된 수로 계속 나눈다.
2. 나눈 몫이 서로소가 되면 멈춘다.
3. 나온 공통된 수 들을 모두 곱한다.

### 유클리드 호제법
두 양의 정수, 다항식의 최대 공약수를 구하는 방법이다. 호제법이란 서로(호) 나눈다(제)는 의미에서 붙여진 이름이라고 한다.

두 수 a, b가 있을 때 a > b에 대해서  `a = bq + r (0 <= r < b)` 라면 a,b 최대 공약수는 b,r의 최대 공약수와 같다.

> gcd(a, b) == gcd(b, r)

r이 0이라면 a,b의 최대공약수는 b가 된다.

#### 증명
1. 전제
- a > b
- 최대공약수는 G
- a = AG, b = BG
- A, B는 서로소


2. 예시 (168, 1980의 공약수)
- 1980 = 168 * 11 + 132
- 168 =  132 * 1  +  36
- 132 =  36  * 3  +  24
- 36  =  24  * 1  +  12
- 24  =  12  * 2  +  0   -> 공약수는 12


3. 원리
- 1980, 168
- 168 , 132
- 132 ,  36
-  36 ,  24
-  24 ,  12

원 문제를 작은 숫자로 치환하는 것과 같은 원리
<pre>
a, b 최대 공약수를 G라고 했을 때,

a = AG
b = BG

이러면 A, B 사이 공약수는 없으므로 서로소다.

a = b*Q +R (Q는 몫, R은 나머지)

AG = BG * Q + R
R = AG-BG*Q
R = G ( A - BQ ) 

(a를 b로 나눈 나머지) R은 G를 약수로 갖는다.
여기서 G*B, G(A-B*Q)이므로

B, (A-B*Q)는 서로소 (공약수가 없다.)

귀류법으로 간접 증명하면 위 두 수가 공약수가 있다고 가정했을 때,

A-B*Q = nt라고 하고 B = mt라고 가정한다.

A-mt*Q = nt
A = t( n + m*Q ) 
B = tm

이러면 A, B사이 서로소라는 부분에 위배된다. 결국 B, (A-B*Q)는 서로소다.

이를 통해서 a, b의 공약수는 G
b와 a % b 공약수도 G라는 것을 증명했다.


조금 더 쉽게 생각해보면

30과 12의 최대 공약수는 6이다. 
이는 30(12+12 +6), 12로 표현할 수 있고
결국 6과 12이 간의 공약수를 구하면 되는 것으로 표현할 수 있다.

위의 예시는 이 과정을 숫자 순서를 바꿔가면서 진행한다.
그럼! 30과 10의 공약수는
30(10 + 10 + 10), 10이므로 딱 떨어진다. 그래서 최대 공약수는 10이된다.

코드에서 GCD에서 나눈 나머지가 0이되면 최대공약수를 그 수로 잡는 이유다.
</pre>

```kotlin
fun gcd(a: int, b: int): int {
    return if (b == 0) a;
           else gcd(b, a % b);
}
```

## 최소 공배수 (Least Common Multiple)
최소 공배수는 공통된 배수 중 가장 작은 수이다.

두 수의 곱에서 공약수를 나누면 된다.

```kotlin
fun lcm(a: int, b: int ): int {
    return a * b / gcd(a, b)
}
```