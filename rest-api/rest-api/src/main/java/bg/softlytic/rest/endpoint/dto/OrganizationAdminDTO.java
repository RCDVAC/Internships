package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.OrganizationRole;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrganizationAdminDTO {

    public String id;
    public String organizationId;
    public String userId;
    public OrganizationRole role;
    public String addedByUserId;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateAdded;
    public Boolean isActive;

}
