package bg.softlytic.rest.endpoint;

import bg.softlytic.model.entity.Organization;
import bg.softlytic.rest.endpoint.dto.ApplicationMapper;
import bg.softlytic.rest.endpoint.dto.OrganizationDTO;
import bg.softlytic.rest.service.OrganizationService;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
@Path("/api/organizations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class OrganizationEndpoint {

    @Inject
    ApplicationMapper applicationMapper;

    @Inject
    OrganizationService organizationService;

    @GET
    @Path("/{organizationId}")
    public Uni<OrganizationDTO> getOrganizationById(@PathParam("organizationId") UUID organizationId) {
        return organizationService.findById(organizationId)
                .map(applicationMapper::toDto);
    }

    @GET
    public Uni<List<OrganizationDTO>> listAllOrganizations() {
        return organizationService.findAll()
                .map(organizations -> organizations.stream()
                        .map(applicationMapper::toDto)
                        .toList());
    }

    @POST
    @RolesAllowed("ADMIN")
    public Uni<Response> createOrganization(OrganizationDTO organizationDTO) {
        return organizationService.create(organizationDTO)
                .map(Organization::getId)
                .map(id -> Response.status(Response.Status.CREATED).entity(id).build());
    }

    @PUT
    @Path("/{organizationId}")
    @RolesAllowed("ADMIN")
    public Uni<OrganizationDTO> updateOrganization(@PathParam("organizationId") UUID organizationId,
                                                    OrganizationDTO organizationDTO) {
        return organizationService.update(organizationId, organizationDTO)
                .map(applicationMapper::toDto);
    }

    @DELETE
    @Path("/{organizationId}")
    @RolesAllowed("ADMIN")
    public Uni<Response> deleteOrganization(@PathParam("organizationId") UUID organizationId) {
        return organizationService.delete(organizationId)
                .map(deleted -> Response.noContent().build());
    }

}

