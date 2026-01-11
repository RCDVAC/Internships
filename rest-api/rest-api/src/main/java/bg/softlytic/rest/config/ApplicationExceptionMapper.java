package bg.softlytic.rest.config;

import bg.softlytic.exception.ApplicationException;
import bg.softlytic.exception.JobOfferNotFoundException;
import bg.softlytic.exception.OrganizationNotFoundException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Provider
public class ApplicationExceptionMapper implements ExceptionMapper<ApplicationException> {

    @Override
    public Response toResponse(ApplicationException exception) {
        log.error("Application exception occurred: {}", exception.getMessage(), exception);

        Response.Status status = determineStatus(exception);

        return Response.status(status)
                .entity(new ErrorResponse(status.getStatusCode(), exception.getMessage()))
                .build();
    }

    private Response.Status determineStatus(ApplicationException exception) {
        if (exception instanceof JobOfferNotFoundException ||
            exception instanceof OrganizationNotFoundException) {
            return Response.Status.NOT_FOUND;
        }
        return Response.Status.INTERNAL_SERVER_ERROR;
    }

    public record ErrorResponse(int statusCode, String message) {}

}
