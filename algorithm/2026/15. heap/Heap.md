## 힙이란
2. 완전 이진 트리 기반
3. 부모-자식 간 대소관계

## 최대, 최소 힙
1. 최대 힙 
	1. 부모 >= 자식
	2. root에 최댓값
2. 최소 힙
	1. 부모 <= 자식
	2. root에 최솟값
3. 형제 간 순서 보장 X

## 표현 (0-index)
1. 부모 (i - 1) / 2
2. 왼쪽 (2 * i) + 1
3. 오른쪽 (2 * i) + 2

### 시간 복잡도

- 삽입: `O(log n)`
- 삭제(루트 제거): `O(log n)`
- 최댓값/최솟값 조회: `O(1)`



### 최소 힙
```kotlin
  
class MinHeap() {  
    val heap = mutableListOf<Int>()  
  
  
    private fun heapifyUp() {  
        var i = heap.size - 1  
  
        while (i > 0) {  
            var smallest = (i - 1) / 2  
            if (heap[smallest] < heap[i]) break  
  
            val temp = heap[smallest]  
            heap[smallest] = heap[i]  
            heap[i] = temp  
            i = smallest  
        }  
    }  
  
    private fun heapifyDown() {  
        var i = 0  
  
        while (i < heap.size) {  
            var smallest = i  
            var leftChild = 2 * i + 1  
            var rightChild = 2 * i + 2  
  
            if (leftChild in heap.indices && heap[smallest] > heap[leftChild]) smallest = leftChild  
            if (rightChild in heap.indices && heap[smallest] > heap[rightChild]) smallest = rightChild  
  
            if (smallest == i) break  
  
  
            val temp = heap[i]  
            heap[i] = heap[smallest]  
            heap[smallest] = temp  
            i = smallest  
        }  
    }  
  
    fun add(number: Int) {  
        heap.add(number)  
        heapifyUp()  
    }  
  
    fun remove() = when {  
        heap.isEmpty() -> throw IllegalStateException()  
        heap.size == 1 -> heap.removeFirst()  
        else -> heap[0].also {  
            heap[0] = heap.removeLast()  
            heapifyDown()  
        }  
    }  
  
}
```