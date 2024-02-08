# 에라토네스의 체

대표적인 소수(PrimeNumber) 판별 알고리즘이다. 소수란 '양의 약수를 두 개만 가지는 자연수'
가장 생각하기 쉬운 N의 소수 알고리즘은 2 ~ N-1까지 숫자 중에서 나누어 떨어지는 수가 없을 때 소수라고 
판별할 수 있다. 

여기서 효율적으로 구하기 위해서 n의 제곱근까지만 확인하고는 한다. 이를 증명해보자.

n 이하의 모든 소수를 구한다고 보자. 이 때 해당 수 n은 자연수 a, b에 대해서 n = a * b로 표현할 수 있다.
(12 = 2 * 6 // 12 = 3 * 4)

`m = sqrt(n)`이라고 하면 `n = m * m`라고 할 수 있다.
`m * m = a * b`이 된다. (a, b가 자연수, m은 n의 제곱근)

여기서 a, b가 자연수가 되려면 세 가지 경우의 수 중 하나다.

1. a = m , b = m
2. a < m , b > m
3. a > m , b < m

a, b가 자연수가 되려면 항상 위의 세 가지 경우의 수 중 하나가 되고, 그러면 `min(a, b) <= m`인 것을 알 수 있다.
즉, n의 모든 약수에 해당하는 a와 b가 어떠한 약수이더라도 둘 중 하나는 무조건 m( = sqrt(n) ) 이하이므로, m만 조사하면 n이 소수인지 알 수 있게 된다.


```java
class Eratosthenes {
    public Boolean isPrime( int num ) {
        if ( num < 2 ) return Boolean.FALSE;
        
        for ( int i = 2; i * i <= num; i ++ ) {
            if ( num % i == 0 ) return Boolean.FALSE;
        }
        
        return Boolean.TRUE;
    }
}
```

