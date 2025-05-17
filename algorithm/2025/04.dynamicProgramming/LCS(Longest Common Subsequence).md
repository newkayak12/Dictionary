# 최장 공통 부분 수열
- 두 수열이 주어졌을 때, 두 수열 모두의 부분 수열이 되는 수열 중 가장 긴 것의 길이를 구하는 문제
- 부분 수열은 연속일 필요는 없고, 순서만 유지되면 된다.
> - 예시
> 1. 문자열 A = "ACAYKP"
> 2. 문자열 B = "CAPCAK"
> - 정답 = "ACK"

- 공통되는 '순서 유지' 가능한 부분을 선택
- '부분 문자열'이 아니라 '부분 수열'
- DP로 전체 탐색 없이 최적 부분만 저장해가면서 계산

|   용어   |          의미          |        예시         |
| :----: | :------------------: | :---------------: |
|   수열   |      순서가 있는 나열       |                   |
| 부분 수열  | 순서를 유지하지만 연속될 필요는 없음 | "ABCDEF" -> "ACE" |
| 부분 문자열 |      연속된 부분만 허용      | "ABCDEF" -> "BCD" |
- 예시 1) 기초 LCS
```kotlin
class BasicLcs {  
    /**  
     * ✅ 2단계: 기초 예시  
     * 문제:  
     * 문자열 A = "ACAYKP"    
     * 문자열 B = "CAPCAK" 가 주어졌을 때,  
     * 두 문자열의 최장 공통 부분 수열(LCS)의 길이를 구하시오.  
     * ⸻  
     * 📌 핵심 조건  
     *  •  연속일 필요 없음 (부분 문자열 아님)  
     *  •  순서는 유지해야 함 (예: A에서 나온 문자의 순서와, B에서 나온 문자의 순서가 같아야 함)  
     *     
     *     
     * - i : A의 인덱스 (1부터 시작, 0은 공집합)  
     * - j : B의 인덱스 (1부터 시작, 0은 공집합)  
     * - dp[i][j] : A[0..i-1]와 B[0..j-1]까지의 최장 공통 부분 수열의 길이  
     * - 테이블 크기 : (A.length + 1) x (B.length + 1)     
     *     
     * - 수열  
     *     -  A  C  A  Y  K  P  
     *  -  0  0  0  0  0  0  0     
     *  C  0  0  1  1  1  1  1     
     *  A  0  1  1  2  2  2  2     
     *  P  0  1  1  2  2  2  3     
     *  C  0  1  2  2  2  2  3     
     *  A  0  1  2  3  3  3  3     
     *  K  0  1  2  3  3  4  4    
     *     
     *  - 일치 여부  
     *      -  A  C  A  Y  K  P  
     *   -  X  X  X  X  X  X  X    
     *   C  X  X  O  X  X  X  X     
     *   A  X  O  X  O  X  X  X     
     *   P  X  x  X  X  X  X  O    
     *   C  X  X  O  X  X  X  X   
     *   A  X  O  X  O  X  X  X    
     *   K  X  X  X  X  X  O  X     
     *    
     *   - 일치할 때 dp[i][j] = dp[i-1][j - 1] + 1이라고 하자  
     *   - 아니면 dp[i][j] = dp[i][j - 1]    
     *     - 그러나 [4][6]에서 ACAYKP - CAP로 3개 일치한 상태에서 CAPC로 넘어갔을 때 위의 기준이 일치하지 않음  
     *     - dp[i][j] = dp[i-1][j] 도 고려 대상이다.  
     *     - 둘 중 큰 값을 수록하는 것으로 보인다.  
     *    
     *  pseudo   
     *    
     *  val array = [B.length + 1][A.length + 1]    
     *  for( i in 1 .. B.length)     
     *      for(j in 1..A.length)    
     *          array[i][j] =    
     *            if(A[j-1] == B[i-1]]) array[i - 1][j - 1] + 1    
     *            else maxOf(array[i-1][j], array[i][j-1])  
     */  
  
    @Test  
    fun solution() {  
        val A = "ACAYKP"  
        val B = "CAPCAK"  
        val expected = 4  
  
        assertEquals(expected, lcs(A,B))  
    }  
  
    private fun lcs(A: String, B: String): Int {  
        val table = Array(B.length + 1){IntArray(A.length+1)}  
  
        for( i in 1 .. B.length){  
            for(j in 1 .. A.length) {  
                table[i][j] =  
                    if(B[i-1]==A[j-1]) table[i-1][j-1] + 1  
                    else maxOf(table[i-1][j], table[i][j-1])  
            }        }  
  
  
        return table[B.length][A.length]  
    }  
  
}
```

### 🔁 공통 부분 문자열 (Longest Common Substring)
> 두 문자열에서 **연속된** 부분 문자열 중 가장 긴 것을 찾는다.

#### **특징 요약:**

- 공통 부분 “수열”이 아닌 “문자열”
- 불일치 시 이전 기록은 무효화됨
- 연속성 = 끊기면 리셋

> 1. `dp[i][j]`: B의 i, A의 j까지 연속해서 일치한 문자의 수
> 2. 문자가 같으면 `dp[i][j] = dp[i-1][j-1] + 1`
> 3. 문자가 다르면 `dp[i][j] = 0`
> 4. 결과는 테이블에서 최대 값을 찾는다.