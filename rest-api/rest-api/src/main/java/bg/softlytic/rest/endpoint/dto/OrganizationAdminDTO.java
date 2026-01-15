package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.OrganizationRole;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Schema(description = "Organization administrator assignment")
public class OrganizationAdminDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440040")
    public String id;

    @Schema(description = "ID of the organization", example = "550e8400-e29b-41d4-a716-446655440001")
    public String organizationId;

    @Schema(description = "ID of the admin user", example = "550e8400-e29b-41d4-a716-446655440010")
    public String userId;

    @Schema(description = "Admin role in the organization", example = "OWNER")
    public OrganizationRole role;

    @Schema(description = "ID of user who added this admin", example = "550e8400-e29b-41d4-a716-446655440011")
    public String addedByUserId;

    @Schema(description = "Date when admin was added", example = "10-01-2026@09-15-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateAdded;

    @Schema(description = "Whether this admin assignment is active", example = "true")
    public Boolean isActive;

}
