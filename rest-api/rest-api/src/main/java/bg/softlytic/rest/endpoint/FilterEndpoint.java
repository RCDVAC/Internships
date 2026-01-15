package bg.softlytic.rest.endpoint;

import bg.softlytic.rest.endpoint.dto.FilterOptionDto;
import bg.softlytic.rest.service.filter.FilterService;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@ApplicationScoped
@Path("/api/filters")
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Filters", description = "Filter options for job search")
public class FilterEndpoint {

    @Inject
    FilterService filterService;

    @GET
    @Operation(summary = "Get all filter options", description = "Retrieves all available filter options for job search")
    @APIResponse(responseCode = "200", description = "List of filter options",
            content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = FilterOptionDto.class)))
    public Uni<List<FilterOptionDto>> findAll() {
        return Uni.createFrom().item(null);
    }

}
