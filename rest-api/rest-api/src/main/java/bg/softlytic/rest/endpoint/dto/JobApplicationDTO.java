package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.ApplicationStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class JobApplicationDTO {

    public String id;
    public String userId;
    public String jobOfferId;
    public ApplicationStatus status;
    public String coverLetter;
    public String notes;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateApplied;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateModified;
    public Boolean isActive;

    public Set<String> documentIds;

}
