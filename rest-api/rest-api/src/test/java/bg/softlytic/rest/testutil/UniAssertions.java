package bg.softlytic.rest.testutil;

import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.helpers.test.UniAssertSubscriber;

import java.time.Duration;
import java.util.function.Consumer;

/**
 * Utility class for testing Mutiny Uni types.
 */
public class UniAssertions {

    private static final Duration DEFAULT_TIMEOUT = Duration.ofSeconds(10);

    private UniAssertions() {
        // Utility class
    }

    /**
     * Await and return the item from a Uni.
     *
     * @param uni the Uni to await
     * @param <T> the type of the item
     * @return the item from the Uni
     */
    public static <T> T awaitItem(Uni<T> uni) {
        return uni.await().atMost(DEFAULT_TIMEOUT);
    }

    /**
     * Await and assert that a Uni completes with an item, then apply assertions.
     *
     * @param uni        the Uni to await
     * @param assertions the assertions to apply to the item
     * @param <T>        the type of the item
     * @return the item from the Uni
     */
    public static <T> T awaitAndAssert(Uni<T> uni, Consumer<T> assertions) {
        T result = awaitItem(uni);
        assertions.accept(result);
        return result;
    }

    /**
     * Assert that a Uni fails with a specific exception type.
     *
     * @param uni           the Uni to test
     * @param exceptionType the expected exception type
     * @param <T>           the type of the item
     */
    public static <T> void assertFailsWith(Uni<T> uni, Class<? extends Throwable> exceptionType) {
        UniAssertSubscriber<T> subscriber = uni
                .subscribe().withSubscriber(UniAssertSubscriber.create());

        subscriber.awaitFailure(DEFAULT_TIMEOUT)
                .assertFailedWith(exceptionType);
    }

    /**
     * Assert that a Uni fails with a specific exception type and message containing specific text.
     *
     * @param uni             the Uni to test
     * @param exceptionType   the expected exception type
     * @param messageContains text that should be contained in the exception message
     * @param <T>             the type of the item
     */
    public static <T> void assertFailsWithMessage(Uni<T> uni,
                                                   Class<? extends Throwable> exceptionType,
                                                   String messageContains) {
        UniAssertSubscriber<T> subscriber = uni
                .subscribe().withSubscriber(UniAssertSubscriber.create());

        subscriber.awaitFailure(DEFAULT_TIMEOUT)
                .assertFailedWith(exceptionType, messageContains);
    }

    /**
     * Assert that a Uni completes with a null item.
     *
     * @param uni the Uni to test
     * @param <T> the type of the item
     */
    public static <T> void assertCompletesWithNull(Uni<T> uni) {
        UniAssertSubscriber<T> subscriber = uni
                .subscribe().withSubscriber(UniAssertSubscriber.create());

        subscriber.awaitItem(DEFAULT_TIMEOUT)
                .assertItem(null);
    }

    /**
     * Assert that a Uni completes with void (for Uni<Void>).
     *
     * @param uni the Uni to test
     */
    public static void assertCompletesSuccessfully(Uni<Void> uni) {
        UniAssertSubscriber<Void> subscriber = uni
                .subscribe().withSubscriber(UniAssertSubscriber.create());

        subscriber.awaitItem(DEFAULT_TIMEOUT)
                .assertCompleted();
    }
}
