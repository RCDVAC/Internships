package bg.softlytic.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.proxy.HibernateProxy;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "CONVERSATION", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class Conversation {

    @Id
    public UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "APPLICATION_ID", nullable = false)
    @ToString.Exclude
    public JobApplication application;

    @Column(name = "TITLE")
    public String title;

    @Column(name = "DATE_CREATED", nullable = false)
    public Timestamp dateCreated;

    @Column(name = "DATE_LAST_MESSAGE")
    public Timestamp dateLastMessage;

    @Column(name = "IS_ACTIVE", nullable = false)
    public Boolean isActive;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    @ToString.Exclude
    public Set<ConversationParticipant> participants = new HashSet<>();

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    @ToString.Exclude
    public Set<Message> messages = new HashSet<>();

    public Conversation() {
        this.id = UUID.randomUUID();
        this.isActive = true;
        this.dateCreated = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Conversation that = (Conversation) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
