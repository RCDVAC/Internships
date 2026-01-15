package bg.softlytic.rest.endpoint.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Schema(description = "Link between job application and document")
public class ApplicationDocumentDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440120")
    public String id;

    @Schema(description = "ID of the job application", example = "550e8400-e29b-41d4-a716-446655440020")
    public String applicationId;

    @Schema(description = "ID of the attached document", example = "550e8400-e29b-41d4-a716-446655440030")
    public String documentId;

    @Schema(description = "Date when document was attached", example = "15-01-2026@10-30-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateAttached;

}
