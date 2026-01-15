package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.DocumentType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Schema(description = "User document details (CV, certificates, etc.)")
public class DocumentDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440030")
    public String id;

    @Schema(description = "ID of the document owner", example = "550e8400-e29b-41d4-a716-446655440010")
    public String userId;

    @Schema(description = "Stored file name", example = "cv_ivan_petrov_2026.pdf")
    public String fileName;

    @Schema(description = "Original uploaded file name", example = "My_CV.pdf")
    public String originalFileName;

    @Schema(description = "Storage path", example = "/documents/users/550e8400-e29b-41d4-a716-446655440010/cv_ivan_petrov_2026.pdf")
    public String filePath;

    @Schema(description = "File size in bytes", example = "524288")
    public Long fileSize;

    @Schema(description = "MIME type", example = "application/pdf")
    public String mimeType;

    @Schema(description = "Document category", example = "CV")
    public DocumentType documentType;

    @Schema(description = "Document description", example = "My latest CV with internship experience")
    public String description;

    @Schema(description = "Upload date", example = "10-01-2026@09-15-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateUploaded;

    @Schema(description = "Last modification date", example = "10-01-2026@09-15-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateModified;

    @Schema(description = "Whether the document is active", example = "true")
    public Boolean isActive;

    @Schema(description = "Whether this is the primary document of its type", example = "true")
    public Boolean isPrimary;

}
