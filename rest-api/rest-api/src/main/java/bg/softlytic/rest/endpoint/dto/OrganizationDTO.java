package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.Sector;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDate;
import java.util.Set;

@Data
@Schema(description = "Organization details")
public class OrganizationDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440001")
    public String id;

    @Schema(description = "Organization name", example = "Tech Innovations Bulgaria")
    public String name;

    @Schema(description = "Bulgarian EIK (Unified Identification Code)", example = "123456789")
    public String eik;

    @Schema(description = "Full address", example = "Sofia, Bulgaria, 1000, Tech Park Blvd 15")
    public String address;

    @Schema(description = "Organization description", example = "Leading software development company specializing in fintech solutions")
    public String description;

    @Schema(description = "Business sector", example = "IT")
    public Sector sector;

    @Schema(description = "Year the organization was founded", example = "2015")
    public Short yearCreated;

    @Schema(description = "Date when the organization joined the platform", example = "10-01-2026")
    @JsonFormat(pattern = "dd-MM-yyyy")
    public LocalDate dateJoined;

    @Schema(description = "Whether the organization is active", example = "true")
    public Boolean isActive;

    @Schema(description = "IDs of job offers posted by this organization")
    public Set<String> jobsOfferIds;

}
