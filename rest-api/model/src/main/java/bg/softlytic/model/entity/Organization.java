package bg.softlytic.model.entity;

import bg.softlytic.model.enums.Sector;
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
@Table(name = "ORGANIZATION", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class Organization {

    @Id
    public UUID id;
    @Column(name = "NAME")
    public String name;
    @Column(name = "EIK")
    public String eik;
    @Column(name = "ADDRESS")
    public String address;
    @Column(name = "DESCRIPTION")
    public String description;
    @Column(name = "SECTOR")
    @Enumerated(EnumType.STRING)
    public Sector sector;
    @Column(name = "YEAR_CREATED")
    public String yearCreated;
    @Column(name = "DATE_JOINED")
    public Timestamp dateJoined;
    @Column(name = "IS_ACTIVE")
    public Boolean isActive;


    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    @ToString.Exclude
    public Set<JobOffer> jobsOffers = new HashSet<>();

    public Organization() {
        this.id = UUID.randomUUID();
        this.isActive = true;
        this.dateJoined = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Organization that = (Organization) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
