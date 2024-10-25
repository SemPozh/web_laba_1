import com.fastcgi.FCGIInterface;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class HTTPHandler {
    private static final String serverHost = "/calculate";
    private static final String HTTPMethod = "POST";
    private static final String HTTP_RESPONSE = """
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """;
    private static final String RESULT_JSON = """
            {
                "time": "%s",
                "result": %b
            }
            """;

    private static final String HTTP_ERROR = """
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """;
    private static final String ERROR_JSON = """
            {
                "reason": "%s"
            }
            """;

    public String readRequestString() throws IOException {
        FCGIInterface.request.inStream.fill();
        var contentLength = FCGIInterface.request.inStream.available();
        var buffer = ByteBuffer.allocate(contentLength);
        var readBytes = FCGIInterface.request.inStream.read(buffer.array(), 0,
                contentLength);
        var requestBodyRaw = new byte[readBytes];
        buffer.get(requestBodyRaw);
        buffer.clear();

        // request - json string {"x": int, "y":double, "r": int}
        return new String(requestBodyRaw, StandardCharsets.UTF_8);
    }

    public boolean checkRequestUri(String requestURI){
        return requestURI.equals(serverHost);
    }

    public boolean checkRequestMethod(String requestMethod){
        return requestMethod.equals(HTTPMethod);
    }

    public HashMap<String, Number> checkRequest() throws IncorrectRequestException{
        String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
        String requestURI = FCGIInterface.request.params.getProperty("REQUEST_URI");

        if (!checkRequestUri(requestURI)){
             throw new IncorrectRequestException("Incorrect request URI!");
        }

        if (!checkRequestMethod(method)){
            throw new IncorrectRequestException("Incorrect request method!");
        }

        try {
            return Validator.validateRequestJsonParams(readRequestString());
        } catch (ValidationException | IOException e) {
            throw new IncorrectRequestException(e.getMessage());
        }
    }
    public void sendSuccessResponse(long time, boolean result){
        var json = String.format(RESULT_JSON, time, result);
        var response = String.format(HTTP_RESPONSE, json.getBytes(StandardCharsets.UTF_8).length + 2, json);
        System.out.println(response);
    }

    public void sendFailResponse(String msg){
        var json = String.format(ERROR_JSON, msg);
        var response = String.format(HTTP_ERROR, json.getBytes(StandardCharsets.UTF_8).length + 2, json);
        System.out.println(response);
    }
}