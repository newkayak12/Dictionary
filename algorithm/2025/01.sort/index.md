# 정렬
- 버블 정렬 (Bubble Sort)
> - 개념: 인접한 두 원소를 비교해 큰 값을 뒤로 보내는 방식. 여러 회전을 반복.
> - 특징: 단순하지만 느림 (O(n²)), 거의 정렬된 경우 효율적.
> - 비교 기반 ✅

- 선택 정렬 (Selection Sort)
> - 개념: 가장 작은(또는 큰) 값을 찾아 맨 앞(또는 뒤)과 교환.
> - 특징: 교환 횟수는 적으나 비교 횟수는 많음. (O(n²))
> - 비교 기반 ✅

- 삽입 정렬 (Insertion Sort)
> - 개념: 앞에서부터 정렬된 상태를 유지하며 적절한 위치에 삽입.
> - 특징: 거의 정렬된 배열에 효율적. (최선 O(n), 평균 O(n²))
> - 비교 기반 ✅

- 셸 정렬 (Shell Sort)
> - 개념: 일정 간격으로 떨어진 요소들을 삽입 정렬하여 간격을 줄여감.
> - 특징: 삽입 정렬 개선. 시간 복잡도는 gap 전략에 따라 다름.
> - n/2...: (평균 O(n^1.5), 최악 O(n²))
> - 비교 기반 ✅

- 병합 정렬 (Merge Sort)
> - 개념: 배열을 반으로 나눠 각각 정렬 후 병합.
> - 특징: 안정 정렬, O(n log n), 추가 공간 필요.
> - 비교 기반 ✅

- 퀵 정렬 (Quick Sort)
> - 개념: 기준 값(pivot)을 정하고, 작은 값과 큰 값으로 분할 후 재귀.
> - 특징: 평균 O(n log n), 최악 O(n²), 제자리 정렬.
> - 비교 기반 ✅

- 힙 정렬 (Heap Sort)
> - 개념: 최대 힙 또는 최소 힙을 구성 후 요소 제거하며 정렬.
> - 특징: O(n log n), 안정적이지 않음.
> - 비교 기반 ✅

- 기수 정렬 (Radix Sort)
> - 개념: 각 자릿수 기준으로 여러 번 정렬 (보통 LSD 방식).
> - 특징: 숫자에 적합, O(k·n), 안정 정렬.
> - 비교 기반 ❌



> ## 안정 정렬 vs. 불안정 정렬
> - 중복된 값의 순서 보장 여부에 따라서
>   - 순서가 보장되면 안정 정렬이다.
>   - 순서가 보장되지 않으면 불안정 정렬이다.

------------------

## 1. 버블 정렬

▸ 시작 상태
[5, 4, 10, 2, 8, 6]
⸻
🔁 1회전 (전체 비교)
•	5 > 4 → swap → [4, 5, 10, 2, 8, 6]
•	5 < 10 → 그대로
•	10 > 2 → swap → [4, 5, 2, 10, 8, 6]
•	10 > 8 → swap → [4, 5, 2, 8, 10, 6]
•	10 > 6 → swap → [4, 5, 2, 8, 6, 10]

✅ 가장 큰 값 10이 맨 뒤로
⸻
🔁 2회전 (앞 ~ 4까지)
•	4 < 5 → 그대로
•	5 > 2 → swap → [4, 2, 5, 8, 6, 10]
•	5 < 8 → 그대로
•	8 > 6 → swap → [4, 2, 5, 6, 8, 10]

✅ 두 번째 큰 값 8 정위치
⸻
🔁 3회전 (앞 ~ 3까지)
•	4 > 2 → swap → [2, 4, 5, 6, 8, 10]
•	4 < 5 → 그대로
•	5 < 6 → 그대로
⸻
🔁 4회전 (앞 ~ 2까지)
•	2 < 4, 4 < 5 → 그대로
⸻
🔁 5회전 (앞 ~ 1까지)
•	2 < 4 → 그대로
⸻
✅ 최종 결과
[2, 4, 5, 6, 8, 10]

```kotlin
class BubbleSort {
    /**
     * 5, 4, 10, 2, 8, 6 : origin
     * 4, 5, 2, 8, 6, 10 : 1회전
     * 4, 2, 5, 6, 8, 10 : 2회전
     * 2, 4, 5, 6, 8, 10 : 3회전
     */
    @Test
    fun `sort`() {
        val list = giveMeArray()
        val expected = list.sorted().toIntArray()
        val array = list.toIntArray()

        for (i in 0 until array.size - 1) {
            for (j in 0 until array.size - 1 - i) {
                if (array[j] > array[j + 1]) {
                // 큰 값을 뒤로
                    val temp = array[j]
                    array[j] = array[j + 1]
                    array[j + 1] = temp
                }
            }
        }
        println("before: ${expected.contentToString()}")
        println("after: ${array.contentToString()}")
        assertArrayEquals(expected, array)
    }

}
```

-----------------------------

## 2. 선택 정렬

▸ 시작 상태
[5, 4, 10, 2, 8, 6]
⸻
🔁 1회전 (i = 0)
•	전체 구간: [5, 4, 10, 2, 8, 6]
•	최소값: 2 at index 3
•	5 <-> 2 교환
•	결과: [2, 4, 10, 5, 8, 6]
⸻
🔁 2회전 (i = 1)
•	남은 구간: [4, 10, 5, 8, 6]
•	최소값: 4 → 위치 그대로
•	결과: [2, 4, 10, 5, 8, 6]
⸻
🔁 3회전 (i = 2)
•	남은 구간: [10, 5, 8, 6]
•	최소값: 5 at index 3
•	10 <-> 5 교환
•	결과: [2, 4, 5, 10, 8, 6]
⸻
🔁 4회전 (i = 3)
•	남은 구간: [10, 8, 6]
•	최소값: 6 at index 5
•	10 <-> 6 교환
•	결과: [2, 4, 5, 6, 8, 10]
⸻
🔁 5회전 (i = 4)
•	남은 구간: [8, 10]
•	최소값: 8 → 위치 그대로
•	결과: [2, 4, 5, 6, 8, 10]
⸻
🔁 6회전 (i = 5)
•	마지막 요소 → 더 이상 비교 없음
⸻
✅ 최종 정렬 완료
[2, 4, 5, 6, 8, 10]

```kotlin
class SelectionSort {

    /**
     *  [5, 4, 10, 2, 8, 6] : origin
     * 	[2, 4, 10, 5, 8, 6] : 1회전
     * 	[2, 4, 10, 5, 8, 6] : 2회전
     * 	[2, 4, 5, 10, 8, 6] : 3회전
     * 	[2, 4, 5, 6, 8, 10] : 4회전
     * 	[2, 4, 5, 6, 8, 10] : 5회전
     */
    @Test
    fun sort() {
        val list = giveMeArray()
        val expected = list.sorted().toIntArray()
        val array = list.toIntArray()

        for( i in 0 until array.size - 1) {
            var minimumIndex = i
            for(j in i + 1  until array.size) {
                if(array[minimumIndex] > array[j]) {
                    minimumIndex = j
                    // 가장 작은 것을 앞으로
                }
            }
            val swap = array[i]
            array[i] = array[minimumIndex]
            array[minimumIndex] = swap
        }

        assertArrayEquals(expected, array)
    }
}
```

--------------------------------

## 3. 삽입 정렬

> 시간 복잡도
> - 최선:  O(n) -> 이미 정렬
> - 평균/최악:  O(n²)) -> 역정렬 -> 각 원소를 앞쪽 정렬된 영역에 한 칸씩 비교하면서 끼워 넣음

▸ 시작 상태
[5, 4, 10, 2, 8, 6]
(정렬된 부분 없음 → 첫 원소만 정렬되었다고 가정하고 시작)
⸻
🔁 1회전 (i = 1, 값: 4)
•	정렬 구간: [5]
•	4 < 5 → 5를 오른쪽으로 밀고, 4를 삽입
•	결과: [4, 5, 10, 2, 8, 6]
⸻
🔁 2회전 (i = 2, 값: 10)
•	정렬 구간: [4, 5]
•	10 > 5 → 그대로 유지
•	결과: [4, 5, 10, 2, 8, 6]
⸻
🔁 3회전 (i = 3, 값: 2)
•	정렬 구간: [4, 5, 10]
•	비교: 2 < 10 → 밀기, 2 < 5 → 밀기, 2 < 4 → 밀기
•	삽입 위치: 인덱스 0
•	결과: [2, 4, 5, 10, 8, 6]
⸻
🔁 4회전 (i = 4, 값: 8)
•	정렬 구간: [2, 4, 5, 10]
•	비교: 8 < 10 → 밀기, 8 > 5 → 삽입
•	결과: [2, 4, 5, 8, 10, 6]
⸻
🔁 5회전 (i = 5, 값: 6)
•	정렬 구간: [2, 4, 5, 8, 10]
•	비교: 6 < 10 → 밀기, 6 < 8 → 밀기, 6 > 5 → 삽입
•	결과: [2, 4, 5, 6, 8, 10]

```kotlin
class InsertionSort {
    /**
     *
     *  ```
     *  [5, 4, 10, 2, 8, 6] : origin
     * 	[4, 5, 10, 2, 8, 6] : 1회전
     * 	[4, 5, 10, 2, 8, 6] : 2회전
     * 	[2, 4, 5, 10, 8, 6] : 3회전
     * 	[2, 4, 5, 8, 10, 6] : 4회전
     * 	[2, 4, 5, 6, 8, 10] : 5회전
     *```
     * - 배열을 왼쪽부터 차례로 순회하며, 각 원소를 앞쪽 정렬된 부분 배열에 **“삽입”**해나가는 방식의 정렬.
     * - 앞쪽은 항상 정렬되어 있다는 가정 하에, 현재 원소가 들어갈 위치를 찾아 끼워넣음.
     * - 정렬된 영역을 유지하면서 점진적으로 전체 배열을 정렬시킴.
     */
    @Test
    fun sort() {
        val list = giveMeArray()
        val expected = list.sorted().toIntArray()
        val array = list.toIntArray()



        for (i in 1 until array.size) {
            val temp = array[i]
            var j = i - 1
            while (j >= 0 && array[j] > temp) {
                array[j + 1] = array[j]
                // swap이 아님
                j--
            }
            //이 시점 j는 이미 정렬된 마지막의 인덱스 값이 된다(--)
            array[j + 1] = temp
        }

        assertArrayEquals(expected, array)
    }
}
```

## 4. 셸 정렬

> ### 삽입 정렬의 구조적 한계
> 
> - 삽입 정렬은 한 칸씩만 비교
> - 만약 가장 작은 값이 맨 뒤에 있다면 모든 요소를 하나씩 다 옮겨야 한다.
>   [ 9, 8, 7, 6, 5]의 경우 5는 4번이나 이동해야 한다.
>  
> ### Shell 정렬의 개선 방법
> - 멀리 떨어진 요소들끼리 먼저 정렬 -> 빠른 큰 이동 가능
> - 목적은 크게 어긋난 값을 빨리 제자리 근처로 옮기는 것이다.
> - 결과적으로는 한 칸씩 비교 -> 이미 거의 정렬된 상태 -> 효율 ↑
> - 비교와 이동 횟수가 감소
> 	- **O(log n)** = “매번 절반으로 줄이면서 처리”하는 알고리즘
> 	- **O(n log n)** = “n개의 원소를 log n단계 동안 반복적으로 처리”하는 알고리즘 
 
|   항목   |  삽입 정렬   |            셸 정렬            |
| :----: | :------: | :------------------------: |
| 비교 대상  |  인접한 요소  |      gap 간격만큼 떨어진 요소       |
| 시간 복잡도 |  O(n²)   | 평균 O(n log n), gap에 따라서 변동 |
| 개선 목표  | 느린 이동 속도 |       빠른 정렬 -> 삽입 정렬       |

```kotlin
class ShellSort {  
  
  
    /**  
     * ```     
     *  [5, 4, 10, 2, 8, 6] : origin
     *  ✅ Gap = 3     
     *  •  그룹1: [5, 2] → 정렬 후 [2, 4, 10, 5, 8, 6]    
     *  •  그룹2: [4, 8] → 정렬 후 [2, 4, 10, 5, 8, 6] (이미 정렬됨)  
     *  •  그룹3: [10, 6] → 정렬 후 [2, 4, 6, 5, 8, 10]  
     *  → ✅ 결과 after gap=3: [2, 4, 6, 5, 8, 10]    
     *     *  ✅ Gap = 1 (마지막 삽입 정렬 단계)  
     *  •  삽입 정렬처럼 한 칸씩 비교하면서 정렬  
     *  → [2, 4, 6, 5, 8, 10]  
     *  → [2, 4, 5, 6, 8, 10]   
     *     *  ✅ 최종 결과  
     *  [2, 4, 5, 6, 8, 10]  
     *  ```     
     */
     
    @Test  
    fun sort() {  
        val list = giveMeArray()  
        val expected = list.sorted().toIntArray()  
        val array = list.toIntArray()  
        var gap = array.size / 2  
  
        while (gap > 0) {  
            for( i in gap until array.size) {  
                val temp = array[i]  
                var j = i - gap  
                while(j >= 0 && array[j] > temp) {  
                    array[j + gap] = array[j]  
                    j -= gap  
                }  
                array[j + gap] = temp  
            }  
            gap /= 2  
        }  
  
        assertArrayEquals(expected, array)  
    }  
}
```

## 5. 병합 정렬
- 분할 정복(Divide and Conquer) 기반 알고리즘
- 배열을 반씩 나눠서 재귀적으로 분할하고, 다시 정렬된 상태로 병합하여 전체를 정렬
- 시간 복잡도는 항상 O(n log n)
	- 분할은 단순히 반으로 나누기만 한다. -> log n 깊이의 트리 생성
	- 병합은 두 정렬된 배열을 하나로 합치기에 O(n)
	- 정렬은 병합에서만 일어난다. 
		- 중간 배열에 순서대로 밀어 넣고 중간 배열을 대치하는 방식으로 정렬한다.

```kotlin
class MergeSort {  
    /**  
     * ``` 
     *  [5, 4, 10, 2, 8, 6] : origin
     *  [5,4,10] | [2,8,6] : 분할  
     *  [5,4] [10] | [2,8] [6] : 분할  
     *  [4,5] [10] | [2,8] [6] : 병합1  
     *  [4,5,10] | [2,6,8] : 병합2  
     *  [2,4,5,6,8,10] : 병합3  
     *```
     */
       
    data class Container(  
        val start: Int,  
        val end: Int,  
        val needToMerge: Boolean  
    ) {  
  
    }  
    @Test  
    fun sortUseStack() {  
        val list = giveMeArray()  
        val expected = list.sorted().toIntArray()  
        val array = list.toIntArray()  
        val stack = Stack<Container>()  
        stack.push(Container(0, array.size - 1, false))  
  
  
        while (stack.isNotEmpty()) {  
            val (start, end, needToMerge) = stack.pop()  
  
            if (needToMerge) {  
                val mid = (start + end) / 2  
                val tempArray = mutableListOf<Int>()  
                var i = start  
                var j = mid + 1  
  
                //  •  array[start..mid]와 array[mid+1..end]는 이미 정렬된 상태  
                //  •  이 두 구간을 하나의 정렬된 구간 [start..end]로 만들기 위함  
                while (i <= mid && j <= end) {  
                    if (array[i] <= array[j]) tempArray.add(array[i++])  
                    else tempArray.add(array[j++])  
  
                    //  •  왼쪽 포인터 i는 start부터, 오른쪽 포인터 j는 mid+1부터 시작  
                    //  •  두 값을 비교해 더 작은 값을 temp 리스트에 추가  
                    //  •  추가한 쪽의 포인터를 하나 증가시킴  
                    //  •  이 과정을 두 포인터 중 하나가 끝날 때까지 반복  
                }  
                while (i <= mid) tempArray.add(array[i++])  
                //  왼쪽 구간에 값이 남은 경우, 남은 값을 전부 temp에 추가  
                while (j <= end) tempArray.add(array[j++])  
                //오른쪽 구간에 값이 남은 경우, 남은 값을 전부 temp에 추가  
  
                for ((key, value) in tempArray.withIndex()) {  
                    array[start + key] = value  
                }  
  
                continue  
            }  
            if (start >= end) continue  
  
            val mid = (start + end) / 2  
            //분할을 위한 모집  
            stack.push(Container(start, end, true))  
  
            //다음 분할을 위해서 저장  
            //결국은 위의 스택에 들어가면서 정렬할 것  
            stack.push(Container(mid + 1, end, false))  
            stack.push(Container(start, mid, false))  
        }  
  
  
  
        assertArrayEquals(expected, array)  
    }  
  
    @Test  
    fun sortUseCallStack() {  
        val list = giveMeArray()  
        val expected = list.sorted().toIntArray()  
        val array = list.toIntArray()  
  
        mergeSort(array, 0, array.size - 1)  
        assertArrayEquals(expected, array)  
    }  
  
    fun merge(array: IntArray, start: Int, mid: Int, end: Int): Unit {  
        var tempArray = mutableListOf<Int>()  
        var i = start  
        var j = mid + 1  
        while (i <= mid && j <= end) {  
            if (array[i] <= array[j]) tempArray.add(array[i++])  
            else tempArray.add(array[j++])  
        }        while (i <= mid) tempArray.add(array[i++])  
        while (j <= end) tempArray.add(array[j++])  
        for ((key, value) in tempArray.withIndex()) {  
            array[start + key] = value  
        }  
    }  
  
    fun mergeSort(array: IntArray, start: Int, end: Int): Unit {  
        if (start < end) {  
            val mid = (start + end) / 2  
            mergeSort(array, start, mid)  
            mergeSort(array, mid + 1, end)  
  
            merge(array, start, mid, end)  
        }  
    }  
}
```

## 6. 퀵 정렬
- 분할 정복 기반의 정렬 알고리즘
- 배열의 pivot을 하나 선택해서 pivot보다 작은 값은 왼쪽, 큰 값은 오른쪽으로 보내서 분할
- pivot의 선택이 가장 중요하다.
- 이후 양쪽 구간에 대해서 재귀적으로 퀵정렬 반복
- 퀵정렬에서 “퀵”이란 이름은 **정렬을 빠르게 수행**하는 특성에서 유래한 것입니다. 퀵정렬이 **다른 알고리즘들에 비해 빠르게 동작**하는 이유는, **피벗을 기준으로 배열을 빠르게 분할**하고, 각 분할된 부분에 대해 재귀적으로 빠르게 정렬을 처리하기 때문입니다.

	- **퀵정렬의 빠른 분할**: 배열을 한 번만 순회하면서 작은 값들은 왼쪽으로, 큰 값들은 오른쪽으로 빠르게 이동시킵니다. 이때 배열을 분할하는 데 소요되는 시간은 O(n)입니다.
    
	- **분할 후 정렬**: 분할된 부분 배열에 대해서는 재귀적으로 퀵정렬을 적용하는데, 이 과정을 반복하여 모든 배열이 정렬됩니다.

> - 정렬의 핵심
> 	- 전체 데이터를 직접 비교하고 위치를 조정하는 것이 비효율
> 	- 따라서 pivot을 기준으로 정렬 대상 범위를 줄인다.
> - 퀵정렬 전략
> 	- pivot 하나만으로 배열 두 부분으로 나누고, 각각 독립적으로 처리 가능 -> 재귀적 설계 가능
> 	- 평균 시간 복잡도 O(n log n), 공간은 O(log n)

- 분할
	- pivot을 기준으로 작은 값은 왼쪽, 큰 값은 오른쪽에 오도록 swap
	- 최종적으로 pivot은 정렬된 위치에 놓이게 된다.
- 재귀 정렬
	- pivot을 기준으로 나눠 왼/오른쪽 부분 배열에 대해서 퀵정렬을 재귀적으로 수행
	- 더 이상 나눌 수 없을 때까지 반복

```kotlin
class QuickSort {  
  
    data class Container (  
        val left: Int,  
        val right: Int,  
    ){}  
    
    /**  
     * ```
     *  [5, 4, 10, 2, 8, 6] : origin
     *  [4, 2, 5, 6, 8, 10] : 1회전  
     *  [2, 4, 5, 6, 8, 10] : 2회전  
     *```  
     */
     
    @Test  
    fun sortUseStack() {  
        val list = giveMeArray()  
        val expected = list.sorted().toIntArray()  
        val array = list.toIntArray()  
        val stack = Stack<Container>()  
        stack.push(Container(0, array.size - 1))  
  
        while(stack.isNotEmpty()) {  
            val (left, right) = stack.pop();  
            var leftPoint = left  
            var rightPoint = right  
            var pivotValue = array[(leftPoint + rightPoint) / 2]  
  
            do {  
            //pivot을 기준으로
            //leftPoint의 값이 작으면 skip
            //rightPoint도 같음
            //pivot보다 크면 해당 포인트에서 루핑을 종료
            
                while (pivotValue > array[leftPoint]) leftPoint += 1;  
                while (pivotValue < array[rightPoint]) rightPoint -= 1;  

			// pivot과 바뀌거나
			// pivot보다 큰 것 <-> pivot보다 작은 것
                if (leftPoint <= rightPoint) {  
                    val temp = array[leftPoint]  
                    array[leftPoint] = array[rightPoint]  
                    array[rightPoint] = temp  
                    leftPoint += 1  
                    rightPoint -= 1  
                }  
  
            } while (leftPoint <= rightPoint)  
  
            if(left < rightPoint) {  
                stack.push(Container(left, rightPoint))  
            }  
            if(right > leftPoint) {  
                stack.push(Container(leftPoint, right))  
            }  
  
        }  
  
        assertArrayEquals(expected, array)  
    }  
  
  
    private fun quickSort(array: IntArray, left: Int, right: Int) {  
        var leftPoint = left  
        var rightPoint = right  
        var pivotValue = array[(leftPoint + rightPoint) / 2]  
  
        do {  
            while (pivotValue > array[leftPoint]) leftPoint += 1;  
            while (pivotValue < array[rightPoint]) rightPoint -= 1;  
  
            if (leftPoint <= rightPoint) {  
                val temp = array[leftPoint]  
                array[leftPoint] = array[rightPoint]  
                array[rightPoint] = temp  
                leftPoint += 1  
                rightPoint -= 1  
            }  
  
        } while (leftPoint <= rightPoint)  
  
        if(left < rightPoint) {  
            quickSort(array, left, rightPoint)  
        }  
        if(right > leftPoint) {  
            quickSort(array, leftPoint, right)  
        }  
    }  
  
    @Test  
    fun sortUseCallStack() {  
        val list = giveMeArray()  
        val expected = list.sorted().toIntArray()  
        val array = list.toIntArray()  
  
        quickSort(array, 0, array.size - 1)  
  
  
        assertArrayEquals(expected, array)  
    }  
}
```

## 힙 정렬
- 힙 정렬(Heap Sort)은 **힙(Heap)** 자료구조를 이용한 정렬 알고리즘입니다.
- 힙 정렬의 핵심 아이디어는 **힙**을 이용하여 배열을 정렬하는 것으로, **최대 힙(Max Heap)**이나 **최소 힙(Min Heap)**을 사용하여 순차적으로 정렬을 진행합니다.

> ### 1. **힙(Heap) 자료구조**
>   
> 
> - 힙은 **완전 이진 트리(Complete Binary Tree)** 구조
> - 각 노드의 값이 특정 조건을 만족하는 트리입니다.
> - 이 조건을 **힙 속성(Heap Property)**이라고 합니다.
> 	- **최대 힙(Max Heap)**: 부모 노드의 값이 자식 노드의 값보다 크거나 같은 트리입니다.
> 		- 이진 트리의 일종
> 		- root가 가장 큰 값을 가진다. -> 최대 값을 빠르게 꺼내기 위해서 설계된 구조
> 		- 완전 이진 트리로 구현되므로, 배열로 인덱스 기반 연산이 가능
> 	- **최소 힙(Min Heap)**: 부모 노드의 값이 자식 노드의 값보다 작거나 같은 트리입니다.
> 	 
> ### 2. **힙 정렬의 기본 원리**
>
> - heapify: 배열을 힙 구조로 만드는 과정, 배열이 주어졌을 때 이를 최대 힙이나 최소 힙으로 변환
> - sorting: 힙의 루트 노드를 배열의 끝과 교환하고 배열의 크기를 줄여가면 이 과정을 반복
> 
> ### **4.** **힙 정렬의 장단점**
>
>#### **장점:**
> - **시간 복잡도**: 최악의 경우에도 O(n log n)으로 안정적입니다.
> - **공간 효율성**: 추가적인 메모리 공간을 거의 사용하지 않으며 O(1)의 공간 복잡도를 가집니다.
> - **병렬 처리 가능성**: 힙 정렬은 병렬 처리가 가능하다는 장점이 있습니다.
>
>#### **단점:**
>- **불안정 정렬(Unstable Sort)**: 힙 정렬은 동일한 값의 상대적 순서를 보장하지 않기 때문에 불안정 정렬입니다.
>- **상대적으로 느림**: 힙 정렬은 다른 알고리즘(예: 퀵정렬, 병합정렬)에 비해 상대적으로 구현이 복잡하고, 일부 경우에는 성능이 더 나쁠 수 있습니다.