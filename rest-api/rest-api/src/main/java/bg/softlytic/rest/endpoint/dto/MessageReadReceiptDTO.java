package bg.softlytic.rest.endpoint.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Schema(description = "Message read receipt")
public class MessageReadReceiptDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440100")
    public String id;

    @Schema(description = "ID of the read message", example = "550e8400-e29b-41d4-a716-446655440080")
    public String messageId;

    @Schema(description = "ID of the user who read the message", example = "550e8400-e29b-41d4-a716-446655440010")
    public String userId;

    @Schema(description = "Date when the message was read", example = "20-01-2026@15-00-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateRead;

}
