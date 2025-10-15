package bg.ivo.rest.service;

import bg.ivo.model.entity.JobOffer;
import bg.ivo.model.enums.WorkType;
import bg.ivo.rest.endpoint.dto.ApplicationMapper;
import bg.ivo.rest.endpoint.dto.JobOfferDTO;
import bg.ivo.rest.repository.JobOfferRepository;
import bg.ivo.rest.service.filter.strategy.FilterService;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    public Uni<JobOffer> getJobOfferById(UUID uuid) {
        return jobOfferRepository.findById(uuid);
//        (() -> {
//            log.error("Job offer with uuid: {}, not found", uuid);
//            return new JobOfferNotFoundException();
//        });
    }

    @WithTransaction
    public Uni<JobOffer> createJobOffer(JobOfferDTO jobOfferDTO) {
        Uni<JobOffer> jobOfferUni = applicationMapper.toEntity(jobOfferDTO);
        return jobOfferUni.onItem().transformToUni((jobOffer) -> jobOfferRepository.persist(jobOffer));
    }

    public Uni<List<JobOffer>> filter() {
        Map<String, Object> params = new HashMap<>();
        params.put(FilterTypes.WORK_TYPE, WorkType.OFFICE);
        params.put(FilterTypes.SALARY, 1500);
        return filterService.filter(JobOffer.class, params).onItem().transformToUni(predicate -> {
            return jobOfferRepository.filterJobs(predicate);
        });
    }


}
