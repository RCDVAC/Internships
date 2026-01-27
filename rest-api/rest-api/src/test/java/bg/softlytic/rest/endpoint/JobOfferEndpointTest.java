package bg.softlytic.rest.endpoint;

import bg.softlytic.model.enums.JobType;
import bg.softlytic.model.enums.WorkType;
import bg.softlytic.rest.endpoint.dto.JobOfferDTO;
import bg.softlytic.rest.testutil.TestDataBuilder;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static bg.softlytic.rest.testutil.TestConstants.*;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
@DisplayName("JobOfferEndpoint Integration Tests")
class JobOfferEndpointTest {

    // ==================== GET /api/job-offers/{id} ====================

    @Nested
    @DisplayName("GET /api/job-offers/{id}")
    class FindById {

        @Test
        @DisplayName("Should return job offer when exists")
        void shouldReturnJobOfferWhenExists() {
            given()
                .pathParam("jobOfferId", JOB_ID_INTERNSHIP)
            .when()
                .get(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("id", equalTo(JOB_ID_INTERNSHIP.toString()))
                .body("description", containsString("Junior Developer"))
                .body("workType", equalTo("MIXED"))
                .body("jobType", equalTo("PART_TIME"))
                .body("minSalary", equalTo(1500))
                .body("maxSalary", equalTo(2500))
                .body("organizationId", equalTo(ORG_ID_ACTIVE.toString()));
        }

        @Test
        @DisplayName("Should return 404 when job offer not found")
        void shouldReturn404WhenNotFound() {
            given()
                .pathParam("jobOfferId", JOB_ID_NON_EXISTENT)
            .when()
                .get(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(404);
        }

        @Test
        @DisplayName("Should return 404 for invalid UUID format")
        void shouldReturn404ForInvalidUuid() {
            // JAX-RS returns 404 when path params can't be parsed to the expected type
            given()
                .pathParam("jobOfferId", "invalid-uuid")
            .when()
                .get(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(404);
        }
    }

    // ==================== GET /api/job-offers ====================

    @Nested
    @DisplayName("GET /api/job-offers")
    class ListAll {

        @Test
        @DisplayName("Should return all job offers")
        void shouldReturnAllJobOffers() {
            given()
            .when()
                .get(API_JOB_OFFERS)
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("$", hasSize(greaterThanOrEqualTo(2)))
                .body("id", hasItem(JOB_ID_INTERNSHIP.toString()))
                .body("id", hasItem(JOB_ID_FULL_TIME.toString()));
        }

        @Test
        @DisplayName("Should return JSON content type")
        void shouldReturnJsonContentType() {
            given()
            .when()
                .get(API_JOB_OFFERS)
            .then()
                .contentType(ContentType.JSON);
        }
    }

    // ==================== POST /api/job-offers ====================

    @Nested
    @DisplayName("POST /api/job-offers")
    class Create {

        @Test
        @DisplayName("Should create job offer and return 201 with ID")
        void shouldCreateJobOfferSuccessfully() {
            JobOfferDTO dto = TestDataBuilder.createJobOfferDTO(ORG_ID_ACTIVE.toString());

            String createdId = given()
                .contentType(ContentType.JSON)
                .body(dto)
            .when()
                .post(API_JOB_OFFERS)
            .then()
                .statusCode(201)
                .extract()
                .asString();

            // Verify the created job offer exists
            String cleanId = createdId.replace("\"", "");
            given()
                .pathParam("jobOfferId", cleanId)
            .when()
                .get(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(200)
                .body("description", equalTo(dto.getDescription()))
                .body("workType", equalTo(dto.getWorkType().name()));
        }

        @Test
        @DisplayName("Should set default values when creating job offer")
        void shouldSetDefaultValues() {
            JobOfferDTO dto = TestDataBuilder.createJobOfferDTO(ORG_ID_ACTIVE.toString());

            String createdId = given()
                .contentType(ContentType.JSON)
                .body(dto)
            .when()
                .post(API_JOB_OFFERS)
            .then()
                .statusCode(201)
                .extract()
                .asString()
                .replace("\"", "");

            // Verify defaults are set
            given()
                .pathParam("jobOfferId", createdId)
            .when()
                .get(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(200)
                .body("isActive", equalTo(true))
                .body("visited", equalTo(0))
                .body("dateCreated", notNullValue());
        }
    }

    // ==================== PUT /api/job-offers/{id} ====================

    @Nested
    @DisplayName("PUT /api/job-offers/{id}")
    class Update {

        @Test
        @DisplayName("Should update job offer successfully")
        void shouldUpdateJobOfferSuccessfully() {
            // First create a job offer to update
            JobOfferDTO createDto = TestDataBuilder.createJobOfferDTO(ORG_ID_ACTIVE.toString());

            String createdId = given()
                .contentType(ContentType.JSON)
                .body(createDto)
            .when()
                .post(API_JOB_OFFERS)
            .then()
                .statusCode(201)
                .extract()
                .asString()
                .replace("\"", "");

            // Update the job offer
            JobOfferDTO updateDto = TestDataBuilder.createJobOfferDTOForUpdate(ORG_ID_ACTIVE.toString());

            given()
                .contentType(ContentType.JSON)
                .pathParam("jobOfferId", createdId)
                .body(updateDto)
            .when()
                .put(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(200)
                .body("description", equalTo(updateDto.getDescription()))
                .body("minSalary", equalTo(updateDto.getMinSalary()))
                .body("workType", equalTo(updateDto.getWorkType().name()));
        }

        @Test
        @DisplayName("Should return 404 when updating non-existent job offer")
        void shouldReturn404WhenUpdatingNonExistent() {
            JobOfferDTO dto = TestDataBuilder.createJobOfferDTO(ORG_ID_ACTIVE.toString());

            given()
                .contentType(ContentType.JSON)
                .pathParam("jobOfferId", JOB_ID_NON_EXISTENT)
                .body(dto)
            .when()
                .put(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(404);
        }
    }

    // ==================== DELETE /api/job-offers/{id} ====================

    @Nested
    @DisplayName("DELETE /api/job-offers/{id}")
    class Delete {

        @Test
        @DisplayName("Should delete job offer and return 204")
        void shouldDeleteJobOfferSuccessfully() {
            // First create a job offer to delete
            JobOfferDTO dto = TestDataBuilder.createJobOfferDTO(ORG_ID_ACTIVE.toString());

            String createdId = given()
                .contentType(ContentType.JSON)
                .body(dto)
            .when()
                .post(API_JOB_OFFERS)
            .then()
                .statusCode(201)
                .extract()
                .asString()
                .replace("\"", "");

            // Delete the job offer
            given()
                .pathParam("jobOfferId", createdId)
            .when()
                .delete(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(204);

            // Verify it's deleted
            given()
                .pathParam("jobOfferId", createdId)
            .when()
                .get(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(404);
        }

        @Test
        @DisplayName("Should return 404 when deleting non-existent job offer")
        void shouldReturn404WhenDeletingNonExistent() {
            given()
                .pathParam("jobOfferId", JOB_ID_NON_EXISTENT)
            .when()
                .delete(API_JOB_OFFERS + "/{jobOfferId}")
            .then()
                .statusCode(404);
        }
    }

    // ==================== GET /api/job-offers/filter ====================

    @Nested
    @DisplayName("GET /api/job-offers/filter")
    class Filter {

        @Test
        @DisplayName("Should filter job offers by job type")
        void shouldFilterByJobType() {
            given()
                .queryParam("type", "JOB_OFFER__JOB_TYPE")
                .queryParam("name", "JOB_OFFER__JOB_TYPE")
                .queryParam("value", "FULL_TIME")
            .when()
                .get(API_JOB_OFFERS + "/filter")
            .then()
                .statusCode(200)
                .body("$", hasSize(greaterThanOrEqualTo(1)))
                .body("jobType", everyItem(equalTo("FULL_TIME")));
        }

        @Test
        @DisplayName("Should filter job offers by work type")
        void shouldFilterByWorkType() {
            given()
                .queryParam("type", "JOB_OFFER__WORK_TYPE")
                .queryParam("name", "JOB_OFFER__WORK_TYPE")
                .queryParam("value", "REMOTE")
            .when()
                .get(API_JOB_OFFERS + "/filter")
            .then()
                .statusCode(200)
                .body("workType", everyItem(equalTo("REMOTE")));
        }

        @Test
        @DisplayName("Should return all when no filter parameters")
        void shouldReturnAllWhenNoFilterParams() {
            given()
            .when()
                .get(API_JOB_OFFERS + "/filter")
            .then()
                .statusCode(200)
                .body("$", hasSize(greaterThanOrEqualTo(0)));
        }
    }
}
