package bg.ivo.rest.endpoint;

import bg.ivo.model.entity.JobOffer;
import bg.ivo.rest.endpoint.dto.ApplicationMapper;
import bg.ivo.rest.endpoint.dto.JobOfferDTO;
import bg.ivo.rest.service.JobOfferService;
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
    public Uni<JobOfferDTO> getJobOffer(@PathParam("jobOfferId") String jobOfferId) {
        return jobOfferService.getJobOfferById(UUID.fromString(jobOfferId))
                .map((jobOffer) -> applicationMapper.toDto(jobOffer));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/")
    public Uni<UUID> createJobOffer(JobOfferDTO jobOfferDTO) {
        return jobOfferService.createJobOffer(jobOfferDTO).map(JobOffer::getId);
    }

    @GET
    @Path("/filter")
    public Uni<List<JobOfferDTO>> filter() {
        return jobOfferService.filter()
                .map(jobOffers -> jobOffers.stream().map(jobOffer -> applicationMapper.toDto(jobOffer)).toList());
    }

}
