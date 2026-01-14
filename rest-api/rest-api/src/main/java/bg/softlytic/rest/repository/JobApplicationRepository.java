package bg.softlytic.rest.repository;

import bg.softlytic.model.entity.JobApplication;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class JobApplicationRepository implements PanacheRepositoryBase<JobApplication, UUID> {

    public Uni<List<JobApplication>> findByUserId(UUID userId) {
        return list("user.id", userId);
    }

    public Uni<List<JobApplication>> findByJobOfferId(UUID jobOfferId) {
        return list("jobOffer.id", jobOfferId);
    }

}
