package bg.ivo.rest.repository;

import bg.ivo.model.entity.JobOffer;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaQuery;
import org.hibernate.reactive.mutiny.Mutiny;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class JobOfferRepository implements PanacheRepositoryBase<JobOffer, UUID> {

    public Uni<List<JobOffer>> filterJobs(CriteriaQuery<JobOffer> query) {
        return Panache.withSession(() -> {
            return Panache.getSession().onItem().transformToUni(session -> {
                Mutiny.SelectionQuery<JobOffer> typedQuery = session.createQuery(query);
                return typedQuery.getResultList();
            });
        });

    }

}
