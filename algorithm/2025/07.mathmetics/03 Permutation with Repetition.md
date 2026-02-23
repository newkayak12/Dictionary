## 순열
 - 정의: 서로 다른 n개 중에서 r개를 골라 순서를 고려하여 나열하는 경우의 수
 - 예시: A,B,C -> AB, AC, BA, BC, CA, CB
 
 - 증명:
 1. 첫 번째 자리에 n개 중 하나 선택
 2. 두 번째 자리에 (n - 1)개 중 하나 선택
 3. ...r개까지 반복
    ➡️ n * (n - 1) * ... * (n - r + 1) = n! / (n - r)!


## 중복 순열
- 정의: 서로 다른 n개 중에서 중복을 허용하여 r개를 순서 있게 뽑는 경우의 수
- 공식: n<sup>r</sup>
- 예시: 1,2,3 중에서 2개를 중복을 허용해서 뽑으면 
  ➡️ (1,1), (1,2) ... (3,3) = 9개
  
- 증명: 
	- 중복이 허용이므로 각 자리에 n개 다 가능
	- r자리 모두 n가지 선택 가능
	- n * n * .. * n = n<sup>r</sup>


| **유형**    | **중복 허용** | **순서 고려** | **공식**                                  |
| --------- | --------- | --------- | --------------------------------------- |
| 순열        | X         | O         | <sub>n</sub>P<sub>r</sub> = n!/(n - r)! |
| **중복 순열** | **O**     | O         | n<sup>r</sup>                           |
| 조합        | X         | X         | <sub>n</sub>C<sub>r</sub> = n!/r(n-r)!  |
| **중복 조합** | **O**     | X         | (n + r - 1)! / r!(n - 1)!               |

## 2. 예제 문제

1) 순열
```kotlin
class Permutation {  
    /**  
     * ✅ 문제: 서로 다른 정수 나열  
     *  
     * N개의 서로 다른 정수가 주어진다.  
     * 이 중에서 R개를 선택해 순서 있게 나열할 수 있는 경우의 수를 구하라.  
     * 결과는 1,000,000,007로 나눈 나머지를 출력한다.  
     *    
     * ⸻  
     *  
     * ⛳ 입력 형식  
     *  •  첫째 줄에 두 정수 N, R이 주어진다. (1 ≤ R ≤ N ≤ 1,000)  
     *    
     * ⸻  
     *  
     * ⛳ 출력 형식  
     *  •  가능한 순열의 수를 1,000,000,007로 나눈 나머지를 출력한다.  
     *    
     * ⸻  
     *  
     * 📘 예제 입력 1   
     *  5 2     
     * 📗 예제 출력 1     
     *  20     
     * */  


    @Test  
    fun solution(){  
  
        val n = 5  
        val r = 2  
        val expected = 20  
  
  
        assertEquals(expected, permutation(n, r))  
    }  
  
    private fun permutation(n: Int, r: Int): Int {  
        return (factory(n) / factory(n - r)) % 1_000_000_007  
    }  
  
    private fun factory(n: Int): Int {  
        if(n <= 1) return 1  
  
        return (2..n).reduce { acc, i -> acc * i }  
    }  
}

```

2) 중복 순열
```kotlin
class PermutationWithRepetition {  
    /**  
     *    
     *    
     * ✅ 문제: 중복 가능한 정수 선택 나열  
     *  
     * N개의 서로 다른 정수가 주어진다.  
     * 이 중에서 중복을 허용하여 R개를 골라 순서 있게 나열하는 모든 경우의 수를 구하라.  
     * 결과는 1,000,000,007로 나눈 나머지를 출력한다.  
     *     
     * ⸻  
     *  
     * ⛳ 입력 형식  
     *  •  첫째 줄에 두 정수 N, R이 주어진다. (1 ≤ N ≤ 1,000, 1 ≤ R ≤ 1,000)  
     *   
     * ⸻  
     *  
     * ⛳ 출력 형식  
     *  •  가능한 모든 나열의 수를 1,000,000,007로 나눈 나머지를 출력한다.  
     *  
     * ⸻  
     *  
     * 📘 예제 입력 1     
     * 3 2   
     * 📗 예제 출력 1    
     * 9  
     */  
  
    @Test  
    fun solution() {  
        val n = 3  
        val r = 2  
        val expected = 9  
  
        assertEquals(expected, permutationWithRepetition(n, r))  
    }  
  
    private fun permutationWithRepetition(n: Int, r: Int): Int {  
        return n.toDouble().pow(r).toInt()  
    }  
  
}
```