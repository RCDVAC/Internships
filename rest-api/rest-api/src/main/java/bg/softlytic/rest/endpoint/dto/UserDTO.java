package bg.softlytic.rest.endpoint.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDate;

@Data
@Schema(description = "User/Student profile details")
public class UserDTO {

    @Schema(description = "Unique identifier", example = "550e8400-e29b-41d4-a716-446655440010")
    public String id;

    @Schema(description = "Username for login", example = "ivan.petrov")
    public String username;

    @Schema(description = "Hashed password (write-only)", example = "")
    public String passwordHash;

    @Schema(description = "First name", example = "Ivan")
    public String firstName;

    @Schema(description = "Middle name", example = "Georgiev")
    public String middleName;

    @Schema(description = "Last name", example = "Petrov")
    public String lastName;

    @Schema(description = "Email address", example = "ivan.petrov@example.com")
    public String email;

    @Schema(description = "Phone number", example = "+359888123456")
    public String phoneNumber;

    @Schema(description = "Date of birth", example = "15-05-2000")
    @JsonFormat(pattern = "dd-MM-yyyy")
    public LocalDate date;

    @Schema(description = "User bio/description", example = "Computer Science student looking for software development internship")
    public String description;

    @Schema(description = "Whether the user account is active", example = "true")
    public Boolean isActive;

    @Schema(description = "Education details", example = "Sofia University, Computer Science, 3rd year")
    public String education;

}
