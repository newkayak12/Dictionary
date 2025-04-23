

```kotlin

class Linear {
   
    @Test
    fun `순차 검색`() {
        val list: List<Int> = giveMeArray()
        val find = 10
        val array: IntArray = list.shuffled().toIntArray()
        val size = array.size
        var index = 0



        while( index < size && array[index] != find ) {
            index ++;
        }

        val found = index != array.size
        assertEquals(found, array.contains(find))
    }

    @Test
    fun `보초법`() {
        val list: List<Int> = giveMeArray()
        val find = 10
        val mutableList = list.shuffled().toMutableList()
        mutableList.add(find)
        val array: IntArray = mutableList.toIntArray()

        var index = 0

        while (array[index] != find) {
            index++
        }

        val found = index != array.size - 1
        assertEquals(found, list.contains(find))
    }
}
```