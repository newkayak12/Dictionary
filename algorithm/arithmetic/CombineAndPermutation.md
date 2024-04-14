# Combine

서로 다른 `n`개의 물건에서 순서를 생각하지 않고 `r`개를 택할 때, 이것은 `n`개에서  `r`개를 택하는 조합이라고 하고 이 조합의 수를 기호로 
<sub>n</sub>C<sub>r</sub>이라고 한다.

ex)
Input: [1, 2, 3, 4]
Output: [ [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4] ]

즉, [1, 2, 3], [2, 3, 1] 순서는 상관이 없다는 것을 의미한다. 
배열의 처음 원소를 고정시키고 나머지 조합을 구하는 방식이다. 나머지에 대한 작업을 수행할 떄는 조합을 구하는 코드에 대해서는
한 번만 작성하고, 들어가는 인자를 바꾸기만 하면 되는 재귀함수를 사용하면 된다.

```java
class Combine {
    public static void main(String[] args) {
        System.out.println(combine(Arrays.asList(1,4,6,7,9), 3));
    }

    static List<String> combine( List<Integer> list, int count ) {
        List<String> result = new ArrayList<>();
        if( count == 1 ) return list.stream().map(String::valueOf).collect(Collectors.toList());
        for (AtomicInteger i = new AtomicInteger(0); i.get() < list.size(); i.getAndIncrement() ) {
            List<String> combinations = combine(
                    new ArrayList<>(list.subList(i.get() + 1, list.size())),
                    count - 1
            ).stream()
                    .map(v -> list.get(i.get())+v)
                    .collect(Collectors.toList());

            result.addAll(combinations);
        }

        return result;
    }

}
```

# Permutation
서로 다른 `n`개의 물건 중에서 `r`개를 택하여 한 줄로 배열하는 것을 `n`개의 물건에서 `r`개 택하는 순열이라 하고, 
이 순열의 수를 기호로 <sub>n</sub>P<sub>r</sub>로 나타낸다.

조합은 순서에 상관이 없다면, 순열은 순서가 중요하다.
Input: [1, 2, 3, 4]
Output: [
    [ 1, 2, 3 ], [ 1, 2, 4 ],[ 1, 3, 2 ], [ 1, 3, 4 ],[ 1, 4, 2 ], [ 1, 4, 3 ],
    [ 2, 1, 3 ], [ 2, 1, 4 ],[ 2, 3, 1 ], [ 2, 3, 4 ],[ 2, 4, 1 ], [ 2, 4, 3 ],
    [ 3, 1, 2 ], [ 3, 1, 4 ],[ 3, 2, 1 ], [ 3, 2, 4 ],[ 3, 4, 1 ], [ 3, 4, 2 ],
    [ 4, 1, 2 ], [ 4, 1, 3 ],[ 4, 2, 1 ], [ 4, 2, 3 ],[ 4, 3, 1 ], [ 4, 3, 2 ]
]



```java

public class Permutation {
    
    public static void main(String[] args) {
        //@Deprecated
//        System.out.println(permutations(Arrays.asList(1,4,6,7,9), 3));

        System.out.println(permutationRecursively("114", "", 0, new boolean[3]));
    }

    private Set<Long> permutationRecursively( String numbers, String prev, int depth, boolean[] visit) {


        Set<Long> result = new HashSet<>();
        if( numbers.length() < depth ) return result;

        String[] arr = numbers.split("");
        for( int i = 0; i < arr.length; i ++ ) {
            if(!visit[i]) {
                visit[i] = true;
                result.add(Long.parseLong(prev+arr[i]));
                result.addAll(permutationRecursively(numbers, prev+arr[i], depth + 1, visit));
                visit[i] = false;
            }
        }

        return result;
    }
    
    
    @Deprecated
    static List<List<Integer>> permutations( List<Integer> list, int count ) {
        List<List<Integer>> result = new ArrayList<>();
        if( count == 1 ) {
            return  list.stream()
                    .map(elem -> new ArrayList<>(List.of(elem)))
                    .collect(Collectors.toList());
        }

        for(AtomicInteger i = new AtomicInteger(0); i.get() < list.size(); i.getAndIncrement()) {
            List<Integer> subList = new ArrayList<>();
            subList.addAll(list.subList(0, i.get()));
            subList.addAll(list.subList(i.get() + 1, list.size()));
            List<List<Integer>> permutations = permutations(subList, count - 1);

            permutations.stream().forEach(l -> {
                l.add(list.get(i.get()));
                result.add(l);
            });
        }

        return result;
    }
}
```