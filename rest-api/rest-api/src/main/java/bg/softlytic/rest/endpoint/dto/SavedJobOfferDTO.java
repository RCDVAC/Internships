package bg.softlytic.rest.endpoint.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Schema(description = "Saved/bookmarked job offer")
public class SavedJobOfferDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440050")
    public String id;

    @Schema(description = "ID of the user who saved the job", example = "550e8400-e29b-41d4-a716-446655440010")
    public String userId;

    @Schema(description = "ID of the saved job offer", example = "550e8400-e29b-41d4-a716-446655440000")
    public String jobOfferId;

    @Schema(description = "Date when the job was saved", example = "15-01-2026@10-30-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateSaved;

    @Schema(description = "Personal notes about this saved job", example = "Apply after updating CV")
    public String notes;

}
