package bg.softlytic.rest.repository;

import bg.softlytic.model.entity.Conversation;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class ConversationRepository implements PanacheRepositoryBase<Conversation, UUID> {

    public Uni<List<Conversation>> findByApplicationId(UUID applicationId) {
        return list("application.id", applicationId);
    }

}
