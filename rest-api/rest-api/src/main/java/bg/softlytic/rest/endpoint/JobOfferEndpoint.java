package bg.softlytic.rest.endpoint;

import bg.softlytic.model.entity.JobOffer;
import bg.softlytic.rest.endpoint.dto.ApplicationMapper;
import bg.softlytic.rest.endpoint.dto.JobOfferDTO;
import bg.softlytic.rest.service.JobOfferService;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
@Path("api/job-offer")
public class JobOfferEndpoint {

    @Inject
    JobOfferService jobOfferService;
    @Inject
    ApplicationMapper applicationMapper;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{jobOfferId}")
    public Uni<JobOfferDTO> findById(@PathParam("jobOfferId") String jobOfferId) {
        return jobOfferService.findById(UUID.fromString(jobOfferId))
                .map((jobOffer) -> applicationMapper.toDto(jobOffer));
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<List<JobOfferDTO>> listAll() {
        return jobOfferService.listAll().map((jobOffers) -> jobOffers.stream()
                .map((jobOffer -> applicationMapper.toDto(jobOffer)))
                .toList());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Uni<UUID> create(JobOfferDTO jobOfferDTO) {
        return jobOfferService.create(jobOfferDTO).map(JobOffer::getId);
    }

    @GET
    @Path("/filter")
    public Uni<List<JobOfferDTO>> filter() {
        return jobOfferService.filter()
                .map(jobOffers -> jobOffers.stream().map(jobOffer -> applicationMapper.toDto(jobOffer)).toList());
    }

}
