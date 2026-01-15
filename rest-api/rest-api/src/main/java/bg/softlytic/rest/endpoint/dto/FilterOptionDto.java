package bg.softlytic.rest.endpoint.dto;

import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

@Data
@Schema(description = "Filter option for job search")
public class FilterOptionDto {

    @Schema(description = "Filter option ID", example = "550e8400-e29b-41d4-a716-446655440002")
    public String id;

    @Schema(description = "Filter option display name", example = "Software Development")
    public String name;

    @Schema(description = "Filter type category", example = "CATEGORY")
    public String type;

}
