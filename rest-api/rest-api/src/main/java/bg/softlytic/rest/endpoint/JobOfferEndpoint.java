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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
@Path("/api/job-offers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class JobOfferEndpoint {

    @Inject
    JobOfferService jobOfferService;
    @Inject
    ApplicationMapper applicationMapper;

    @GET
    @Path("/{jobOfferId}")
    public Uni<JobOfferDTO> findById(@PathParam("jobOfferId") UUID jobOfferId) {
        return jobOfferService.findById(jobOfferId)
                .map(applicationMapper::toDto);
    }

    @GET
    public Uni<List<JobOfferDTO>> listAll() {
        return jobOfferService.listAll()
                .map(jobOffers -> jobOffers.stream()
                        .map(applicationMapper::toDto)
                        .toList());
    }

    @POST
    public Uni<Response> create(JobOfferDTO jobOfferDTO) {
        return jobOfferService.create(jobOfferDTO)
                .map(JobOffer::getId)
                .map(id -> Response.status(Response.Status.CREATED).entity(id).build());
    }

    @PUT
    @Path("/{jobOfferId}")
    public Uni<JobOfferDTO> update(@PathParam("jobOfferId") UUID jobOfferId, JobOfferDTO jobOfferDTO) {
        return jobOfferService.update(jobOfferId, jobOfferDTO)
                .map(applicationMapper::toDto);
    }

    @DELETE
    @Path("/{jobOfferId}")
    public Uni<Response> delete(@PathParam("jobOfferId") UUID jobOfferId) {
        return jobOfferService.delete(jobOfferId)
                .map(deleted -> Response.noContent().build());
    }

    @GET
    @Path("/filter")
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
