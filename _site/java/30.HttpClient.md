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

## HttpRequest
1. The request URI
2. The request method ( GET, PUT, POST )
3. The request body ( if any )
4. A timeout
5. Request headers


```java
HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("http://openjdk.java.net/"))
      .timeout(Duration.ofMinutes(1))
      .header("Content-Type", "application/json")
      .POST(BodyPublishers.ofFile(Paths.get("file.json")))
      .build()
```

## HTTP/2
- Java HTTP Client는 HTTP / 1.1 및 HTTP / 2를 모두 지원하고 기본값은 http/2, 서버에서 http/2를 지원하지 않으면 자동으로 http / 1.1로 전환된다.
