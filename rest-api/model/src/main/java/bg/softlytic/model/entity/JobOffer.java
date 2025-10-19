package bg.softlytic.model.entity;

import bg.softlytic.model.enums.JobType;
import bg.softlytic.model.enums.WorkType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.proxy.HibernateProxy;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "JOB_OFFER", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class JobOffer {

    @Id
    public UUID id;
    public String description;
    @Column(name = "IS_ACTIVE")
    public Boolean isActive;
    @Column(name = "MINIMUM_SALARY")
    public Integer minSalary;
    @Column(name = "MAXIMUM_SALARY")
    public Integer maxSalary;
    // eg. from office, remote, mixed
    @Column(name = "WORKPLACE_TYPE")
    @Enumerated(EnumType.STRING)
    public WorkType workType;
    // eg. part-time, full-time
    @Column(name = "JOB_TYPE")
    @Enumerated(EnumType.STRING)
    public JobType jobType;
    @Column(name = "WORK_HOURS")
    public String workHours;
    @Column(name = "VISITED")
    public Long visited;
    @Column(name = "DATE_CREATED")
    public Timestamp dateCreated;
    @Column(name = "DATE_MODIFIED")
    public Timestamp dateModified;

    @ManyToOne()
    @JoinColumn(name = "ORGANIZATION_ID", referencedColumnName = "ID")
    @ToString.Exclude
    public Organization organization;

    @ManyToMany()
    @ToString.Exclude
    public Set<FilterOption> filterOptions;

    public JobOffer() {
        this.id = UUID.randomUUID();
        this.isActive = true;
        this.dateCreated = Timestamp.from(Instant.now());
        this.dateModified = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        JobOffer jobOffer = (JobOffer) o;
        return this.id != null && Objects.equals(this.id, jobOffer.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
