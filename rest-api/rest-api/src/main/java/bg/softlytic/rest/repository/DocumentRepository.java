package bg.softlytic.rest.repository;

import bg.softlytic.model.entity.Document;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class DocumentRepository implements PanacheRepositoryBase<Document, UUID> {

    public Uni<List<Document>> findByUserId(UUID userId) {
        return list("user.id", userId);
    }

    public Uni<List<Document>> findActiveByUserId(UUID userId) {
        return list("user.id = ?1 and isActive = true", userId);
    }

}
