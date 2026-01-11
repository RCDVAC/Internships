package bg.softlytic.model.entity;

import bg.softlytic.model.enums.ApplicationStatus;
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
@Table(name = "APPLICATION_STATUS_HISTORY", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class ApplicationStatusHistory {

    @Id
    public UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "APPLICATION_ID", nullable = false)
    @ToString.Exclude
    public JobApplication application;

    @Column(name = "PREVIOUS_STATUS")
    @Enumerated(EnumType.STRING)
    public ApplicationStatus previousStatus;

    @Column(name = "NEW_STATUS", nullable = false)
    @Enumerated(EnumType.STRING)
    public ApplicationStatus newStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHANGED_BY_USER_ID")
    @ToString.Exclude
    public User changedBy;

    @Column(name = "NOTES", columnDefinition = "text")
    public String notes;

    @Column(name = "DATE_CHANGED", nullable = false)
    public Timestamp dateChanged;

    public ApplicationStatusHistory() {
        this.id = UUID.randomUUID();
        this.dateChanged = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        ApplicationStatusHistory that = (ApplicationStatusHistory) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
