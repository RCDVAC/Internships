package bg.softlytic.exception;

public class FilterStrategyNotFoundException extends ApplicationException {

  public FilterStrategyNotFoundException() {
    super();
  }

  public FilterStrategyNotFoundException(String message) {
    super(message);
  }

  public FilterStrategyNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public FilterStrategyNotFoundException(Throwable cause) {
    super(cause);
  }

  protected FilterStrategyNotFoundException(String message, Throwable cause,
                                 boolean enableSuppression,
                                 boolean writableStackTrace) {
    super(message, cause, enableSuppression, writableStackTrace);
  }

}
