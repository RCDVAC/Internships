package bg.softlytic.model.entity;

import bg.softlytic.model.enums.OrganizationRole;
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
@Table(name = "ORGANIZATION_ADMIN", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class OrganizationAdmin {

    @Id
    public UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORGANIZATION_ID", nullable = false)
    @ToString.Exclude
    public Organization organization;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    @ToString.Exclude
    public User user;

    @Column(name = "ROLE", nullable = false)
    @Enumerated(EnumType.STRING)
    public OrganizationRole role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ADDED_BY_USER_ID")
    @ToString.Exclude
    public User addedBy;

    @Column(name = "DATE_ADDED", nullable = false)
    public Timestamp dateAdded;

    @Column(name = "IS_ACTIVE", nullable = false)
    public Boolean isActive;

    public OrganizationAdmin() {
        this.id = UUID.randomUUID();
        this.isActive = true;
        this.dateAdded = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        OrganizationAdmin that = (OrganizationAdmin) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
