# LZW(Lempel-Ziv-Welch) 압축 알고리즘

LZW에 대해 살펴보기 전에 간단한 핵심 아이디어를 살펴보면 데이터 공간을 절약하기 위해 패턴을 만들어서 재사용한다.
자세히 살펴보면 일반적인 아이템은 짧은 인코딩, 빈도가 낮은 아이템은 긴 인코딩을 사용하는 것이다.
한 글자를 가지고 인코딩하는 것이 아닌, 인코딩하는 아이템 길이를 변경하는 것이 LZW의 핵심이다.


## 일련의 과정
LZW 압축은 일련의 입력 데이터를 스캔하면서 반복되는 패턴을 찾아낸다. 초기에는 사전에 ASCII 문자 집합과 대응하는 코드를 저장해놓고,
입력 데이터를 한 문자씩 읽어들인다. 이미 사전에 있으면 사전에 있는 것을 사용한다.(패턴으로 간주하여)

## n-gram
문자열을 표현하는데 두 개 문자로 구성된 문자열을 `bigram`이라고 한다.

## 예시
```java
class Lzw {
    public String compress(String input) {
        List<String> dictionary = new ArrayList();
        List<Integer> list = new ArrayList<>();
        String tmp = "";

        for( int i = 0; i < input.length(); i ++ ) {
            char now = input.charAt(i);
            char next = input.charAt(i + 1);

            if( !tmp.isEmpty() ) tmp.append(now);

            String str = now+""+next;
            int idx = dictionary.indexOf(ㄴtr);
            if( idx <= -1 ) {
                list.add(dictionary.indexOf(now) + 1 );
                dictionary.add(str);
                tmp = "";
            } else tmp = str;
        }
        
        
    }
}
```

```shell
## Compress
# PSEUDOCODE
#    Initialize table with single character strings
    P = first input character
    WHILE not end of input stream
         C = next input character
         IF P + C is in the string table
           P = P + C
         ELSE
          output the code for P
         add P + C to the string table
           P = C
    END WHILE
    output code for P 

## Decompress
# PSEUDOCODE
#    initialize the dictionary(create an initial dictionary mapping of ASCII char)
#    initialize the previous code
#    Create an empty string to store the decompressed data
    
    for code in compressed_data:
    	if code exists in the dictionary:
        	output the striing corresponding to the current code
            add the prev_code + the first char of the current_code
        else:
        	output the string corresponding to the prev_code + the first char of the prev_code
            add the prev_code + first char of the prev_code to the dict & generate a new code
            update the prev_code as the current_code
     
     return compressed_data
            
```