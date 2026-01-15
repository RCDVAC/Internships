package bg.softlytic.rest.endpoint;

import bg.softlytic.model.entity.JobOffer;
import bg.softlytic.rest.endpoint.dto.ApplicationMapper;
import bg.softlytic.rest.endpoint.dto.JobOfferDTO;
import bg.softlytic.rest.model.FilterParameter;
import bg.softlytic.rest.service.JobOfferService;
import io.smallrye.mutiny.Uni;
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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
@Path("/api/job-offers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Job Offers", description = "Job offer management operations")
public class JobOfferEndpoint {

    @Inject
    JobOfferService jobOfferService;
    @Inject
    ApplicationMapper applicationMapper;

    @GET
    @Path("/{jobOfferId}")
    @Operation(summary = "Get job offer by ID", description = "Retrieves a specific job offer by its unique identifier")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Job offer found",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobOfferDTO.class))),
            @APIResponse(responseCode = "404", description = "Job offer not found")
    })
    public Uni<JobOfferDTO> findById(
            @Parameter(description = "Job offer UUID", required = true, example = "550e8400-e29b-41d4-a716-446655440000")
            @PathParam("jobOfferId") UUID jobOfferId) {
        return jobOfferService.findById(jobOfferId)
                .map(applicationMapper::toDto);
    }

    @GET
    @Operation(summary = "List all job offers", description = "Retrieves all available job offers")
    @APIResponse(responseCode = "200", description = "List of job offers",
            content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobOfferDTO.class)))
    public Uni<List<JobOfferDTO>> listAll() {
        return jobOfferService.listAll()
                .map(jobOffers -> jobOffers.stream()
                        .map(applicationMapper::toDto)
                        .toList());
    }

    @POST
    @Operation(summary = "Create job offer", description = "Creates a new job offer")
    @APIResponses({
            @APIResponse(responseCode = "201", description = "Job offer created successfully",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = UUID.class))),
            @APIResponse(responseCode = "400", description = "Invalid job offer data")
    })
    public Uni<Response> create(JobOfferDTO jobOfferDTO) {
        return jobOfferService.create(jobOfferDTO)
                .map(JobOffer::getId)
                .map(id -> Response.status(Response.Status.CREATED).entity(id).build());
    }

    @PUT
    @Path("/{jobOfferId}")
    @Operation(summary = "Update job offer", description = "Updates an existing job offer")
    @APIResponses({
            @APIResponse(responseCode = "200", description = "Job offer updated successfully",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobOfferDTO.class))),
            @APIResponse(responseCode = "404", description = "Job offer not found"),
            @APIResponse(responseCode = "400", description = "Invalid job offer data")
    })
    public Uni<JobOfferDTO> update(
            @Parameter(description = "Job offer UUID", required = true, example = "550e8400-e29b-41d4-a716-446655440000")
            @PathParam("jobOfferId") UUID jobOfferId,
            JobOfferDTO jobOfferDTO) {
        return jobOfferService.update(jobOfferId, jobOfferDTO)
                .map(applicationMapper::toDto);
    }

    @DELETE
    @Path("/{jobOfferId}")
    @Operation(summary = "Delete job offer", description = "Deletes a job offer by ID")
    @APIResponses({
            @APIResponse(responseCode = "204", description = "Job offer deleted successfully"),
            @APIResponse(responseCode = "404", description = "Job offer not found")
    })
    public Uni<Response> delete(
            @Parameter(description = "Job offer UUID", required = true, example = "550e8400-e29b-41d4-a716-446655440000")
            @PathParam("jobOfferId") UUID jobOfferId) {
        return jobOfferService.delete(jobOfferId)
                .map(deleted -> Response.noContent().build());
    }

    @GET
    @Path("/filter")
    @Operation(summary = "Filter job offers", description = "Filters job offers based on various criteria")
    @APIResponse(responseCode = "200", description = "Filtered list of job offers",
            content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JobOfferDTO.class)))
    public Uni<List<JobOfferDTO>> filter(@BeanParam FilterParameter filterParameter) {
        List<FilterParameter> parameters = new ArrayList<>();
        if (filterParameter != null && filterParameter.hasValue()) {
            parameters.add(filterParameter);
        }
        return jobOfferService.filter(parameters)
                .map(jobOffers -> jobOffers.stream()
                        .map(applicationMapper::toDto)
                        .toList());
    }

}
