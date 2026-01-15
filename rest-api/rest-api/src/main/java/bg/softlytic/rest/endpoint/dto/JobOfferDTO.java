package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.JobType;
import bg.softlytic.model.enums.WorkType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Schema(description = "Job offer details")
public class JobOfferDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440000")
    public String id;

    @Schema(description = "Job description and requirements", example = "Junior Software Developer internship at our Sofia office. Great learning opportunity with mentorship program!")
    public String description;

    @Schema(description = "Whether the job offer is active", example = "true")
    public Boolean isActive;

    @Schema(description = "Minimum monthly salary in BGN", example = "1500")
    public Integer minSalary;

    @Schema(description = "Maximum monthly salary in BGN", example = "2500")
    public Integer maxSalary;

    @Schema(description = "Work type/location", example = "HYBRID")
    public WorkType workType;

    @Schema(description = "Type of job position", example = "INTERNSHIP")
    public JobType jobType;

    @Schema(description = "Weekly work hours", example = "40")
    public String workHours;

    @Schema(description = "Number of times the job offer has been viewed", example = "150")
    public Long visited;

    @Schema(description = "Date when the job offer was created", example = "15-01-2026@10-30-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateCreated;

    @Schema(description = "Date when the job offer was last modified", example = "20-01-2026@14-45-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateModified;

    @Schema(description = "ID of the organization posting this job", example = "550e8400-e29b-41d4-a716-446655440001")
    public String organizationId;

}
