package bg.softlytic.exception;

public class JobOfferNotFoundException extends ApplicationException {

    public JobOfferNotFoundException() {
        super();
    }

    public JobOfferNotFoundException(String message) {
        super(message);
    }

    public JobOfferNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public JobOfferNotFoundException(Throwable cause) {
        super(cause);
    }

    protected JobOfferNotFoundException(String message, Throwable cause,
                                        boolean enableSuppression,
                                        boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
