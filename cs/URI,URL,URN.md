# URI, URL, URN


> https://example.com/test/testPage.html#posts

## URI(Uniform Resources identifier)
- 통합 자원 식별자
- 정보 리소스를 고유하게 식별하고 위치를 지정
- URL, URN 하위 개념으로 존재
- URI 자체는 신원 확인만 제공  -> URI가 존재한다고 해당 자원에 접근이 보장되는 것은 아니다.

> https://example.com/test/testPage.html#posts

## URL(Uniform Resources Locator)
- 통합 자원 지시자
- URI의 하위 개념
- 정보를 어떻게 접근할지 알려줌 -> HTTPs, FTP와 같은 프로토콜이 포함됨
- 도메인에 프로토콜이 있다면 URL이자 URI

> https://example.com/test/testPage.html

## URN(Uniform Resource Name)
- 통합 자원 이름
- `urn:` 으로 시작
- 독립적인 자원 지시자 -> 리소스의 위치에 영향 받지 않은 유일한 이름
- 리소스를 옮겨도 문제 없이 동작
- 여러 종류의 네트워크 접속 프로토콜로 접근해도 문제 없다.

