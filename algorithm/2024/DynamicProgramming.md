# DynamicProgramming
  
      자료구조의 동적할당(Dynamic Allocation)에서 '동적'은
      '프로그램이 실행되는 도중에 실행에 필요한 메모리를 할당하는 기법'을 의미한다.
      그러나, 알고리즘의 동적 계획법(Dynamic Programming)에서 '동적'은 별 뜻 없다
      그냥 '기억하기'라고 생각하면 편하다.

      '프로그래밍'은 컴퓨터 프로그래밍이 아니라 테이블을 만든다는 뜻이다.
  

##  DP를 사용할 조건
  
  최적 부분 구조(Optimal Substructure)
      - 상위 문제를 하위 문제로 나눌 수 있으며
        하위 문제의 답을 모아서 상위 문제를 해결할 수 있다.

  중복되는 부분 문제(Overlapping SubProblem)
      - 동일한 작은 문제를 반복적으로 해결해야 한다.
  

##  DP?
  
   DP 알고리즘 기법은 이미 계산된 결과(하위 문제)는 별도의 메모리 영역에 저장하여
   다시 계산하지 않도록 설계함으로써 메모리를 적절히 사용하여 수행 시간 효율성을 비약적으로 향상시키는 방법이다.

   DP 구현 방법은 일반적으로 두 가지 방식,
   Top-down(하향식)과 Bottom-up(상향식)으로 구성된다.
  


##  Top-down
  
   상위 문제를 해결하기 위해서 하위 문제를 재귀적으로 호출하여
   하위 문제를 해결함으로써 상위 문제를 해결하는 방식이다.
   이 때 해결해놓은 하위 문제를 저장해 놓기 위해 Memoization이 사용된다.
```java

 int fibo(int x) {
 		if( x ==1 || x==2) return 1;
 		if(dp[x] != 0) return dp[x];
 		dp[x] = fibo(x-1) + fibo(x-2);

     	return dp[x];
  }
```
  
##  Bottom-up
  
    하위에서부터 문제를 해결해나가면서 먼저 계산했던 문제들의 값을 활용해서
    상위 문제를 해결해나가는 방식으로 DP의 전형적인 형태는 Bottom-up이다.
    여기서 사용되는 문제 결과 값 저장용 리스트는 DP 테이블이라고 부른다.
```java


  int fibo(int x) {
 	    dp[1] =1;
 	    dp[2] =1;
 	    for(int i=3; i<x+1; i++) {
 	    	dp[i] = dp[i-1] + dp[i-2];
      }
 	  return dp[x];
  }
```
  

##  메모이제이션
  
    메모이제이션은 DP구현 방법 중 하나로,
    한 번 계산한 결과를 메모리 공간에 메모하는 기법이다.
    이를 사용하면 모든 부분 문제가 한 번씩만 계산된다고 보장할 수 있기 때문에
    함수 호출 횟수가 엄청나게 감소함을 예상할 수 있다.
```java


 // 일반 재귀 함수
 // 중복된 계산을 반복해서 하게 된다. 시간복잡도 O(2^n)으로 x의 수가 커질수록 복잡도가 엄청나게 커짐
 static int fibo(int x) {
    if( x ==1 || x==2) return 1;
    return fibo(x-1) + fibo(x-2);
 }


 // Memoization
 // 하위 문제의 결과 값을 dp[]배열에 저장해놓고 필요할 때마다 계산된 값을 호출
 static int fibo(int x) {
    if( x ==1 || x==2) return 1;
    if(dp[x] != 0) return dp[x];
    dp[x] = fibo(x-1) + fibo(x-2);
    return dp[x];
 }
```
 ## 메모제이션 특징

 - 같은 문제를 다시 호출 하면 메모했던 결과를 그대로 가져온다
 - 값을 기록해 놓는다는 점에서 캐싱(Caching)이라고 한다
 - DP에만 국한된 개념이 아니다. 한 번 계산된 결과를 담아 놓기만 하고 DP가 아닌 다른 방식으로도 사용될 수 있다. (캐싱,메모이제이션)
 - 피보나치 함수를 예로 들었을 때, 이미 계산된 결과를 저장하면 아래의 색칠된 노드만 계산이 처리되어 프로그램의 작업 처리속도를 크게 향상시킬 수 있다.


//예시1
//https://school.programmers.co.kr/learn/courses/30/lessons/12900
```java
class Tile2 {
    @Nested
    public class TestCases {
        @Test
        public void case0() {
            int n = 2;
            int result = 2;

            Assertions.assertEquals(result, solution(n));
        }

        @Test
        public void case1() {
            int n = 3;
            int result = 3;

            Assertions.assertEquals(result, solution(n));
        }

        @Test
        public void case2() {
            int n = 4;
            int result = 5;

            Assertions.assertEquals(result, solution(n));
        }

        @Test
        public void case3() {
            int n = 5;
            int result = 8;

            Assertions.assertEquals(result, solution(n));
        }
    }

    public int solution(int n) {
        return this.calculation(n, 0, 0, 1);
    }

    private int calculation(int totalTile, int countNow, int p1, int p2) {
        int div = 1_000_000_007;
        if (countNow >= totalTile) return (p2 % div);
        else return calculation(totalTile, countNow + 1, p2 % div, (p1 + p2) % div);
    }
}
```



  
//예시2
//https://school.programmers.co.kr/learn/courses/30/lessons/131701
```java
public class ContinuousSequential {
    /**
     * <pre>
     *     철호는 수열을 가지고 놀기 좋아합니다.
     *     어느 날 철호는 어떤 자연수로 이루어진 원형 수열의 연속하는 부분 수열의 합으로 만들 수 있는 수가
     *     모두 몇 가지인지 알아보고 싶어졌습니다.
     *     원형 수열이란 일반적인 수열에서 처음과 끝이 연결된 형태의 수열을 말합니다.
     *
     *     예를 들어 수열 [7, 9, 1, 1, 4] 로 원형 수열을 만들면 다음과 같습니다.
     *     원형 수열은 처음과 끝이 연결되어 끊기는 부분이 없기 때문에
     *     연속하는 부분 수열도 일반적인 수열보다 많아집니다.
     *     원형 수열의 모든 원소 elements가 순서대로 주어질 때,
     *     원형 수열의 연속 부분 수열 합으로 만들 수 있는 수의 개수를 return 하도록
     *     solution 함수를 완성해주세요.
     *
     *     제한사항
     *      -  3 ≤ elements의 길이 ≤ 1,000
     *      -  1 ≤ elements의 원소 ≤ 1,000
     * </pre>
     */
    @Nested
    class TestCases {
        @Test
        public void case1() {
            int[] elements = new int[]{7, 9, 1, 1, 4};
            int result = 18;

            Assertions.assertEquals(result, solution(elements));
        }
    }


    public int solution(int[] elements) {

        Set<Integer> result = new HashSet<>();
        int[] dp = new int[elements.length]; // 동적 계획법 사용
        for (int i = 1; i <= elements.length; i++) {
            for (int j = 0; j < elements.length; j++) {
                List<Integer> sub = new ArrayList<>();

//                for ( int l = j;  l < j + i; l ++ ) {
//                    //modular로 아래 if 대체
//                    sub.add(elements[l % elements.length]);
//
////                    if( l <= elements.length  - 1) sub.add(elements[l]);
////                    else sub.add(elements[l - ( elements.length)] );
//                }
//

                //dp사용으로 이전 상태 저장.. for를 사용할 필요가 없어짐
                dp[j] += elements[(i + j - 1) % elements.length];
                sub.add(dp[j]);

                result.add(sub.stream().reduce(0, (p, n) -> p + n));
            }
        }
        return result.size();
    }
}
```



// 예시3
//https://school.programmers.co.kr/learn/courses/30/lessons/42839
//순열 구하는 곳에서
```java
public class FindPrime {
    //https://school.programmers.co.kr/learn/courses/30/lessons/42839

    /**
     * <pre>
     *     한자리 숫자가 적힌 종이 조각이 흩어져있습니다.
     *     흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.
     *
     *      각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때,
     *      종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.
     *
     * 제한사항
     *  - numbers는 길이 1 이상 7 이하인 문자열입니다.
     *  - numbers는 0~9까지 숫자만으로 이루어져 있습니다.
     *  - "013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.
     * </pre>
     */

    @Nested
    public class TestCases {
        @Test
        public void case1() {
            String numbers = "17";
            int result = 3;
            Assertions.assertEquals(result, solution(numbers));
        }

        @Test
        public void case2() {
            String numbers = "011";
            int result = 2;
            Assertions.assertEquals(result, solution(numbers));
        }

        @Test
        public void case3() {
            String numbers = "232";
            int result = 4;
            Assertions.assertEquals(result, solution(numbers));
        }

        @Test
        public void numberFormatException() {
            String numbers = "0001";
            // 0
            // 1
            // 10
            // 11
            // 101
            // 110
            Set<Long> permutations = permutation(numbers, "", 0, new boolean[ numbers.length() ]);
            Set<Long> numberSet = permutations;
            System.out.println(numberSet);
        }
    }

    public int solution(String numbers) {
        int answer = 0;
        Set<Long> numberSet = this.permutation(numbers, "", 0, new boolean[numbers.length()])
                .stream()
                .collect(Collectors.toSet());

        for (Long isPrime : numberSet) {
            if (eratosthenes(isPrime)) answer += 1;
        }
        return answer;
    }

    private Set<Long> permutation( String numbers, String prev, int depth, boolean[] visit) {


       Set<Long> result = new HashSet<>();
       if( numbers.length() < depth ) return result;

       String[] arr = numbers.split("");
       for( int i = 0; i < arr.length; i ++ ) {
           if(visit[i]) continue;

           //DP
           visit[i] = true;
           result.add(Long.parseLong(prev+arr[i]));
           result.addAll(permutation(numbers, prev+arr[i], depth + 1, visit));
           visit[i] = false;
       }

       return result;
    }
    private boolean eratosthenes(long number) {
        if (number < 2) return Boolean.FALSE;
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) return Boolean.FALSE;
        }

        return Boolean.TRUE;
    }
}
```






