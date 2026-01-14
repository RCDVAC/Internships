package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.ApplicationStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplicationStatusHistoryDTO {

    public String id;
    public String applicationId;
    public ApplicationStatus previousStatus;
    public ApplicationStatus newStatus;
    public String changedByUserId;
    public String notes;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateChanged;

}
