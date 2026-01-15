package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.ApplicationStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Schema(description = "Job application details")
public class JobApplicationDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440020")
    public String id;

    @Schema(description = "ID of the applicant user", example = "550e8400-e29b-41d4-a716-446655440010")
    public String userId;

    @Schema(description = "ID of the job offer applied to", example = "550e8400-e29b-41d4-a716-446655440000")
    public String jobOfferId;

    @Schema(description = "Current application status", example = "APPLIED")
    public ApplicationStatus status;

    @Schema(description = "Cover letter text", example = "I am excited to apply for this internship position...")
    public String coverLetter;

    @Schema(description = "Internal notes (visible to organization)", example = "Strong candidate, schedule interview")
    public String notes;

    @Schema(description = "Date when application was submitted", example = "15-01-2026@10-30-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateApplied;

    @Schema(description = "Date when application was last modified", example = "20-01-2026@14-45-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateModified;

    @Schema(description = "Whether the application is active", example = "true")
    public Boolean isActive;

    @Schema(description = "IDs of attached documents")
    public Set<String> documentIds;

}
