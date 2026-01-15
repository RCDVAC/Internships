package bg.softlytic.rest.endpoint.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Schema(description = "Conversation participant details")
public class ConversationParticipantDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440070")
    public String id;

    @Schema(description = "ID of the conversation", example = "550e8400-e29b-41d4-a716-446655440060")
    public String conversationId;

    @Schema(description = "ID of the participant user", example = "550e8400-e29b-41d4-a716-446655440010")
    public String userId;

    @Schema(description = "Date when user joined the conversation", example = "15-01-2026@10-30-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateJoined;

    @Schema(description = "Date when user last read messages", example = "20-01-2026@14-45-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateLastRead;

    @Schema(description = "Whether user is currently typing", example = "false")
    public Boolean isTyping;

    @Schema(description = "When typing status was last updated", example = "20-01-2026@14-45-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime typingUpdatedAt;

    @Schema(description = "Whether the participant is active in conversation", example = "true")
    public Boolean isActive;

}
