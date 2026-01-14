package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.enums.Sector;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class OrganizationDTO {

    public String id;
    public String name;
    public String eik;
    public String address;
    public String description;
    public Sector sector;
    public Short yearCreated;
    @JsonFormat(pattern = "dd-MM-yyyy")
    public LocalDate dateJoined;
    public Boolean isActive;


    public Set<String> jobsOfferIds;

}
