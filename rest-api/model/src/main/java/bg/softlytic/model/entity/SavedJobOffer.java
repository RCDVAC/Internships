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
@Table(name = "SAVED_JOB_OFFER", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class SavedJobOffer {

    @Id
    public UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    @ToString.Exclude
    public User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "JOB_OFFER_ID", nullable = false)
    @ToString.Exclude
    public JobOffer jobOffer;

    @Column(name = "DATE_SAVED", nullable = false)
    public Timestamp dateSaved;

    @Column(name = "NOTES")
    public String notes;

    public SavedJobOffer() {
        this.id = UUID.randomUUID();
        this.dateSaved = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        SavedJobOffer that = (SavedJobOffer) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
