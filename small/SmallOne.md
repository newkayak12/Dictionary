System.out.println(1.1 + 0.1 == 1.2);

결과는? false

부동소수점 문제 때문에 그렇다. (특히 이 주변은 다 괜찮은데 얘만 그렇다.)

System.out.println(BigDecimal.valueOf(1.2).add(BigDecimal.valueOf(0.1)).equals(BigDecimal.valueOf(1.3)));

이러면 큰 상관은 없다.
