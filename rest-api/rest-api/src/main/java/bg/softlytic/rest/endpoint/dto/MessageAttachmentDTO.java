package bg.softlytic.rest.endpoint.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Schema(description = "Message file attachment")
public class MessageAttachmentDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440090")
    public String id;

    @Schema(description = "ID of the message this is attached to", example = "550e8400-e29b-41d4-a716-446655440080")
    public String messageId;

    @Schema(description = "File name", example = "interview_schedule.pdf")
    public String fileName;

    @Schema(description = "Storage path", example = "/attachments/messages/550e8400-e29b-41d4-a716-446655440080/interview_schedule.pdf")
    public String filePath;

    @Schema(description = "File size in bytes", example = "102400")
    public Long fileSize;

    @Schema(description = "MIME type", example = "application/pdf")
    public String mimeType;

    @Schema(description = "Upload date", example = "20-01-2026@14-45-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateUploaded;

}
