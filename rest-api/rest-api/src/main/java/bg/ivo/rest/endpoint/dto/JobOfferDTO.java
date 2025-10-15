package bg.ivo.rest.endpoint.dto;

import bg.ivo.model.enums.JobType;
import bg.ivo.model.enums.WorkType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JobOfferDTO {

    public String id;
    public String description;
    public Boolean isActive;
    public Integer minSalary;
    public Integer maxSalary;
    public WorkType workType;
    public JobType jobType;
    public String workHours;
    public Long visited;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateCreated;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateModified;

    public String organizationId;

}
