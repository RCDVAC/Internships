package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.ApplicationStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Schema(description = "Application status change history record")
public class ApplicationStatusHistoryDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440110")
    public String id;

    @Schema(description = "ID of the job application", example = "550e8400-e29b-41d4-a716-446655440020")
    public String applicationId;

    @Schema(description = "Previous application status", example = "APPLIED")
    public ApplicationStatus previousStatus;

    @Schema(description = "New application status", example = "SCREENING")
    public ApplicationStatus newStatus;

    @Schema(description = "ID of user who made the change", example = "550e8400-e29b-41d4-a716-446655440011")
    public String changedByUserId;

    @Schema(description = "Notes about the status change", example = "Moved to screening after initial review")
    public String notes;

    @Schema(description = "Date when status was changed", example = "18-01-2026@11-30-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateChanged;

}
