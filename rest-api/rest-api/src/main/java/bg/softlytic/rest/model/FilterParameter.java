package bg.softlytic.rest.model;

import jakarta.ws.rs.QueryParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FilterParameter {

    @QueryParam("type")
    private String type;

    @QueryParam("name")
    private String name;

    @QueryParam("value")
    private String value;

    public boolean hasValue() {
        return type != null && name != null && value != null;
    }

}
