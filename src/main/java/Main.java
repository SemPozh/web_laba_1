import com.fastcgi.FCGIInterface;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class Main {
    private static final Logger logger = Logger.getLogger(Main.class.getName());
    static {
        try {
            // Setting up logging
            FileHandler fileHandler = new FileHandler("server.log", true);
            fileHandler.setFormatter(new SimpleFormatter());
            logger.addHandler(fileHandler);
            logger.setUseParentHandlers(false); // Отключаем вывод в консоль
        } catch (IOException e) {
            logger.info("ERROR: " + e);
        }
    }

    public static void main(String[] args) {
        var fcgiInterface = new FCGIInterface();
        HTTPHandler httpHandler = new HTTPHandler();
        while (fcgiInterface.FCGIaccept() >= 0) {
            var scriptStartTime = Instant.now();
            try {
                HashMap<String, Number> params = httpHandler.checkRequest();
                boolean result = checkPoint(params.get("x").intValue(), params.get("y").doubleValue(), params.get("r").intValue());
                var scriptEndTime = Instant.now();
                httpHandler.sendSuccessResponse(ChronoUnit.NANOS.between(scriptStartTime, scriptEndTime), result);
            } catch (IncorrectRequestException e) {
                httpHandler.sendFailResponse(e.getMessage());
            }
        }
    }

    public static boolean checkPoint(int x, double y, int r) {
        return ((y <= r) && (y >= 0) && (x >= -r) && (x <= 0)) || ((x >= 0) && (y >= 0) && (y <= (-0.5 * x + (double) r / 2))) || ((Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2)) && (x <= 0) && (y <= 0));
    }
}
