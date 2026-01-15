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
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
@Path("/api/organizations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Organizations", description = "Organization management operations")
public class OrganizationEndpoint {

    @Inject
    ApplicationMapper applicationMapper;

    @Inject
    OrganizationService organizationService;

    @GET
    @Path("/{organizationId}")
    @Operation(summary = "Get organization by ID", description = "Retrieves a specific organization by its unique identifier")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Organization found",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = OrganizationDTO.class))),
            @APIResponse(responseCode = "404", description = "Organization not found")
    })
    public Uni<OrganizationDTO> getOrganizationById(
            @Parameter(description = "Organization UUID", required = true, example = "550e8400-e29b-41d4-a716-446655440001")
            @PathParam("organizationId") UUID organizationId) {
        return organizationService.findById(organizationId)
                .map(applicationMapper::toDto);
    }

    @GET
    @Operation(summary = "List all organizations", description = "Retrieves all registered organizations")
    @APIResponse(responseCode = "200", description = "List of organizations",
            content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = OrganizationDTO.class)))
    public Uni<List<OrganizationDTO>> listAllOrganizations() {
        return organizationService.findAll()
                .map(organizations -> organizations.stream()
                        .map(applicationMapper::toDto)
                        .toList());
    }

    @POST
    @RolesAllowed("ADMIN")
    @Operation(summary = "Create organization", description = "Creates a new organization (requires ADMIN role)")
    @APIResponses({
            @APIResponse(responseCode = "201", description = "Organization created successfully",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = UUID.class))),
            @APIResponse(responseCode = "400", description = "Invalid organization data"),
            @APIResponse(responseCode = "403", description = "Access denied - ADMIN role required")
    })
    public Uni<Response> createOrganization(OrganizationDTO organizationDTO) {
        return organizationService.create(organizationDTO)
                .map(Organization::getId)
                .map(id -> Response.status(Response.Status.CREATED).entity(id).build());
    }

    @PUT
    @Path("/{organizationId}")
    @RolesAllowed("ADMIN")
    @Operation(summary = "Update organization", description = "Updates an existing organization (requires ADMIN role)")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Organization updated successfully",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = OrganizationDTO.class))),
            @APIResponse(responseCode = "404", description = "Organization not found"),
            @APIResponse(responseCode = "400", description = "Invalid organization data"),
            @APIResponse(responseCode = "403", description = "Access denied - ADMIN role required")
    })
    public Uni<OrganizationDTO> updateOrganization(
            @Parameter(description = "Organization UUID", required = true, example = "550e8400-e29b-41d4-a716-446655440001")
            @PathParam("organizationId") UUID organizationId,
            OrganizationDTO organizationDTO) {
        return organizationService.update(organizationId, organizationDTO)
                .map(applicationMapper::toDto);
    }

    @DELETE
    @Path("/{organizationId}")
    @RolesAllowed("ADMIN")
    @Operation(summary = "Delete organization", description = "Deletes an organization by ID (requires ADMIN role)")
    @APIResponses({
            @APIResponse(responseCode = "204", description = "Organization deleted successfully"),
            @APIResponse(responseCode = "404", description = "Organization not found"),
            @APIResponse(responseCode = "403", description = "Access denied - ADMIN role required")
    })
    public Uni<Response> deleteOrganization(
            @Parameter(description = "Organization UUID", required = true, example = "550e8400-e29b-41d4-a716-446655440001")
            @PathParam("organizationId") UUID organizationId) {
        return organizationService.delete(organizationId)
                .map(deleted -> Response.noContent().build());
    }

}
