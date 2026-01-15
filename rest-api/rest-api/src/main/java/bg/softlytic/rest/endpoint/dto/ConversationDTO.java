package bg.softlytic.rest.endpoint.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Schema(description = "Chat conversation thread")
public class ConversationDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440060")
    public String id;

    @Schema(description = "ID of the related job application", example = "550e8400-e29b-41d4-a716-446655440020")
    public String applicationId;

    @Schema(description = "Conversation title", example = "Interview Discussion - Software Developer Intern")
    public String title;

    @Schema(description = "Date when conversation was created", example = "15-01-2026@10-30-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateCreated;

    @Schema(description = "Date of the last message", example = "20-01-2026@14-45-00")
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateLastMessage;

    @Schema(description = "Whether the conversation is active", example = "true")
    public Boolean isActive;

    @Schema(description = "IDs of conversation participants")
    public Set<String> participantIds;

}
