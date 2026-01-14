package bg.softlytic.rest.repository;

import bg.softlytic.model.entity.SavedJobOffer;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class SavedJobOfferRepository implements PanacheRepositoryBase<SavedJobOffer, UUID> {

    public Uni<List<SavedJobOffer>> findByUserId(UUID userId) {
        return list("user.id", userId);
    }

    public Uni<SavedJobOffer> findByUserAndJobOffer(UUID userId, UUID jobOfferId) {
        return find("user.id = ?1 and jobOffer.id = ?2", userId, jobOfferId).firstResult();
    }

}
