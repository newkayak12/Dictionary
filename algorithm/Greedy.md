# Greedy

Greedy는 '당장 눈 앞에 보이는 최적의 상황만을 쫓는 알고리즘'이다. 항상 최적의 결과를 도출한다고 보장할 수는 없지만
어느 정도 최적의 해에 근사한 값을 빠르게 구할 수 있다는 장점이있다. 또한 `특정 상황`에서는 Greedy가 최적의 해를 보장할 수도 있다는 것이다.

Greedy의 예시로 거스름 돈 문제를 들 수 있다. 거스름 돈을 줄 때 최소 개수의 화폐를 주는 것이 편하다. 예를 들어서 560원이면
56개의 10원보다는 500원 1개 50원 1개 10원 1개로 주는 것이 동전 양이 적어집니다. 
즉, 이런 경우 무조건 더 큰 화폐부터 거슬러 준다는 원칙만 지키면 최적의 해를 보장할 수 있습니다.

이러한 Greedy는 무조건 큰 경우, 무조건 작은 경우, 무조건 긴 경우, 무조건 짧은 경우와 같이 극단적으로 문제에 접근한다는 점에서 정렬과
함께 사용되는 경우가 많다. 

```java
class Greedy {
    public static void main(String[] args) {
        int price = 1260;
        
    }
    
    public int getGreedyResult( int price ) {
        int result = 0;
        int income = price;
        int[] coins = {500, 100, 50, 10};
        for ( int i = 0; i < coins.length; i ++ ) {
            result += income / coins[i];
            income %= coins[i];
        }
    }
}
```