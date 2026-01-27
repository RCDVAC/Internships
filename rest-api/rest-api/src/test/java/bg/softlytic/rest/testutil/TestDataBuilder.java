package bg.softlytic.rest.testutil;

import bg.softlytic.model.entity.JobOffer;
import bg.softlytic.model.entity.Organization;
import bg.softlytic.model.enums.JobType;
import bg.softlytic.model.enums.Sector;
import bg.softlytic.model.enums.WorkType;
import bg.softlytic.rest.endpoint.dto.JobOfferDTO;
import bg.softlytic.rest.endpoint.dto.OrganizationDTO;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

/**
 * Factory methods for creating test entities and DTOs.
 */
public class TestDataBuilder {

    // ==================== ORGANIZATION BUILDERS ====================

    /**
     * Creates a test Organization entity with default values.
     */
    public static Organization createOrganization() {
        Organization org = new Organization();
        org.setId(UUID.randomUUID());
        org.setName("Test Organization");
        org.setEik("123456789");
        org.setAddress("Test Address, Sofia");
        org.setDescription("Test description");
        org.setSector(Sector.IT);
        org.setYearCreated((short) 2020);
        org.setIsActive(true);
        org.setDateJoined(Timestamp.from(Instant.now()));
        return org;
    }

    /**
     * Creates a test Organization entity with a specific ID.
     */
    public static Organization createOrganization(UUID id) {
        Organization org = createOrganization();
        org.setId(id);
        return org;
    }

    /**
     * Creates a test OrganizationDTO for creating a new organization.
     */
    public static OrganizationDTO createOrganizationDTO() {
        OrganizationDTO dto = new OrganizationDTO();
        dto.setName("New Test Organization");
        dto.setEik("999888777");
        dto.setAddress("New Address, Plovdiv");
        dto.setDescription("New organization description");
        dto.setSector(Sector.IT);
        dto.setYearCreated((short) 2023);
        return dto;
    }

    // ==================== JOB OFFER BUILDERS ====================

    /**
     * Creates a test JobOffer entity with default values.
     */
    public static JobOffer createJobOffer(Organization organization) {
        JobOffer job = new JobOffer();
        job.setId(UUID.randomUUID());
        job.setDescription("Test job offer description");
        job.setIsActive(true);
        job.setMinSalary(2000);
        job.setMaxSalary(4000);
        job.setWorkType(WorkType.MIXED);
        job.setJobType(JobType.FULL_TIME);
        job.setWorkHours("40");
        job.setVisited(0L);
        job.setDateCreated(Timestamp.from(Instant.now()));
        job.setDateModified(Timestamp.from(Instant.now()));
        job.setOrganization(organization);
        return job;
    }

    /**
     * Creates a test JobOffer entity with a specific ID.
     */
    public static JobOffer createJobOffer(UUID id, Organization organization) {
        JobOffer job = createJobOffer(organization);
        job.setId(id);
        return job;
    }

    /**
     * Creates a test JobOfferDTO for creating a new job offer.
     */
    public static JobOfferDTO createJobOfferDTO(String organizationId) {
        JobOfferDTO dto = new JobOfferDTO();
        dto.setDescription("New test job offer");
        dto.setMinSalary(1500);
        dto.setMaxSalary(3000);
        dto.setWorkType(WorkType.REMOTE);
        dto.setJobType(JobType.PART_TIME);
        dto.setWorkHours("20");
        dto.setOrganizationId(organizationId);
        return dto;
    }

    /**
     * Creates a test JobOfferDTO for updating an existing job offer.
     */
    public static JobOfferDTO createJobOfferDTOForUpdate(String organizationId) {
        JobOfferDTO dto = new JobOfferDTO();
        dto.setDescription("Updated job offer description");
        dto.setMinSalary(3000);
        dto.setMaxSalary(5000);
        dto.setWorkType(WorkType.OFFICE);
        dto.setJobType(JobType.FULL_TIME);
        dto.setWorkHours("40");
        dto.setOrganizationId(organizationId);
        return dto;
    }

    /**
     * Creates an invalid JobOfferDTO with missing required fields.
     */
    public static JobOfferDTO createInvalidJobOfferDTO() {
        JobOfferDTO dto = new JobOfferDTO();
        // Missing required fields
        dto.setDescription(null);
        return dto;
    }
}
