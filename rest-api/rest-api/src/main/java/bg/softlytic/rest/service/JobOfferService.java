package bg.softlytic.rest.service;

import bg.softlytic.exception.JobOfferNotFoundException;
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
        return jobOfferRepository.findById(uuid)
                .onItem().ifNull().failWith(() -> {
                    log.error("Job offer with uuid: {}, not found", uuid);
                    return new JobOfferNotFoundException("Job offer with id " + uuid + " not found");
                });
    }

    @WithTransaction
    public Uni<List<JobOffer>> listAll() {
        return jobOfferRepository.listAll();
    }

    @WithTransaction
    public Uni<JobOffer> create(JobOfferDTO jobOfferDTO) {
        return applicationMapper.toEntity(jobOfferDTO)
                .onItem().transformToUni(jobOffer -> jobOfferRepository.persist(jobOffer));
    }

    @WithTransaction
    public Uni<JobOffer> update(UUID uuid, JobOfferDTO jobOfferDTO) {
        return jobOfferRepository.findById(uuid)
                .onItem().ifNull().failWith(() -> {
                    log.error("Job offer with uuid: {}, not found for update", uuid);
                    return new JobOfferNotFoundException("Job offer with id " + uuid + " not found");
                })
                .onItem().transformToUni(existingJobOffer ->
                        applicationMapper.updateEntity(existingJobOffer, jobOfferDTO))
                .onItem().transformToUni(updatedJobOffer ->
                        jobOfferRepository.persist(updatedJobOffer));
    }

    @WithTransaction
    public Uni<Boolean> delete(UUID uuid) {
        return jobOfferRepository.findById(uuid)
                .onItem().ifNull().failWith(() -> {
                    log.error("Job offer with uuid: {}, not found for deletion", uuid);
                    return new JobOfferNotFoundException("Job offer with id " + uuid + " not found");
                })
                .onItem().transformToUni(jobOffer -> jobOfferRepository.delete(jobOffer))
                .onItem().transform(ignored -> true);
    }

    @WithTransaction
    public Uni<List<JobOffer>> filter(List<FilterParameter> parameters) {
        return filterService.filter(JobOffer.class, parameters)
                .onItem().transformToUni(predicate -> jobOfferRepository.filterJobs(predicate));
    }

}
