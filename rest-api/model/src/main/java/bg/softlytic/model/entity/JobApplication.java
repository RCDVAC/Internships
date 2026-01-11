package bg.softlytic.model.entity;

import bg.softlytic.model.enums.ApplicationStatus;
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
@Table(name = "JOB_APPLICATION", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class JobApplication {

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

    @Column(name = "STATUS", nullable = false)
    @Enumerated(EnumType.STRING)
    public ApplicationStatus status;

    @Column(name = "COVER_LETTER", columnDefinition = "text")
    public String coverLetter;

    @Column(name = "NOTES", columnDefinition = "text")
    public String notes;

    @Column(name = "DATE_APPLIED", nullable = false)
    public Timestamp dateApplied;

    @Column(name = "DATE_MODIFIED", nullable = false)
    public Timestamp dateModified;

    @Column(name = "IS_ACTIVE", nullable = false)
    public Boolean isActive;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL)
    @ToString.Exclude
    public Set<ApplicationStatusHistory> statusHistory = new HashSet<>();

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL)
    @ToString.Exclude
    public Set<ApplicationDocument> documents = new HashSet<>();

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL)
    @ToString.Exclude
    public Set<Conversation> conversations = new HashSet<>();

    public JobApplication() {
        this.id = UUID.randomUUID();
        this.isActive = true;
        this.status = ApplicationStatus.APPLIED;
        this.dateApplied = Timestamp.from(Instant.now());
        this.dateModified = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        JobApplication that = (JobApplication) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
