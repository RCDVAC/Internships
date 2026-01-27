package bg.softlytic.rest.testutil;

import java.util.UUID;

/**
 * Constants for test data - UUIDs, API paths, and other test values.
 */
public final class TestConstants {

    private TestConstants() {
        // Utility class
    }

    // ==================== Organization IDs ====================
    public static final UUID ORG_ID_ACTIVE = UUID.fromString("550e8400-e29b-41d4-a716-446655440001");
    public static final UUID ORG_ID_INACTIVE = UUID.fromString("550e8400-e29b-41d4-a716-446655440002");
    public static final UUID ORG_ID_NON_EXISTENT = UUID.fromString("550e8400-e29b-41d4-a716-000000000000");

    // ==================== Job Offer IDs ====================
    public static final UUID JOB_ID_INTERNSHIP = UUID.fromString("660e8400-e29b-41d4-a716-446655440001");
    public static final UUID JOB_ID_FULL_TIME = UUID.fromString("660e8400-e29b-41d4-a716-446655440002");
    public static final UUID JOB_ID_NON_EXISTENT = UUID.fromString("660e8400-e29b-41d4-a716-000000000000");

    // ==================== Filter Option IDs ====================
    public static final UUID FILTER_ID_JOB_TYPE = UUID.fromString("770e8400-e29b-41d4-a716-446655440001");

    // ==================== API Paths ====================
    public static final String API_JOB_OFFERS = "/api/job-offers";
    public static final String API_ORGANIZATIONS = "/api/organizations";
    public static final String API_FILTERS = "/api/filters";

    // ==================== Test Values ====================
    public static final String TEST_ORG_NAME = "Test Tech Company";
    public static final String TEST_ORG_EIK = "123456789";
    public static final String TEST_JOB_DESCRIPTION = "Junior Developer Internship";
}
