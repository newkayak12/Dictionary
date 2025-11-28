# Sliding Window

## 슬라이딩 윈도우란??
고정 사이즈의 윈도우가 이동하면서 윈도우 내에 있는 데이터를 이용해서 문제를 풀이하는 알고리즘을 의미한다.
배열, 리스트 요소의 일정 범위의 값을 비교할 때 사용하면 유용하다.

## 슬라이딩 윈도우와 투포인터
함께 자주 업근되는 알고리즘으로 [`투 포인터`](TwoPointer.md)가 있다.
투 포인터와 슬라이딩 윈도우는 선형(1차원 배열)을 2회 이상 반복 탐색해야할 경우 O(n<sup>2</sup>) 이상 걸릴 시간 복잡도를
부분 배열을 이용해서 O(n)으로 출일 수 있다는 공통점이 있다.

## 슬라이딩 윈도우와 투 포인터의 차이
둘의 차이는 투 포인터는 부분 배열의 길이가 가변적이지만 슬라이딩 윈도우는 부분 배열의 길이가 고정이라는 것이다.
또 다른 차이점은 투 포인터는 부분 배열의 크기가 가변이라 구간을 정한 2개의 포인터 변수가 필요한 반면, 슬라이딩은 배열 길이가 고정이기에
포인터 개수를 하나로 잡으면 된다는 것이다.

## 슬라이딩 윈도우 예시
{A, A, A, C, C, T, G, C} 배열이 있고 길이가 3인 문자열을 슬라이딩 윈도우로 구하면?

길이가 3인 부분 집합
{[A, A, A], C, C, T, G, C}

앞의 요소를 제거하고 마지막 요소의 다음 요소를 부분 문자열에 포함
{A, [A, A, C], C, T, G, C}

반복
{A, A, [A, C, C], T, G, C}


### 슬라이딩 윈도우 핵심
- `새 합 = 이전 합 - 왼쪽 제거 값 + 오른쪽 추가 값`
- `windowSum += extend[i] - extend[i - len]`
- 이전 계산을 Incremental 하게 업데이트하고 계산을 재사용한다.

### 정리
- **이전 합 재사용** ✓
- **맨 앞 제거(-)** ✓
- **맨 뒤 추가(+)** ✓
- **O(1) 연산으로 윈도우 이동**

- 연속 부분 수열 합의 개수
```kotlin
  
class `연속 부분 수열 합의 개수` {  
    /**  
     * https://school.programmers.co.kr/learn/courses/30/lessons/131701?language=kotlin  
     */  
  
    @Test  
    fun solution() {  
        val elements = intArrayOf(7, 9, 1, 1, 4)  
        val result = 18  
  
        assertEquals(result, calculate(elements))  
        assertEquals(result, useSlidingWindow(elements))  
    }  
  
    fun calculate(elements: IntArray): Int {   //브루트 포스
        var sumSet = mutableSetOf<Int>()  
  
        for(i in 1 .. elements.size) {  
            for(j in elements.indices) {  
                var sum = 0  
                for(l in j until i + j) {  
                    sum += elements[l % elements.size]  
                }  
  
                sumSet.add(sum)  
            }  
        }  
  
        return sumSet.size  
    }  
  
    private fun useSlidingWindow(elements: IntArray): Int {  
        val n = elements.size  
        val sums = mutableSetOf<Int>()  
        val extends = elements + elements  
  
        for(len in 1 .. n) {  
            var windowSum = extends.take(len).sum()  
            sums.add(windowSum)  
  
            for(i in len until n + len) {  
                windowSum += (extends[i] - extends[i - len])  
                sums.add(windowSum)  
            }  
        }  
  
        return sums.size  
    }  
}
```
- 할인 행사 
```kotlin
  
class `할인 행사` {  
    //SlidingWindow  
  
    /**  
     * https://school.programmers.co.kr/learn/courses/30/lessons/131127?language=kotlin 
     */
       
    @Test  
    fun solution1() {  
        val want = arrayOf("banana", "apple", "rice", "pork", "pot")  
        val number = intArrayOf(3, 2, 2, 2, 1)  
        val discount = arrayOf(  
            "chicken",  
            "apple",  
            "apple",  
            "banana",  
            "rice",  
            "apple",  
            "pork",  
            "banana",  
            "pork",  
            "rice",  
            "pot",  
            "banana",  
            "apple",  
            "banana"  
        )  
        val expected = 3  
  
        assertEquals(expected, calculate(want, number, discount))  
    }  
  
  
    @Test  
    fun solution2() {  
        val want = arrayOf("apple")  
        val number = intArrayOf(10)  
        val discount =  
            arrayOf("banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana")  
        val expected = 0  
  
        assertEquals(expected, calculate(want, number, discount))  
    }  
  
    private fun calculate(want: Array<String>, number: IntArray, discount: Array<String>): Int {  
        val length = 10  
        val wantMap = want.withIndex().associate { it.value to number[it.index] }  
        val discountMap = discount.take(length).groupBy { it }.mapValues { it.value.size }.toMutableMap()  
        val valid = wantMap.all { (key, count) -> (discountMap[key]?:0) >= count }  
        var count = if (valid) 1 else 0  
  
        for (i in 0 until discount.size - length) {  
  
            val minus = discount[i]  
            val plus = discount[i + length]  
  
  
            discountMap[minus] = (discountMap[minus]?:0)+1  
            discountMap[plus] = (discountMap[plus]?:0)+1  
  
            val valid = wantMap.all { (key, count) -> (discountMap[key]?:0) >= count }  
  
            count += if (valid) 1 else 0  
        }  
  
  
        return count  
    }  
}
```
---

## 투 포인터 예시


{ A, A, A, C, C, T, G, C }
  S
  E

이와 같이 처음에 S, E를 누고 시작한다.

{ A, A, A, C, C, T, G, C }
  S
     E

E를 이동시키며 값을 구한다.

생략 ....

