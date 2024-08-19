# HttpClient

JDK9부터 인큐베이팅 되던 것이 JAVA11 정식 추가

## 소개
HTTP/1.1, HTTP/2에서 동기, 비동기 모두 가능


```java
HttpClient client = HttpClinet.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
                                 .uri(URI.create("http://openjdk.java.net/"))
                                 .build();


client.send();
client.sendAsync();

```


## HttpClient

HttpClient를 빌더 패턴으로 생성한다. 설정 가능한 정보로는 
 
1. Protocol version( HTTP/1.1 or HTTP/2 )
2. Redirects
3. Proxy
4. An authenticator

```java
HttpClient client = HttpClient.newBuilder()
      .version(Version.HTTP_2)
      .followRedirects(Redirect.SAME_PROTOCOL)
      .proxy(ProxySelector.of(new InetSocketAddress("www-proxy.com", 8080)))
      .authenticator(Authenticator.getDefault())
      .build();
```

한 번 생성하면 재사용 할 수 있다.

