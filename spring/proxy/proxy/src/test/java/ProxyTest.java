import org.junit.jupiter.api.Test;

import java.lang.reflect.Proxy;

public class ProxyTest {
    @Test
    public void test() {
        Object proxy = Proxy.newProxyInstance(ClassLoader.getSystemClassLoader(), Target.class, null );
    }
}
