package bg.softlytic.rest.model;

import jakarta.ws.rs.QueryParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FilterParameter {

    @QueryParam("type")
    @Parameter(description = "Filter type (e.g., workType, jobType, salary)", example = "workType")
    private String type;

    @QueryParam("name")
    @Parameter(description = "Filter field name", example = "workType")
    private String name;

    @QueryParam("value")
    @Parameter(description = "Filter value to match", example = "HYBRID")
    private String value;

    public boolean hasValue() {
        return type != null && name != null && value != null;
    }

}
