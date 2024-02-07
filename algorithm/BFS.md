# 우선 너비 탐색 (BFS - Breadth First Search)

# 그래프
각 정점들이 어떠한 연관 관계를 갖고 있는지를 나타내는 자료구조다. 
 1. 네트워크 : 각 네트워크 장비를 정점(vertex, node)로 연결을 간선(edge)로 본다면 그래프로 표현이 가능하다.
 2. 경로 찾기 : 특정 위치 간 짧은, 긴 경로를 그래프를 통해서 찾을 수 있다. 
 3. 순서 확인 : 정점을 할 일로 보며 그에 대한 연결을 통해서 순서를 지정할 수 있다. (위상 정렬)
 4. 연결성 확인 : 전자 회로 내 특정 회로가 상호 연결되어 있는지 확인하는 경우 등에 사용한다.

# 비교 대상 - 트리 구조의 계층 순회
[그래프](Graph.md)도 [트리](Tree.md)와 비슷한 방식으로 동작하는데, 최초 시작 정점에서 가장 먼저 이어져 있는 정점을 모두 순회한 뒤, 각 순회된
정점부터 또 시작하여 가장 먼저 이어진 정점을 순회하는 방식을 반복한다.

트리와 큰 차이점은 그래프는 순환(Cycle)할 수 있다는 것, 그래서 순환 탐지(Cycle Detection)을 할 수 있도록 추가 기능을 구현해야 한다.
![](img/img.gif)
<cite>BFS 예시, 출처 : https://victorqi.gitbooks.io/swift-algorithm/content/breadth-first_search_bfs.html</cite>

위 그래프는 A 정점에서 시작하여 B, C를 우선 탐색하고 B,C가 인접하고 있는 정점을 순환하고 있다.
순서는 `A -> B -> C -> D -> E -> F -> G -> H`가 된다.

# BFS 사용 예시
[다익스트라(Dijkstra) 알고리즘](Dijkstra.md)으로 최단 경로를 찾을 떄고 활용되며, Flow Network의 Maximum Flow를 찾기 위한
`Ford-Fulkerson 알고리즘`에도 사용된다.
