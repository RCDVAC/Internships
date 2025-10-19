package bg.softlytic.rest.endpoint;

import bg.softlytic.model.entity.Organization;
import bg.softlytic.rest.endpoint.dto.ApplicationMapper;
import bg.softlytic.rest.endpoint.dto.OrganizationDTO;
import bg.softlytic.rest.service.OrganizationService;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
@Path("/api/organizations")
@Authenticated
public class OrganizationEndpoint {

    @Inject
    ApplicationMapper applicationMapper;

    @Inject
    OrganizationService organizationService;

    @GET
    @Path("/{organizationId}")
    public Uni<OrganizationDTO> getOrganizationById(@PathParam("organizationId") String organizationId) {
        return organizationService.findById(UUID.fromString(organizationId))
                .map((organization) -> applicationMapper.toDto(organization));
    }

    @GET
    public Uni<List<OrganizationDTO>> listAllOrganizations() {
        return organizationService.findAll()
                .map( organizations -> organizations.stream()
                        .map(organization -> applicationMapper.toDto(organization))
                        .toList());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("ADMIN")
    public Uni<UUID> createOrganization(OrganizationDTO organizationDTO) {
        return organizationService.create(organizationDTO).map(Organization::getId);
    }


}

