# JWT(JsonWebToken)

JWT는 JSON에 인증에 필요한 최소한의 정보를 담고 비밀 키로 서명한 토큰으로 공식적으로 `인증(Authentication)`, `권한 허가(Authorization)` 방식으로 사용된다.


## 일련의 과정

1. 로그인 요청이 오면 서버는 `비밀 키`를 사용해서 json 객체를 암호화한 JWT 토큰을 발급한다.

> 구조
> 
> Header: base64Encoding({"alg": "HS256", "typ":"JWT"})
> Payload: base64Encoding({
>               "iss":"" // 토큰 발급자
>               "sub":"" // 토큰 제목
>               "aud":"" // 토큰 대상자
>               "exp":"" // 토큰 만료 시간(expiration) - NumericDate 형식
>               "iat":"" // 토큰 발급 시간(issuedAt)
>               "nbf":"" // 토큰 활성 날짜(notBefore)
>               "jti":"" // JWT 토큰 식별자(중복 방지를 위해서 사용)
>          })
> Signature: HMACSHA256( base64Encoding(header)+"."+base64Encoding(payload), secretKey)
> 

2. 클라이언트는 JWT를 로컬에 저장한다.
3. API 호출 시 header에 담아 보낸다.
4. 서버는 헤더를 매 번 확인하여 사용자를 인증한다.

## 장점

1. 사용자 인증에 필요한 정보가 토큰에 담겨있다.
2. 쿠키를 사용하지 않아도 되므로 취약점이 사라진다.
3. header에 담아서 보낼 수 있다.
4. 토큰 만료 정보가 토큰에 담겨있다.
5. 가벼운 편이다.
6. 독립적이다.

## 단점

1. 토큰 자체에 정보를 담고 있으므로 민감한 정보가 담겨 있으면 문제가 될 수 있다.
2. 토큰 길이는 payload의 길이에 따라 늘어난다.
3. payload는 탈취하면 디코딩하기 쉽다.
4. 토큰을 임의로 발행 취소하는 것이 불가능하다.