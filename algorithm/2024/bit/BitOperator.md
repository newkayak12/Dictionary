# 비트 연산자

## 종류 
1. 논리 연산자 (&, |, ^, ~)
2. 비트 이동 연산자( <<, >>, >>>)


### 1. 논리 연산자
|  A  |  B  | A&B | A￨B | ~A  | A^B |
|:---:|:---:|:---:|:---:|:---:|:---:|
|  0  |  0  |  0  |  0  |  1  |  0  |
|  0  |  1  |  0  |  1  |  1  |  1  |
|  1  |  0  |  0  |  1  |  0  |  1  |
|  1  |  1  |  1  |  1  |  0  |  0  |


### 2. 비트 이동 연산자 
|                 a << b                  |                              a >> b                              |                 a >>> b                  |
|:---------------------------------------:|:----------------------------------------------------------------:|:----------------------------------------:|
| 정수 a의 각 비트를 b만큼 왼쪽으로 이동<br/> (빈자리는 0으로) | 정수 a의 각 비트를 b만큼 오른쪽으로 이동<br/> (빈자리는 최상위 부호비트(MSB)와 같은 값으로 채워진다.) | 정수 a의 각 비트를 b만큼 오른쪽으로 이동<br/> (빈자리는 0으로) |


```java
public class UnderTwoBeat {
    //https://school.programmers.co.kr/learn/courses/30/lessons/77885
    /**
     * 양의 정수 x에 대한 함수 f(x)를 다음과 같이 정의합니다.
     * x보다 크고 x와 비트가 1~2개 다른 수들 중에서 제일 작은 수
     *
     * 예를 들어,
     *
     * f(2) = 3 입니다. 다음 표와 같이 2보다 큰 수들 중에서 비트가
     * 다른 지점이 2개 이하이면서 제일 작은 수가 3이기 때문입니다.
     *
     * 수	비트	다른      비트의 개수
     * 2	000...0010
     * 3	000...0011	    1
     *
     * f(7) = 11 입니다.
     * 다음 표와 같이 7보다 큰 수들 중에서 비트가 다른 지점이 2개 이하이면서
     * 제일 작은 수가 11이기 때문입니다.
     *
     * 수	비트	다른    비트의 개수
     * 7	000...0111
     * 8	000...1000	  4
     * 9	000...1001	  3
     * 10	000...1010	  3
     * 11	000...1011	  2
     *
     * 정수들이 담긴 배열 numbers가 매개변수로 주어집니다.
     * numbers의 모든 수들에 대하여 각 수의 f 값을 배열에 차례대로 담아
     * return 하도록 solution 함수를 완성해주세요.
     *
     *
     * 제한사항
     * - 1 ≤ numbers의 길이 ≤ 100,000
     * - 0 ≤ numbers의 모든 수 ≤ 1015
     */
    @Nested
    public class TestCases {
        @Test
        public void case1 () {
            long[] numbers = new long[]{2, 7};
            long[] result  = new long[]{3, 11};

            Assertions.assertArrayEquals(result, solution(numbers));
        }

        @Test
        public void bit () {
            for ( int i = 2; i < 10; i ++) {
                System.out.println(Integer.toBinaryString(i));
            }
        }
        @Test
        public void pow () {
            System.out.println(Math.pow(2, 0));
        }

    }

    private long bitLength( long number ) {
        long count = 0;
        while( number > 0) {
            count += number & 1;
            number >>= 1;
        }
        return count;
    }
    public long[] solution(long[] numbers) {
        long[] answer = new long[numbers.length];

        for( int i = 0; i < numbers.length; i ++ ) {
            long number = numbers[i];
            long upper = 0;
            while (true){
                long result = number ^ (number + (long) Math.pow(2, upper*1.0));
                long count = this.bitLength(result);

                if( count == 1||count==2 ) break;
                else upper += 1;
            }

            answer[i] = number + (long) Math.pow(2, upper*1.0);
        }

        return answer;
    }
}

```