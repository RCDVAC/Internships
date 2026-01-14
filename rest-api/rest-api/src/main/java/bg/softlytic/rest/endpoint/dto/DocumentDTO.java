package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.DocumentType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DocumentDTO {

    public String id;
    public String userId;
    public String fileName;
    public String originalFileName;
    public String filePath;
    public Long fileSize;
    public String mimeType;
    public DocumentType documentType;
    public String description;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateUploaded;
    @JsonFormat(pattern = "dd-MM-yyyy@HH-mm-ss")
    public LocalDateTime dateModified;
    public Boolean isActive;
    public Boolean isPrimary;

}
