# LZW(Lempel-Ziv-Welch) 압축 알고리즘

LZW에 대해 살펴보기 전에 간단한 핵심 아이디어를 살펴보면 데이터 공간을 절약하기 위해 패턴을 만들어서 재사용한다.
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