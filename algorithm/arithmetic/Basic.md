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
>
> ex)16의 약수의 개수
> ```java
>  @Test
> public void test () {
>     int number = 16;
>     int count = 0;
>     for (int i = 1; i * i <= number; i++) {
>         if( i * i == number)    count += 1;
>         else if ( number % i == 0) count += 2;
>     }
> 
>     System.out.println(count);
> }
> ```
>  제곱이 목표하는 수가 되기 전까지의 약수는 모두 짝이 있다.  
>  그래서 딱 제곰으로 목표하는 수가 되기 전까지만 찾으면,
>  그리고 제곱으로 목표하는 수가 되는 수만 제외하면,
>  2쌍이고 제곱으로 목표하는 수만 한 개가 된다.
> 




# 최대 공약수 구하기

>  유클리드 호제법
> 
> 호제법이란 두 수가 서로 상대방의 수를 나눠서 결국 원하는 수를 얻는 알고리즘을 나타낸다.
> 
>  자연수 `a`,`b`에 대해서 `a`를 `b`로 나눈 나머지를 `r`이라 한다면 (a > b)
>`a`,`b`의 최대공약수`(c)`는  `b`,`r`의 최대공약수`(d)`와 같다.
> 
> ```
>  int a = 255;
>  int b = 120;
>  int r = 15; //a, b의 최대공약수
>  int r' = 15; //b, r의 최대공약수
> ```
> 
> 
 
![](../img/스크린샷 2024-02-24 20.10.28.png)

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
     else return gcd ( b, a % b );
 }
 
 
```

# 최소 공배수 구하기

두 자연수들의 배수들 중에서 공통된 가장 작은 수를 의미한다.
`최소공배수` = `두 자연수의 곱` / `최대 공약수`

ex) 144와 10의 공배수 => 720 (144 * 10 / 2)
```java
public int lcm ( int a, int b ) {
    return (a * b) / gcd(a, b);   
}
```


