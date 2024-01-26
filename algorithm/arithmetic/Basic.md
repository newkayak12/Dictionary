# 약수 개수를 구하기

## 1. 1부터 목표 숫자까지 나눠서 나머지 0이 되는 경우
```java
public int divsor ( int number ) {
    int count = 0;
    
    for ( int i = 1; i <= number; i ++ ) {
        if( number % i == 0 ) count++;
    }
    
    return count;
}
```

## 2. 확장 (패턴)
number의 약수가 x라면 다른 약수는 (number / x)이 된다. 이렇게 하나를 구하면 다른 하나를 확정할 수 있다.
```java
public int divsor ( int number ) {
    int count = 0;
    
    for ( int i = 1; i * i <= number; i ++ ) {
       if ( i * i == number ) count ++;
       else if ( number % i == 0) count += 2;
    }
    
    return count;
}
```


# 최대 공약수 구하기
  자연수 `a`,`b`에 대해서 `a`를 `b`로 나눈 나머지를 `r`이라 한다면
`a`,`b`의 최대공약수`(c)`와 `b`,`r`의 최대공약수`(d)`는 같다.

```java
//ex)
int a = 144;
int b = 10;
int r = a % b; (4)

int c = 2;
int d = 2;
```

  이 성질에 따라 `a`(144)를 `b`(10)로 나눈 나머지 `r`(4)을 구하고,
`b`(10)를 `r`(4)로 나눈 나머지 `r'`(2)을 구한다.
나머지가 0이 될 때 나눈 수가 `a`,`b`의 최대공약수가 된다. 
```java
/**
 *  ex) 60, 48 의 최대공약수 :
 *     60 % 48 = 12
 *     48 % 12 = 0 // 최대 공약수 : 12
 * 
 *  최소 공배수 : (60 ✕ 48) / 12 = 240
 */

 public int gcd ( int a, int b ) {
     if( a % b == 0 ) return b;
     else gcd ( b, a % b );
 }
 
 
```

# 최소 공배수 구하기
ex) 144와 10의 공배수 => 720 (144 * 10 / 2)
```java
public int lcm ( int a, int b ) {
    return (a * b) / gcd(a, b);   
}
```


