package bg.softlytic.rest.endpoint;

import bg.softlytic.rest.endpoint.dto.FilterOptionDto;
import bg.softlytic.rest.service.filter.FilterService;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.util.List;

@ApplicationScoped
@Path("api/filters")
public class FilterEndpoint {

    @Inject
    FilterService filterService;

    @GET
    public Uni<List<FilterOptionDto>> findAll(){
        return Uni.createFrom().item(null);
    }


}
