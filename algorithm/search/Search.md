# 탐색

## 이진 탐색
이진 탐색이란 데이터가 정렬돼 있는 배열에서 특정한 값을 찾아내는 알고리즘이다.
배열의 중간에 있는 임의의 값을 선택하여 찾고자 하는 값 X와 비교한다.

X가 중간 값보다 작으면 중간 값을 기준으로 좌측의 데이터들을 대상으로,
X가 중간값보다 크면 배열의 우측을 대상으로 다시 탐색한다.

동일한 방법으로 다시 중간의 값을 임의로 선택하고 비교한다.
해당 값을 찾을 때까지 이 과정을 반복한다.

-> 업 & 다운

```java
class BinarySearch {
    int[] array = { 17, 28, 43, 67, 88, 92, 100 };
    public int search (int arr[], int target) {
        int low = 0;
        int high = arr.length - 1;
        int mid;

        while(low <= high) {
            mid = (low + high) / 2;

            if (arr[mid] == target) return mid;
            else if (arr[mid] > target) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }
    public int search (int arr[], int target, int low, int high) {
        if ( low > high ) return -1;
        
        int mid = (low + mid) / 2;
        if( arr[mid] == target ) return mid;
        else if ( arr[mid] > target ) return search(arr, target, low, mid - 1);
        else  return search(arr, target, mid + 1, high);
    }
}
```