package mm.shop.handlers;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class PageNotFoundHandler {

    @ExceptionHandler(NoHandlerFoundException.class)
    public String error() {
        return "404";
    }
}
