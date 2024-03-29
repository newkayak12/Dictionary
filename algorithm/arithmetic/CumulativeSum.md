# Cumulative Sum  (누적 합)

[ 1, 2, 3, 4, 5 ] 로 이루어준 숫자 배열에서 각 구간까지의 합을 구하는 배열 [ 1, 3, 6, 10, 15] 을 구한다고 가정해보면 아래와 같이 2가지로 구할 수 있습니다.

#### [ 첫번째 방법 ] - 인덱스 순회
```
1
1+2
1+2+3
1+2+3+4
1+2+3+4+5
```

#### [ 두번째 방법 ] - 누적 합
```
1
1+2
3+3
6+4
10+5
```
- 누적 합 이란 수열 An에 대해서 각 인덱스까지의 구간의 합을 구하는 것을 누적 합이라고 합니다.
- 시작점은 항상 첫번째 원소이며, R번째 원소까지의 합을 앞에서부터 쭉 더해오는 패턴입니다.
- 모든 구간에 대해서 처음부터 계산하여 단순 반복하는 것이 아니라 이전 인덱스까지의 누적합에 현재 자기 자신 값을 더하여 구현하는 것이 효과적인 방법입니다.

출처: <cite>
https://ji-musclecode.tistory.com/38
</cite>