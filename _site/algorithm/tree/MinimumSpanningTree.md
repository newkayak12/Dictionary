# 최소 신장 트리

## SpanningTree
 그래프의 최소 연결 부분 그래프이다. 
 - 최소 연결 : 간선의 수가 가장 적다.
 - n개의 정점을 가지는 최소 그래프 간선의 수는 ( n - 1)이고 이렇게 연결되어 있으면 SpanningTree가 된다.
 - DFS, BFS를 이용해서 신장 트리를 찾을 수 있다. (탐색 도중에 사용된 간선만 모으면 된다.)
 - 하나의 그래프에는 많은 신장 트리가 존재할 수 있다.
 - SpanningTree는 트리의 특수한 형태이므로 모든 정점이 연결되어 있고, 사이클을 포함하면 안된다.

## 사용 사례
 - 통신 네트워크 구축
 - MST : 사용된 간선들의 가중치 합이 최소인 트리 
   - 간선의 가중치의 합이 최소여야만 한다.
   - n개의 정점을 가지는 그래프에 대해서 반드시 (n - 1)개의 간선만 사용해야 한다.
   - 사이클이 포함되면 안된다.

## 구현 방법
1. [Kruskal MST](Kruskal.md) : 탐욕범으로 네트워크의 모든 정점을 최소 비용으로 연결하는 최적 해답을 구하는 것
   - 

2. Prim MST