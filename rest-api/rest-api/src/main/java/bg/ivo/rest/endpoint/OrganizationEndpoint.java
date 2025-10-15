package bg.ivo.rest.endpoint;

import bg.ivo.model.entity.Organization;
import bg.ivo.rest.endpoint.dto.OrganizationDTO;
import bg.ivo.rest.service.OrganizationService;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;

import java.util.UUID;

@ApplicationScoped
@Path("/api/organizations")
@Authenticated
public class OrganizationEndpoint {

    @Inject
    OrganizationService organizationService;

    @GET
    @Path("/{organizationId}")
    public Uni<OrganizationDTO> getOrganizationById() {
        return Uni.createFrom().item(null);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("ADMIN")
    public Uni<UUID> createOrganization(OrganizationDTO organizationDTO) {
        return organizationService.createOrganization(organizationDTO).map(Organization::getId);
    }


}

