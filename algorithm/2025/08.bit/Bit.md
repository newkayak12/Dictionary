### 기본 개념

1. **비트(bit)**: 0 또는 1로 이뤄진 정보의 최소 단위
2. **정수의 이진 표현**을 직접 다뤄서 연산하는 기법
3. 사칙 연산보다 **빠르고 메모리 효율적**이며, 부분집합/플래그/마스킹에 강하다

---

### 핵심 특징

1. **속도**: 비트 연산은 CPU 단일 사이클 연산 → `O(1)`
2. **표현력**: 정수 하나로 **64개의 boolean** 표현 가능 (`Long` 기준)
3. **무분기 처리**: 조건 분기 없이 비트 연산만으로 케이스 통합 가능

---

### 2의 보수 (Two's Complement)

1. 음수를 표현하는 방식: **`-y = ~y + 1`**
2. MSB(최상위 비트)가 부호 역할: `0` → 양수, `1` → 음수
3. 덧셈 회로만으로 뺄셈 처리 가능 (현대 CPU 표준)
4. Kotlin의 `Long`은 64비트 signed → 비트 연산 시 그대로 64비트 패턴으로 다루면 됨

---

### 비트 연산자 (Kotlin)

|연산|Kotlin|C/Java|의미|
|---|---|---|---|
|AND|`and`|`&`|둘 다 `1`일 때 `1`|
|OR|`or`|`\|`|하나라도 `1`이면 `1`|
|XOR|`xor`|`^`|다를 때만 `1`|
|NOT|`inv()`|`~`|비트 뒤집기|
|Left Shift|`shl`|`<<`|왼쪽으로 이동 (×2)|
|Right Shift (산술)|`shr`|`>>`|오른쪽으로 이동, 부호 유지|
|Right Shift (논리)|`ushr`|`>>>`|오른쪽으로 이동, `0` 채움|

---

### 비트 연산 기본 패턴

#### 1. 비트 켜기 / 끄기 / 토글 / 검사

kotlin

```kotlin
val on     = x or  (1 shl k)           // k번째 비트 켜기
val off    = x and (1 shl k).inv()     // k번째 비트 끄기
val toggle = x xor (1 shl k)           // k번째 비트 토글
val isOn   = (x and (1 shl k)) != 0    // k번째 비트 검사
```

#### 2. 2의 거듭제곱 판별

kotlin

```kotlin
val isPowerOfTwo = x > 0 && (x and (x - 1)) == 0
```

> `x`가 `2^k` 형태면 비트가 단 하나만 `1`. `x - 1`은 그 아래 비트 전부 `1`. AND → `0`.

#### 3. 최하위 `1` 비트만 남기기

kotlin

```kotlin
val lowestOne = x and -x
```

> 2의 보수 트릭. `x = 01100` → `-x = 10100` → `x and -x = 00100`

#### 4. 최하위 `1` 비트 끄기

kotlin

```kotlin
val cleared = x and (x - 1)
```

> 비트 개수 카운팅, 2의 거듭제곱 판별 등에 활용

#### 5. 최하위 `0` 비트만 남기기

kotlin

```kotlin
val lowestZero = x.inv() and (x + 1)
```

> `x`의 비트를 뒤집어서(`~x`) `0`을 `1`로 만든 뒤, 최하위 `1`만 추출

#### 6. 부분집합 순회 (비트마스크)

kotlin

```kotlin
for (mask in 0 until (1 shl n)) {
    for (i in 0 until n) {
        if ((mask and (1 shl i)) != 0) {
            // i번째 원소가 부분집합에 포함됨
        }
    }
}
```

> `n`개의 원소에 대한 모든 부분집합 `2^n`개를 정수로 표현

---

### 패턴 분류

#### 1. 비트마스크 부분집합

- `n`개의 원소를 `n`비트 정수로 표현
- 모든 부분집합을 `0 ~ 2^n - 1` 정수로 순회
- 기준
    - `n`이 작은가? (`n ≤ 20` 정도)
    - 모든 부분집합을 검사해야 하는가?
- 예: 외판원 문제(TSP), 부분집합 합

#### 2. 비트 패턴 분석

- 입력과 출력의 비트 차이를 관찰해 규칙 도출
- 케이스 분기를 비트 연산 한 줄로 통합
- 기준
    - 입출력이 정수이고 비트 표현에 규칙이 있는가?
    - 조건 분기 없이 단일 식으로 처리 가능한가?
- 예: `f(x)` (비트 1~2개 다른 다음 수), 그레이 코드

#### 3. XOR 누적

- `a xor a = 0`, `a xor 0 = a` 성질 이용
- 짝수 번 등장한 원소는 사라지고 홀수 번 등장한 원소만 남음
- 기준
    - "한 개만 다른 것 찾기" 유형인가?
    - 추가 메모리 없이 처리해야 하는가?
- 예: 한 번만 등장하는 수 찾기, 두 수 swap

#### 4. 비트 카운팅

- `countOneBits()`, `Integer.bitCount()` 활용
- 또는 `x and (x - 1)` 반복으로 직접 카운트
- 기준
    - `1` 비트 개수가 답에 영향을 주는가?
- 예: 해밍 거리, popcount 기반 분류

#### 5. 시프트 기반 자릿수 처리

- `shl`, `shr`로 2의 거듭제곱 곱셈/나눗셈
- 자리 이동으로 비트 추출
- 기준
    - 2진수 자릿수를 순회하는가?
    - 곱셈/나눗셈을 빠르게 처리해야 하는가?

---

### 자주 쓰는 비트 트릭 요약

|목적|식|
|---|---|
|짝수 판별|`(x and 1) == 0`|
|부호 반전|`x.inv() + 1` 또는 `-x`|
|두 수의 평균 (overflow 방지)|`(a and b) + ((a xor b) shr 1)`|
|`a`와 `b` 비트 차이 개수|`(a xor b).countOneBits()`|
|`x`의 비트 길이|`64 - x.countLeadingZeroBits()`|
|최하위 `1` 추출|`x and -x`|
|최하위 `1` 끄기|`x and (x - 1)`|
|최하위 `0` 추출|`x.inv() and (x + 1)`|
|2의 거듭제곱?|`x > 0 && (x and (x - 1)) == 0`|

---

### 예시 문제

#### 1) 비트 1~2개 다른 다음 수 (Programmers) - 비트 패턴 분석

kotlin

```kotlin
class NextBiggerNumber {
    /**
     * 양의 정수 x에 대해 f(x) 정의:
     * x보다 크고, 비트가 1~2개 다른 수 중 제일 작은 수
     *
     * 예) f(2) = 3, f(7) = 11
     *
     * 제약: 1 ≤ numbers.length ≤ 100,000, 0 ≤ numbers[i] ≤ 10^15
     *
     * --- 풀이 핵심 ---
     * 통합 규칙: 오른쪽부터 처음 만나는 0의 위치 p를
     *           1로 켜고, p-1 위치를 0으로 끈다.
     *
     * - x의 마지막 비트가 0 → p = 0, +1과 동일
     * - x의 마지막 비트가 1이고 0이 포함 → p는 표현 내부
     * - x가 전부 1 (2^k - 1) → p는 표현 바깥, Long 상위 비트에서 자동 처리
     *
     * 핵심 식:
     *   m     = x.inv() and (x + 1)   // 최하위 0 비트만 켜진 마스크
     *   lower = m shr 1               // 그 바로 아래 비트 (p-1)
     *   f(x)  = (x xor lower) or m    // p-1 끄고, p 켜기
     */

    @Test
    fun solution() {
        val numbers = longArrayOf(2, 7, 11, 15, 17)
        val expected = longArrayOf(3, 11, 13, 23, 18)

        assertArrayEquals(expected, bitManipulation(numbers))
    }

    private fun bitManipulation(numbers: LongArray): LongArray {
        val answer = LongArray(numbers.size)

        for (i in numbers.indices) {
            val x = numbers[i]
            val m = x.inv() and (x + 1)
            val lower = m shr 1
            answer[i] = (x xor lower) or m
        }

        return answer
    }
}
```

> **시간복잡도**: `O(N)`. 각 원소당 비트 연산 4번. **포인트**: 케이스 분기 없이 단일 식. `Long`의 64비트 표현이 leading zero 영역을 자동 제공해 "전부 `1`" 케이스도 무료로 처리.

---

#### 2) 부분집합 합 (비트마스크 부분집합)

kotlin

```kotlin
class SubsetSum {
    /**
     * n개의 정수가 주어졌을 때, 부분집합의 합이 target이 되는
     * 부분집합의 개수를 구하라. (1 ≤ n ≤ 20)
     */

    @Test
    fun solution() {
        val nums = intArrayOf(1, 2, 3, 4, 5)
        val target = 5

        // {1,4}, {2,3}, {5} → 3개
        val expected = 3
        assertEquals(expected, bitmask(nums, target))
    }

    private fun bitmask(nums: IntArray, target: Int): Int {
        val n = nums.size
        var count = 0

        for (mask in 0 until (1 shl n)) {
            var sum = 0
            for (i in 0 until n) {
                if ((mask and (1 shl i)) != 0) {
                    sum += nums[i]
                }
            }
            if (sum == target) count++
        }

        return count
    }
}
```

> **시간복잡도**: `O(2^n × n)`. `n ≤ 20`일 때 약 `2 × 10^7`로 충분.

---

#### 3) 한 번만 등장하는 수 찾기 - XOR 누적

kotlin

```kotlin
class SingleNumber {
    /**
     * 배열에서 모든 원소가 두 번씩 등장하지만,
     * 단 하나의 원소만 한 번 등장한다. 그 원소를 찾아라.
     *
     * 제약: O(N) 시간, O(1) 추가 메모리
     */

    @Test
    fun solution() {
        val nums = intArrayOf(4, 1, 2, 1, 2)
        val expected = 4

        assertEquals(expected, xorAccumulate(nums))
    }

    private fun xorAccumulate(nums: IntArray): Int {
        var result = 0
        for (n in nums) {
            result = result xor n
        }
        return result
    }
}
```

> **포인트**: `a xor a = 0` 성질로 두 번 등장한 원소들은 모두 상쇄. 남는 건 단 하나 등장한 원소.