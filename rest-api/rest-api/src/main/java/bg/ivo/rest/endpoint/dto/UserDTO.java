package bg.ivo.rest.endpoint.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDTO {

    public String id;
    public String username;
    public String passwordHash;
    public String firstName;
    public String middleName;
    public String lastName;
    public String email;
    public String phoneNumber;
    public LocalDate date;
    public String description;
    public Boolean isActive;

    public String education;

//    @JdbcTypeCode(SqlTypes.JSON)
//    private Set<Search> searches;


}
