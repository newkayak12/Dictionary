import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class TargetHandler implements InvocationHandler {
    private TargetInterface target;

    public TargetHandler(TargetInterface target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("before");

        Object result = method.invoke(target, args);

        System.out.println("after");
        return result;
    }
}
