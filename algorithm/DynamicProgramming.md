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

  중복되는 부분 문제(Overlapping Subproblem)
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
 - 값을 기록해 놓는다는 점에서 캐싱(Cachig)이라고 한다
 - DP에만 국한된 개념이 아니다. 한 번 계산된 결과를 담아 놓기만 하고 DP가 아닌 다른 방식으로도 사용될 수 있다. (캐싱,메모이제이션)
 - 피보나치 함수를 예로 들었을 때, 이미 계산된 결과를 저장하면 아래의 색칠된 노드만 계산이 처리되어 프로그램의 작업 처리속도를 크게 향상시킬 수 있다.


//예시
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
  









