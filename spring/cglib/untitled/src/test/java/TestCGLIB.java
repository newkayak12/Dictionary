import net.sf.cglib.proxy.Enhancer;
import org.junit.jupiter.api.Test;

public class TestCGLIB {

    @Test
    public void test () {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(Target.class);
        enhancer.setCallback(new TargetMethodInterceptor(new Target()));;
        Target target = (Target) enhancer.create();

        target.echo("CGLIB");
    }
}
