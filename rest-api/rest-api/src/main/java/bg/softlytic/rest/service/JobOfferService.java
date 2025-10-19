package bg.softlytic.rest.service;

import bg.softlytic.model.entity.JobOffer;
import bg.softlytic.rest.endpoint.dto.ApplicationMapper;
import bg.softlytic.rest.endpoint.dto.JobOfferDTO;
import bg.softlytic.rest.repository.JobOfferRepository;
import bg.softlytic.rest.model.FilterParameter;
import bg.softlytic.rest.service.filter.FilterService;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.*;

@Slf4j
@ApplicationScoped
public class JobOfferService {

    @Inject
    JobOfferRepository jobOfferRepository;
    @Inject
    ApplicationMapper applicationMapper;
    @Inject
    FilterService filterService;

    @WithTransaction
    public Uni<JobOffer> findById(UUID uuid) {
        return jobOfferRepository.findById(uuid);
        // TODO: More sophisticated error handling
//        (() -> {
//            log.error("Job offer with uuid: {}, not found", uuid);
//            return new JobOfferNotFoundException();
//        });
    }

    @WithTransaction
    public Uni<List<JobOffer>> listAll(){
        return jobOfferRepository.listAll();
    }

    @WithTransaction
    public Uni<JobOffer> create(JobOfferDTO jobOfferDTO) {
        Uni<JobOffer> jobOfferUni = applicationMapper.toEntity(jobOfferDTO);
        return jobOfferUni.onItem().transformToUni((jobOffer) -> jobOfferRepository.persist(jobOffer));
    }

    public Uni<List<JobOffer>> filter() {
        List<FilterParameter> parameters = new ArrayList<>();
        return filterService.filter(JobOffer.class, parameters).onItem().transformToUni(predicate -> {
            return jobOfferRepository.filterJobs(predicate);
        });
    }


}
