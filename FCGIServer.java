import com.fastcgi.FCGIInterface;
import com.sun.tools.javac.Main;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.Logger;

public class FCGIServer {

    private static final String HTTP_RESPONSE = """
            HTTP/1.1 200 OK
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """;
    private static final String RESULT_JSON = """
            {
                "time": "%s",
                "now": "%s",
                "result": %b
            }
            """;

    public static void main(String[] args) {
        var fcgiInterface = new FCGIInterface();
        while (fcgiInterface.FCGIaccept() >= 0) {
            String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
            if (method.equals("POST")){
                var scriptStartTime = Instant.now();
                int[] params;
                try {
                    params = readRequestData();
                } catch (IOException e) {
                    params = new int[] {-228, -228, -228};
                }
                boolean result = checkPoint(params[0], params[1], params[2]);
                var scriptEndTime = Instant.now();
                var json = String.format(RESULT_JSON, ChronoUnit.NANOS.between(scriptStartTime, scriptEndTime), LocalDateTime.now(), result);
                var response = String.format(HTTP_RESPONSE, json.getBytes(StandardCharsets.UTF_8).length + 2, json);
                System.out.println(response);
            }
        }
    }

    public static boolean checkPoint(int x, int y, int r){
        return ((y <= r) && (y >= 0) && (x >= -r) && (x <= 0)) || ((x >= 0) && (y >= 0) && (y <= (-0.5*x + (double) r / 2))) || ((Math.pow(x,2) + Math.pow(y,2) <= Math.pow(r,2)) && (x <= 0) && (y <= 0));
    }

    public static int[] readRequestData() throws IOException{
        FCGIInterface.request.inStream.fill();
        var contentLength = FCGIInterface.request.inStream.available();
        var buffer = ByteBuffer.allocate(contentLength);
        var readBytes = FCGIInterface.request.inStream.read(buffer.array(), 0,
                        contentLength);
        var requestBodyRaw = new byte[readBytes];
        buffer.get(requestBodyRaw);
        buffer.clear();

        var request = new String(requestBodyRaw, StandardCharsets.UTF_8);
        var elements = request.split("&");
        int[] values = new int[3];
        try {
            values[0] = Integer.parseInt((elements[0].split("=")[1]));
            values[1] = Integer.parseInt((elements[1].split("=")[1]));
            values[2] = Integer.parseInt(elements[2].split("=")[1]);
            return values;
        } catch (Exception e) {
            return new int[] {-228, -228, -228};
        }
    }
}