package bg.softlytic.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.proxy.HibernateProxy;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "CONVERSATION_PARTICIPANT", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class ConversationParticipant {

    @Id
    public UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONVERSATION_ID", nullable = false)
    @ToString.Exclude
    public Conversation conversation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    @ToString.Exclude
    public User user;

    @Column(name = "DATE_JOINED", nullable = false)
    public Timestamp dateJoined;

    @Column(name = "DATE_LAST_READ")
    public Timestamp dateLastRead;

    @Column(name = "IS_TYPING", nullable = false)
    public Boolean isTyping;

    @Column(name = "TYPING_UPDATED_AT")
    public Timestamp typingUpdatedAt;

    @Column(name = "IS_ACTIVE", nullable = false)
    public Boolean isActive;

    public ConversationParticipant() {
        this.id = UUID.randomUUID();
        this.isActive = true;
        this.isTyping = false;
        this.dateJoined = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        ConversationParticipant that = (ConversationParticipant) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
