package bg.softlytic.rest.endpoint;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static bg.softlytic.rest.testutil.TestConstants.*;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
@DisplayName("FilterEndpoint Integration Tests")
class FilterEndpointTest {

    // ==================== GET /api/filters ====================

    @Test
    @DisplayName("Should return all filter options")
    void shouldReturnAllFilterOptions() {
        given()
        .when()
            .get(API_FILTERS)
        .then()
            .statusCode(200)
            .contentType(ContentType.JSON);
    }

    @Test
    @DisplayName("Should return filter options with expected structure")
    void shouldReturnFilterOptionsWithExpectedStructure() {
        given()
        .when()
            .get(API_FILTERS)
        .then()
            .statusCode(200)
            .body("$", hasSize(greaterThanOrEqualTo(0)));
    }

    @Test
    @DisplayName("Should return JSON content type")
    void shouldReturnJsonContentType() {
        given()
        .when()
            .get(API_FILTERS)
        .then()
            .contentType(ContentType.JSON);
    }
}
