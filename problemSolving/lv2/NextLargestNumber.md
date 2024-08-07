# 다음 큰 숫자

[Programmers](https://school.programmers.co.kr/learn/courses/30/lessons/12911?language=java)

> <pre> 
> 자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의 합니다.
> 조건 1. n의 다음 큰 숫자는 n보다 큰 자연수 입니다.
> 조건 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같습니다.
> 조건 3. n의 다음 큰 숫자는 조건 1, 2를 만족하는 수 중 가장 작은 수 입니다.
> 예를 들어서 78(1001110)의 다음 큰 숫자는 83(1010011)입니다.
> 자연수 n이 매개변수로 주어질 때, n의 다음 큰 숫자를 return 하는 solution 함수를 완성해주세요.
> 제한 사항
> n은 1,000,000 이하의 자연수 입니다.
> </pre>

## 알고리즘
`bitCount()` 물론 `Integer.bitCount()`를 사용하면 되는 문제이긴 하지만

1. 2를 나눠가면서 처리

```java
int bitCount( int i ) {
    int count = 0;
    while( i > 0 ) {
        count += i % 2;
        i /= 2;
    }
    
    return count;
}
```

2. bitShift로 처리 

```java
int bitCount(int i) {
    int count = 0;
    while (i > 0) {
        count += 0x1 & i; //(1 & i)
        i = i >> 1;
        
    }
    
    return  count;
}

```

3. -1을 하면 비트가 뒤집힘을 이용

```java
int bitCount(int value) {
    int count = 0;
    while( value != 0) {
        value = value & (value - 1);
        count ++;
    }
    
    return count;
}
```

4. Hamming Weight ( JVM 구헌 )
솔직히 이해가 잘 안간다. 다시 한 번 더 보자
[참고](http://shumin.co.kr/algorithm-hamming-weight-bit-count/)

## 풀이

```java
class NextLargestNumber {
    @Nested
    public class TestCases {
        @Test
        public void case1 () {
            int n = 78;      //1001110  64 + 0 +  0 + 8 + 4 + 2 + 0
            int result = 83; //1010011  64 + 0 + 16 + 0 + 0 + 2 + 1

            Assertions.assertEquals(result, solution(n));
        }

        @Test
        public void case2 () {
            int n = 15;       //1111   0 + 8 + 4 + 2 + 1
            int result = 23; //10111  16 + 0 + 4 + 2 + 1
            Assertions.assertEquals(result, solution(n));
        }

        @Test
        public void case3 () {
            int n = 8;       // 1000
            int result = 16; //10000
            Assertions.assertEquals(result, solution(n));
        }

        @Test
        public void case4 () {
            int n = 10;      // 1010
            int result = 12; // 1100
            Assertions.assertEquals(result, solution(n));
        }

        @Test
        public void case5 () {
            int n = 12;      //  1100
            int result = 17; // 10001
            Assertions.assertEquals(result, solution(n));
        }
    }


    public int solution ( int n ) {
        int number = n ;
        int count = Integer.bitCount(n);
        while (true) {
            number += 1;
            if( count == Integer.bitCount(number)){
                break;
            }
        }

        return number;
    }
}
```