# 우선 너비 탐색 (BFS - Breadth First Search)

# 그래프
각 정점들이 어떠한 연관 관계를 갖고 있는지를 나타내는 자료구조다. 
 1. 네트워크 : 각 네트워크 장비를 정점(vertex, node)로 연결을 간선(edge)로 본다면 그래프로 표현이 가능하다.
 2. 경로 찾기 : 특정 위치 간 짧은, 긴 경로를 그래프를 통해서 찾을 수 있다. 
 3. 순서 확인 : 정점을 할 일로 보며 그에 대한 연결을 통해서 순서를 지정할 수 있다. (위상 정렬)
 4. 연결성 확인 : 전자 회로 내 특정 회로가 상호 연결되어 있는지 확인하는 경우 등에 사용한다.

# 비교 대상 - 트리 구조의 계층 순회
[그래프](../Graph.md)도 [트리](Tree.md)와 비슷한 방식으로 동작하는데, 최초 시작 정점에서 가장 먼저 이어져 있는 정점을 모두 순회한 뒤, 각 순회된
정점부터 또 시작하여 가장 먼저 이어진 정점을 순회하는 방식을 반복한다.

트리와 큰 차이점은 그래프는 순환(Cycle)할 수 있다는 것, 그래서 순환 탐지(Cycle Detection)을 할 수 있도록 추가 기능을 구현해야 한다.
![](../img/img.gif)
<cite>BFS 예시, 출처 : https://victorqi.gitbooks.io/swift-algorithm/content/breadth-first_search_bfs.html</cite>

위 그래프는 A 정점에서 시작하여 B, C를 우선 탐색하고 B,C가 인접하고 있는 정점을 순환하고 있다.
순서는 `A -> B -> C -> D -> E -> F -> G -> H`가 된다.

# BFS 사용 예시
[다익스트라(Dijkstra) 알고리즘](Dijkstra.md)으로 최단 경로를 찾을 떄고 활용되며, Flow Network의 Maximum Flow를 찾기 위한
`Ford-Fulkerson 알고리즘`에도 사용된다.



//https://school.programmers.co.kr/learn/courses/30/lessons/12913
<pre>
땅따먹기 게임을 하려고 합니다. 땅따먹기 게임의 땅(land)은 총 N행 4열로 이루어져 있고,
모든 칸에는 점수가 쓰여 있습니다.
1행부터 땅을 밟으며 한 행씩 내려올 때,
각 행의 4칸 중 한 칸만 밟으면서 내려와야 합니다.
단, 땅따먹기 게임에는 한 행씩 내려올 때,
같은 열을 연속해서 밟을 수 없는 특수 규칙이 있습니다.

예를 들면,
| 1 | 2 | 3 | 5 |
| 5 | 6 | 7 | 8 |
| 4 | 3 | 2 | 1 |

로 땅이 주어졌다면, 1행에서 네번째 칸 (5)를 밟았으면,
2행의 네번째 칸 (8)은 밟을 수 없습니다.
마지막 행까지 모두 내려왔을 때,
얻을 수 있는 점수의 최대값을 return하는 solution 함수를 완성해 주세요.
위 예의 경우,
1행의 네번째 칸 (5),
2행의 세번째 칸 (7),
3행의 첫번째 칸 (4) 땅을 밟아 16점이 최고점이 되므로 16을 return 하면 됩니다.

제한사항
- 행의 개수 N : 100,000 이하의 자연수
- 열의 개수는 4개이고, 땅(land)은 2차원 배열로 주어집니다.
- 점수 : 100 이하의 자연수
</pre>

```java
class Problem {
    //BFS
    public int solution(int[][] land) {

        for (int y = 1; y < land.length; y++) {
            int max = -1;
            for (int x = 0; x < land[0].length; x++) {
                if (x != 0) max = Math.max(land[y][x] + land[y - 1][0], max);
                if (x != 1) max = Math.max(land[y][x] + land[y - 1][1], max);
                if (x != 2) max = Math.max(land[y][x] + land[y - 1][2], max);
                if (x != 3) max = Math.max(land[y][x] + land[y - 1][3], max);

                land[y][x] = max;
                max = -1;
            }
//            System.out.println(Arrays.stream(land[y]).boxed().map(String::valueOf).collect(Collectors.joining(", ")));;
        }

        int max = -1;
        for (int x = 0; x < 4; x++) max = Math.max(land[land.length - 1][x], max);
        return max;
    }
}
```
