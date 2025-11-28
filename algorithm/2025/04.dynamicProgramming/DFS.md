|    유형     | 선택 방식 | 순서  | for문 |     중복 제어      | 백트래킹 |
| :-------: | :---: | :-: | :--: | :------------: | :--: |
|  **순열**   | 일부 선택 |  O  |  O   | visit (재선택 방지) |  O   |
|  **조합**   | 일부 선택 |  X  |  O   |  start = i+1   |  O   |
| **부분집합**  | 전체 처리 |  X  |  X   |       없음       |  O   |
| **이진 선택** | 전체 처리 |  O  |  X   |       없음       |  X   |
|  **그래프**  | 구조 탐색 |  -  |  O   | visit (재방문 방지) |  X   |

## 1. 순열 (Permutation)

### 특징

- n개를 **모두 사용**하여 **나열하는 모든 순서**
- [1,2,3] ≠ [3,2,1] (순서 다르면 다른 결과)

### 판단 기준

- "모든 배치 방법", "모든 순서"

### 예시
```kotlin
  
class Permutation {  
    /**  
     * 문제: [1,2,3]의 모든 순열을 출력하라  
     *  
     * 입력: [1,2,3]  
     * 출력: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]  
     */  
    @Test  
    fun solution() {  
        val input = intArrayOf(1, 2, 3)  
        val expected = arrayOf(  
            intArrayOf(1, 2, 3),  
            intArrayOf(1, 3, 2),  
            intArrayOf(2, 1, 3),  
            intArrayOf(2, 3, 1),  
            intArrayOf(3, 1, 2),  
            intArrayOf(3, 2, 1)  
        )  
  
        assertArrayEquals(expected, calculate(input))  
    }  
  
  
    private fun calculate(input: IntArray): Array<IntArray> {  
  
        val result = mutableListOf<IntArray>()  
        recursive(input, BooleanArray(input.size), mutableListOf(), result)  
        return result.toTypedArray()  
    }  
  
    private fun recursive(  
        input: IntArray,  
        visit: BooleanArray,  
        mutableList: MutableList<Int>,  
        result: MutableList<IntArray>  
    ) {  
  
        if(input.size == mutableList.size) {  
            result.add(mutableList.toIntArray())  
            return  
        }  
  
        for((index, value) in input.withIndex()) {  
            if(visit[index]) continue  
            mutableList.add(value)  
            visit[index] = true  
            recursive(input, visit, mutableList, result)  
            mutableList.removeLast()  
            visit[index] = false  
        }  
  
  
    }  
}
```

## 2. 조합 (Combination)

### 특징

- n개 중 **r개 선택** (순서 무관)
- {1,2} = {2,1} (같은 원소면 같은 결과)

### 판단 기준

- "r개 선택", "r개 조합"

### 예시
```kotlin
  
class Combination {  
    /**  
     * 2. 조합  
     * 문제: [1,2,3,4]에서 2개를 선택하는 모든 조합  
     *  
     * 입력: [1,2,3,4], r=2  
     * 출력: [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]  
     */  
    @Test  
    fun solution() {  
        val input = intArrayOf(1, 2, 3, 4)  
        val choice = 2  
        val expected = arrayOf(intArrayOf(1,2), intArrayOf(1,3), intArrayOf(1,4), intArrayOf(2,3), intArrayOf(2,4), intArrayOf(3,4))  
  
  
        assertArrayEquals(expected, calculate(input, choice))  
    }  
  
    private fun calculate(input: IntArray, choice: Int): Array<IntArray> {  
        val result = mutableListOf<IntArray>()  
        useRecursive(0, input, choice, 0, mutableListOf(), result)  
  
        return result.toTypedArray()  
    }  
  
    private fun useRecursive(  
        start: Int,  
        input: IntArray,  
        choice: Int,  
        count: Int,  
        path: MutableList<Int>,  
        result: MutableList<IntArray>  
    ) {  
  
  
        if(choice == count) {  
            result.add(path.toIntArray())  
            return  
        }  
  
        for(i in start until  input.size) {  
            path.add(input[i])  
            useRecursive(i + 1, input, choice, count + 1, path, result)  
            path.removeLast()  
        }  
    }  
}
```

## 3. 부분집합 (Subset)

### 특징

- 각 원소를 **포함/미포함** 결정
- {1,3} = {3,1} (원소만 같으면 동일)

### 판단 기준

- "부분집합", "포함 여부"

### 예시
```kotlin
class SubSet {  
    /**  
     * 3. 부분집합  
     * 문제: [1,2,3]의 모든 부분집합  
     *  
     * 입력: [1,2,3]  
     * 출력: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]  
     */  
    
    @Test  
    fun solution() {  
        val input = intArrayOf(1, 2, 3)  
        val expected = arrayOf(  
            intArrayOf(),  
            intArrayOf(1),  
            intArrayOf(2),  
            intArrayOf(3),  
            intArrayOf(1, 2),  
            intArrayOf(1, 3),  
            intArrayOf(2, 3),  
            intArrayOf(1, 2, 3)  
        )  
  
        assertArrayEquals(expected, calculate(input))  
    }  
  
    private fun calculate(input: IntArray): Array<IntArray> {  
        val result = mutableListOf<IntArray>()  
        useRecursive(input, 0, mutableListOf(), result)  
  
  
        return result.toTypedArray()  
    }  
  
    private fun useRecursive(input: IntArray, start: Int, path: MutableList<Int>, result: MutableList<IntArray>) {  
  
        result.add(path.toIntArray())  
  
        for(index in start until input.size) {  
            path.add(input[index])  
            useRecursive(input, index + 1, path, result)  
            path.removeLast()  
        }  
  
    }  
}
```

## 4. 이진 선택 (Binary Choice)

### 특징

- 각 **위치에서 N가지 연산** 선택
- 위치 순서 고정, 연산만 선택
- +1-2+3 ≠ -2+1+3 (위치 다르면 다름)

### 판단 기준

- "각 원소에 연산 적용", "순서 고정하고 연산 선택"

### 예시
```kotlin
class TargetNumber {  
    /**  
     * **문제**:  
     * 배열 numbers의 숫자를 순서대로 더하거나 빼서 target을 만드는 방법의 수를 return 하세요.  
     *     
     * **제한사항**:  
     * - numbers 길이: 2~20  
     * - numbers 원소: 1~50  
     * - target: 1~1000     
     *     
     * **입출력 예**:  
     * 
     * numbers: [1, 1, 1, 1, 1]     
     * target: 3     
     * return: 5   
     */
       
    @Test  
    fun solution(){  
        val numbers = intArrayOf(1, 1, 1, 1, 1)  
        val target = 3  
        val expected = 5  
  
        assertEquals(expected, calculate(numbers, target))  
    }  
  
    private fun calculate(numbers: IntArray, target: Int): Int {  
        return useRecursive(numbers, target, 0, 0)  
    }  
  
    private fun useRecursive(numbers: IntArray, target: Int, sum: Int, step: Int): Int {  
        if(numbers.size == step) {  
            return if(target == sum) 1 else 0  
        }  
        var count = 0  
  
        val value = numbers[step]  
        count += useRecursive(numbers, target, sum - value, step + 1)  
        count += useRecursive(numbers, target, sum + value, step + 1)  
  
  
        return count  
    }  
}
```


## 5. 그래프 (Graph)

### 특징

- **연결된 노드**를 따라 이동
- 방문 체크 (복구 없음)

### 판단 기준

- "연결", "네트워크", "경로", "섬", "영역"

### 예시
```kotlin
class Graph {  
    /**  
     * ### 예시 문제: 네트워크  
     *  
     * **문제**:  
     * n개의 컴퓨터가 있습니다.  
     * 연결 정보가 담긴 2차원 배열 computers가 주어질 때,  
     * 네트워크의 개수를 return 하세요.  
     *     
     * **제한사항**:  
     * - n: 1~200    
     * - computers[i][j]: i와 j 연결 여부 (1: 연결, 0: 미연결)  
     * - computers[i][i]는 항상 1  
     *     
     * **입출력 예**:  
     * ```     
     * n: 3   
     * computers: [[1,1,0], 
     *             [1,1,0],  
     *             [0,0,1]]   
     * return: 2    
     * // 0-1 연결, 2 독립 → 2개 네트워크  
     * ```  
     */  
    
    @Test  
    fun solution() {  
        val n = 3  
        val computers = arrayOf(  
            intArrayOf(1, 1, 0),  
            intArrayOf(1, 1, 0),  
            intArrayOf(0, 0, 1)  
        )  
        val expected = 2  
  
  
        assertEquals(expected, calculate(n, computers))  
    }  
  
  
    fun calculate(n: Int, computers: Array<IntArray>): Int {  
        val visit = BooleanArray(n)  
        var count = 0  
  
        for (i in 0 until n) {  
            if (visit[i]) continue  
  
            visit[i] = true  
            useRecursive(i, computers, visit)  
            count++  
        }  
  
        return count  
    }  
  
    private fun useRecursive(node: Int, computers: Array<IntArray>, visit: BooleanArray) {  
  
        for ((index, value) in computers[node].withIndex()) {  
            if (index == node) continue  
            if (visit[index]) continue  
  
            if (value == 1) {  
                visit[index] = true  
                useRecursive(index, computers, visit)  
            }  
        }  
    }  
}
```


## 패턴 선택 플로우  
```  
Q: n개 중 일부만 선택?  
├─ YES → Q: 순서 중요?  
│         ├─ YES → 순열  
│         └─ NO  → 조합  
│  
└─ NO → Q: 각 원소 처리 방법 결정?  
         ├─ YES → Q: 위치 중요?  
         │         ├─ YES → 이진 선택  
         │         └─ NO  → 부분집합  
         │  
         └─ NO → 그래프
```
