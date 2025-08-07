[SpringDocument](https://docs.spring.io/spring-framework/reference/overview.html)
[참고 블로그](https://velog.io/@dev_hammy/series)


## Spring?
1. 단순 스프링프레임워크 뿐만 아니라 스프링프레임워크 위에 조재하는 여러 family-set을 의미한다.
2. 스프링은 여러 가지 모듈로 이뤄져 있고 근본은 `core` 이다. `core`에는 설정 모델, 의존성 주입 메커니즘을 포함하고 있다. 이는 스프링을 바탕으로 하고 있는 다른 프로젝트들의 근간이 된다.

## Spring, Jakarta EE
1. Spring은 Jakarta EE와 대척점에 있는 것이 아니다. 오히려 Jakarata EE Spec 중 일부를 엄선하여 통합한다.
	1. Servlet API([JSR 340](https://www.jcp.org/en/jsr/detail?id=340))
	2. Websocket API([JSR 356](https://www.jcp.org/en/jsr/detail?id=356))
	3. Concurrency Utility([JSR 236](https://www.jcp.org/en/jsr/detail?id=236))
	4. JSON Binding API([JSR 367](https://www.jcp.org/en/jsr/detail?id=367))
	5. Bean Validation([JSR 303](https://www.jcp.org/en/jsr/detail?id=303))
	6. JPA([JSR 338](https://www.jcp.org/en/jsr/detail?id=338))
	7. JMS([JSR 914](https://www.jcp.org/en/jsr/detail?id=914))
2. 추가로 Dependency Injection([JSR 330](https://www.jcp.org/en/jsr/detail?id=330)), Common Annotation([JSR 250](https://www.jcp.org/en/jsr/detail?id=250))도 지원한다.
3. Spring 6.0부터는 `jakarta`를 바탕으로 동작한다. 


