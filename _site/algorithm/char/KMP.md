# Knuth-Morris-Pratt

기본적으로 문자열 매칭이란 특정한 글이 있을 때 그 글 안에서 하나의 문자열을 찾는 알고리즘이다.
ABCDEF에서 DEF를 찾는다면

| 차시  | Status |  A  |  B  |  C  |  D  |  E  |  F  | 
|:---:|:------:|:---:|:---:|:---:|:---:|:---:|:---:|
|  1  |  PASS  |  D  |     |     |     |     |
|  2  |  PASS  |     |  D  |     |     |     |     |
|  3  |  PASS  |     |     |  D  |     |     |     |
|  4  | CHECK  |     |     |     |  D  |  E  |  F  |

```java
class Kmp {
    public static void main(String[] args) {
        String target = "Hello, World!";
        String pattern =  "llo W";

        System.out.println(getKmpResult(target, pattern));
    }
    
    public static int getKmpResult (String target, String pattern) {
        int targetSize = target.length();
        int patternSize = pattern.length();
        
        
        for ( int i = 0; i <= targetSize - patternSize; i ++ ) {
            Boolean found = Boolean.TRUE;
            
            
            for ( int j = 0; j < patternSize; j ++ ) {
                if( parent[i + j] != pattern[j] ) {
                    found = Boolean.FALSE;
                    break;
                }
            }


            if( found ) return i;
        }
        
        
        return -1;
    }
}

```
