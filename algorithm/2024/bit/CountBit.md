# 비트 개수 세기
1. AND 연산으로 찾아내기
```java
class CountBit {
    public static int countBits1(int n) {
        int count = 0;
        while (n > 0) {
            count += n & 1; //마지막 bit가 1이면 count함 (AND로 확인)
            n >>= 1; //마지막 bit를 삭제함
        }
        return count;
    }
}
```

2. Brian Kernighan
```java
class CountBit {
    public static int countBits1(int n) {
        int count = 0;
        while (number > 0) {
            number &= number - 1; // 1을 뺴고 AND를 하면 1이 있는 곳만 남음
            count++;
        }
        return count;
    }
}
/**
 * N = 23 (10111) 
 AND 22 (10110) —> 22 (10110)
 COUNT = 1

 N = 22 (10110)
 AND 21 (10101) —> 20 (10100)
 COUNT = 2

 N = 20 (10100)
 AND 19 (10011) —> 16 (10000)
 COUNT = 3

 N = 16 (10000)
 AND 15 (01111) —> 0 (00000)
 COUNT = 4
 */
```