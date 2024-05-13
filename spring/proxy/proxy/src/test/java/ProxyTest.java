import org.junit.jupiter.api.Test;

import java.lang.reflect.Proxy;

public class ProxyTest {

    @Test
    public void test() {
        TargetInterface tar = new Target();
        TargetHandler handler = new TargetHandler(tar);

        TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(
                TargetInterface.class.getClassLoader(),
                new Class[] {TargetInterface.class},
                handler
                );

        proxy.echo("HI");
    }
}
