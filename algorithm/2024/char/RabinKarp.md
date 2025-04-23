# Rabin-Karp

문자열 매칭 알고리즘이다. 항상 빠르지는 않지만 일반적인 경우 빠르게 작동하는 구조의 문자열 매칭 알고리즘이다.
Rabin-Karp는 해시 기법을 사용한다. 해시는 일반적으로 긴 데이터를 해시 테이블을 통해서 짧은 데이터로 바꿔주는 기법이다.
해싱을 이용해서 연산 속도가 상수가 된다는 장점이 생긴다.


ex) abacaaba의 해시 값
24833 =
  ('a' * 2 ^ 7) +
  ('b' * 2 ^ 6) +
  ('a' * 2 ^ 5) +
  ('c' * 2 ^ 4) +
  ('a' * 2 ^ 3) +
  ('a' * 2 ^ 2) +
  ('b' * 2 ^ 1) +
  ('a' * 2 ^ 0)

이렇게 하면 문자열이 달라지면 결과 값도 달라지는 것을 확인할 수 있다. 물론 아주 가끔 해시 값이 중복될 수도 있다. 이 경우를 `collision`이라고 하는데, 보통
발생률이 무시할 정도이기 떄문에 넘어간다. 

ababacabacaabacaaba에서 abacaaba가 몇 번 째에 있는지 찾는다고 해보자

|  a  |  b  |  a  |  b  |  a  |  c  |  a  |  b  |    a|    c|    a|    a|    b|    a|    c|    a|    a|  b  |  a  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  a  |  b  |  a  |  c  |  a  |  a  |  b  |  a  |     |     |     |     |     |     |     |     |     |     |     |

찾고자하는 문자열의 길이 만큼 추출하여 해싱을 해서 비교한다. 이 과정을 찾고자하는 문자열이 확보된 상태에서 대상 문자열이 끝나기 전까지 반복한다.

|  a  |  b  |  a  |  b  |  a  |  c  |  a  |  b  |  a  |  c  |  a  |  a  |  b  |  a  |  c  |    a|    a|  b  |  a  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|     |    |    |    |    |    |   |   a |  b  |  a  |  c  |  a  |  a  |  b  |  a  |     |     |     |     |

위의 경우와 같이 대상 문자열을 순회하는 방식으로 계속 나아가면 O(n)의 시간 복잡도를 보여준다.
일 차로 계산할 수 있는 이유는 일련의 과정이 연결된 수학적 수식에 의해서 반복되기 때문이다.

` target = 2 * (target - first Char) + new Char`

```java
class RabinKarp {
    public static void main(String[] args) {
        String target = "ababacabacaabacaaba";
        String pattern = "abacaaba";
        System.out.println(findString(target, pattern));
    }
    public static int findString( String target, String pattern ) {
        int targetSize = target.length();
        int patternSize = pattern.length();
        
        int targetHash = 0;
        int patternHash = 0; 
        int salt = 1;
        
        for ( int i = 0; i <= targetSize - patternSize; i ++ ) {
            if ( i == 0 ) {
                for ( int j = 0; j < patternSize; j ++ ) {
                    targetHash = targetHash + target[targetSize - 1 - j] * salt;
                    patternHash = patternHash+ pattern[patternSize - 1 - j] * salt;
                    
                    if ( j < patternSize - 1) salt = salt * 2;
                }
                //맨 처음에 해시 만들기
            } else {
                targetHash = 2 * (targetHash - target[i - 1] * salt) + target[targetSize - 1 + i];
            }
            
            
            
            if (patternHash == targetHash) { //collision 체크
                Boolean found = Boolean.TRUE;
                
                for ( int j = 0; j < patternSize; j ++ ) {
                    if( target [i + j ] != pattern[j]) {
                        found = Boolean.FALSE;
                        break;
                    }
                }
              
                return i + 1;
            } else return -1;
        }
        
    }
}
```