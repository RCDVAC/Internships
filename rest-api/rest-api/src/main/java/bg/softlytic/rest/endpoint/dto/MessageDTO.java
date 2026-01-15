package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.MessageStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Schema(description = "Chat message details")
public class MessageDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440080")
    public String id;

    @Schema(description = "ID of the conversation", example = "550e8400-e29b-41d4-a716-446655440060")
    public String conversationId;

    @Schema(description = "ID of the message sender", example = "550e8400-e29b-41d4-a716-446655440010")
    public String senderUserId;

    @Schema(description = "Message text content", example = "Hello! Thank you for your application. Can we schedule an interview?")
    public String content;

    @Schema(description = "Message delivery status", example = "SENT")
    public MessageStatus status;

    @Schema(description = "Date when message was sent", example = "20-01-2026@14-45-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateSent;

    @Schema(description = "Date when message was edited (if edited)", example = "20-01-2026@14-50-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateEdited;

    @Schema(description = "Whether the message has been deleted", example = "false")
    public Boolean isDeleted;

    @Schema(description = "ID of message being replied to", example = "550e8400-e29b-41d4-a716-446655440079")
    public String replyToMessageId;

    @Schema(description = "IDs of message attachments")
    public Set<String> attachmentIds;

}
