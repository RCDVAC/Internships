package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.MessageStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class MessageDTO {

    public String id;
    public String conversationId;
    public String senderUserId;
    public String content;
    public MessageStatus status;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateSent;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateEdited;
    public Boolean isDeleted;
    public String replyToMessageId;

    public Set<String> attachmentIds;

}
