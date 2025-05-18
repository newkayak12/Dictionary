# 계수 정렬

계수 정렬은 데이터 값을 직접 비교하지 않고, 단순하게 각 숫자가 몇 개 있는지 개수를 세어 저장한 후 정렬하는 알고리즘이다.
계수 정렬의 큰 특징은 값 비교가 일어나지 않기에 속도가 빠르다는 것이다. 하지만, 개수를 저장하는 배열을 사용해야하기 때문에 추가 공간이 필요하다.


# 과정
1. 정렬하고자 하는 배열의 최대 값을 구한다. ( 값을 저장할 배열의 길이 확정을 위해서 )
2. 최대 값 크기의 배열에 각 원소를 순회하여 몇 개인지 저장
3. 저장된 데이터를 순서대로 출력

```java
class CountingSort {
    int[] arr = {
                  1, 3, 2, 4, 3, 2, 5, 3, 1, 2,
                  3, 4, 4, 3, 5, 1, 2, 3, 5 ,2,
                  3, 1, 4, 3, 5, 1, 2, 1, 1, 1
                };
    
    
    public String sort ( int [] array) {
        int[] count = new int[6];
        StringBuilder sb = new StringBuilder();
        
        for ( int i = 0; i < arr.length - 1; i ++ ) {
            count[array[i]] ++;
        }
        
        for ( int i = 0; i <= 5; i ++ ) {
            if ( count[i] != 0 ) {
                for ( int j = 1; j <= count[i]; j ++ ) {
                    sb.append(i);
                }
            }
        }
        
        return sb.toString();
    }
}

```