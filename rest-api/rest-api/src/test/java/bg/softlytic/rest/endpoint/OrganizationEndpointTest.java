package bg.softlytic.rest.endpoint;

import bg.softlytic.model.enums.Sector;
import bg.softlytic.rest.endpoint.dto.OrganizationDTO;
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
@DisplayName("OrganizationEndpoint Integration Tests")
class OrganizationEndpointTest {

    // ==================== GET /api/organizations/{id} ====================

    @Nested
    @DisplayName("GET /api/organizations/{id}")
    class GetOrganizationById {

        @Test
        @DisplayName("Should return organization when exists")
        void shouldReturnOrganizationWhenExists() {
            given()
                .pathParam("organizationId", ORG_ID_ACTIVE)
            .when()
                .get(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("id", equalTo(ORG_ID_ACTIVE.toString()))
                .body("name", equalTo(TEST_ORG_NAME))
                .body("eik", equalTo(TEST_ORG_EIK))
                .body("sector", equalTo("IT"))
                .body("isActive", equalTo(true));
        }

        @Test
        @DisplayName("Should return organization with job offer IDs")
        void shouldReturnOrganizationWithJobOffers() {
            given()
                .pathParam("organizationId", ORG_ID_ACTIVE)
            .when()
                .get(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(200)
                .body("jobsOfferIds", notNullValue())
                .body("jobsOfferIds", hasSize(greaterThanOrEqualTo(1)));
        }

        @Test
        @DisplayName("Should return 404 when organization not found")
        void shouldReturn404WhenNotFound() {
            given()
                .pathParam("organizationId", ORG_ID_NON_EXISTENT)
            .when()
                .get(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(404);
        }

        @Test
        @DisplayName("Should return 404 for invalid UUID format")
        void shouldReturn404ForInvalidUuid() {
            // JAX-RS returns 404 when path params can't be parsed to the expected type
            given()
                .pathParam("organizationId", "invalid-uuid")
            .when()
                .get(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(404);
        }
    }

    // ==================== GET /api/organizations ====================

    @Nested
    @DisplayName("GET /api/organizations")
    class ListAllOrganizations {

        @Test
        @DisplayName("Should return all organizations")
        void shouldReturnAllOrganizations() {
            given()
            .when()
                .get(API_ORGANIZATIONS)
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("$", hasSize(greaterThanOrEqualTo(2)))
                .body("id", hasItem(ORG_ID_ACTIVE.toString()))
                .body("id", hasItem(ORG_ID_INACTIVE.toString()));
        }

        @Test
        @DisplayName("Should return organizations with job offer IDs")
        void shouldReturnOrganizationsWithJobOffers() {
            given()
            .when()
                .get(API_ORGANIZATIONS)
            .then()
                .statusCode(200)
                .body("[0].jobsOfferIds", notNullValue());
        }

        @Test
        @DisplayName("Should return both active and inactive organizations")
        void shouldReturnActiveAndInactiveOrganizations() {
            given()
            .when()
                .get(API_ORGANIZATIONS)
            .then()
                .statusCode(200)
                .body("find { it.id == '" + ORG_ID_ACTIVE + "' }.isActive", equalTo(true))
                .body("find { it.id == '" + ORG_ID_INACTIVE + "' }.isActive", equalTo(false));
        }
    }

    // ==================== POST /api/organizations ====================

    @Nested
    @DisplayName("POST /api/organizations")
    class CreateOrganization {

        @Test
        @DisplayName("Should create organization and return 201 with ID")
        void shouldCreateOrganizationSuccessfully() {
            OrganizationDTO dto = TestDataBuilder.createOrganizationDTO();

            String createdId = given()
                .contentType(ContentType.JSON)
                .body(dto)
            .when()
                .post(API_ORGANIZATIONS)
            .then()
                .statusCode(201)
                .extract()
                .asString();

            // Verify created organization
            String cleanId = createdId.replace("\"", "");
            given()
                .pathParam("organizationId", cleanId)
            .when()
                .get(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(200)
                .body("name", equalTo(dto.getName()))
                .body("eik", equalTo(dto.getEik()))
                .body("sector", equalTo(dto.getSector().name()));
        }

        @Test
        @DisplayName("Should set default values when creating organization")
        void shouldSetDefaultValues() {
            OrganizationDTO dto = new OrganizationDTO();
            dto.setName("Minimal Org");
            dto.setEik("111222333");

            String createdId = given()
                .contentType(ContentType.JSON)
                .body(dto)
            .when()
                .post(API_ORGANIZATIONS)
            .then()
                .statusCode(201)
                .extract()
                .asString()
                .replace("\"", "");

            // Verify defaults
            given()
                .pathParam("organizationId", createdId)
            .when()
                .get(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(200)
                .body("isActive", equalTo(true))
                .body("dateJoined", notNullValue());
        }
    }

    // ==================== PUT /api/organizations/{id} ====================

    @Nested
    @DisplayName("PUT /api/organizations/{id}")
    class UpdateOrganization {

        @Test
        @DisplayName("Should update organization successfully")
        void shouldUpdateOrganizationSuccessfully() {
            // Create org to update
            OrganizationDTO createDto = TestDataBuilder.createOrganizationDTO();
            createDto.setName("Org To Update");

            String createdId = given()
                .contentType(ContentType.JSON)
                .body(createDto)
            .when()
                .post(API_ORGANIZATIONS)
            .then()
                .statusCode(201)
                .extract()
                .asString()
                .replace("\"", "");

            // Update it
            OrganizationDTO updateDto = new OrganizationDTO();
            updateDto.setName("Updated Organization Name");
            updateDto.setDescription("Updated description");
            updateDto.setSector(Sector.IT);

            given()
                .contentType(ContentType.JSON)
                .pathParam("organizationId", createdId)
                .body(updateDto)
            .when()
                .put(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(200)
                .body("name", equalTo("Updated Organization Name"))
                .body("description", equalTo("Updated description"))
                .body("sector", equalTo("IT"));
        }

        @Test
        @DisplayName("Should return 404 when updating non-existent organization")
        void shouldReturn404WhenUpdatingNonExistent() {
            OrganizationDTO dto = TestDataBuilder.createOrganizationDTO();

            given()
                .contentType(ContentType.JSON)
                .pathParam("organizationId", ORG_ID_NON_EXISTENT)
                .body(dto)
            .when()
                .put(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(404);
        }
    }

    // ==================== DELETE /api/organizations/{id} ====================

    @Nested
    @DisplayName("DELETE /api/organizations/{id}")
    class DeleteOrganization {

        @Test
        @DisplayName("Should delete organization and return 204")
        void shouldDeleteOrganizationSuccessfully() {
            // Create org to delete (without job offers)
            OrganizationDTO dto = TestDataBuilder.createOrganizationDTO();
            dto.setName("Org To Delete");

            String createdId = given()
                .contentType(ContentType.JSON)
                .body(dto)
            .when()
                .post(API_ORGANIZATIONS)
            .then()
                .statusCode(201)
                .extract()
                .asString()
                .replace("\"", "");

            // Delete it
            given()
                .pathParam("organizationId", createdId)
            .when()
                .delete(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(204);

            // Verify deletion
            given()
                .pathParam("organizationId", createdId)
            .when()
                .get(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(404);
        }

        @Test
        @DisplayName("Should return 404 when deleting non-existent organization")
        void shouldReturn404WhenDeletingNonExistent() {
            given()
                .pathParam("organizationId", ORG_ID_NON_EXISTENT)
            .when()
                .delete(API_ORGANIZATIONS + "/{organizationId}")
            .then()
                .statusCode(404);
        }
    }
}
