package bg.softlytic.rest.repository;

import bg.softlytic.model.entity.Message;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class MessageRepository implements PanacheRepositoryBase<Message, UUID> {

    public Uni<List<Message>> findByConversationId(UUID conversationId) {
        return list("conversation.id", conversationId);
    }

    public Uni<List<Message>> findByConversationIdOrderByDateSent(UUID conversationId) {
        return list("conversation.id = ?1 order by dateSent asc", conversationId);
    }

}
