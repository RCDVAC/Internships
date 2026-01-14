package bg.softlytic.rest.endpoint.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageAttachmentDTO {

    public String id;
    public String messageId;
    public String fileName;
    public String filePath;
    public Long fileSize;
    public String mimeType;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateUploaded;

}
