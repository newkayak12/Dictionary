# 좌표 거리 구하기
p1(x1, y1) -> p2(x2, y2) 간의 거리는
`D(p1, p2) = √((x1 - x2) ^ 2 + (y1 - y2) ^ 2)`
```java
class Distance {
    public Double calc(Point p1, Point p2) {

        return Math.sqrt( 
                Math.pow((p1.x1 - p2.x2)) +
                Math.pow((p1.y1 - p2.y2)) 
        );
    }
}
```
