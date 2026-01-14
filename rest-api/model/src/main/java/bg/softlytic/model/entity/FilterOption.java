package bg.softlytic.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "FILTER_OPTION", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class FilterOption {

    @Id
    @Column(name = "ID")
    public UUID id;

    @Column(name = "NAME")
    public String name;

    @Column(name = "TYPE")
    public String type;

    @Column(name = "PRESENTABLE_NAME")
    public String presentableName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_FILTER_OPTION_ID")
    @ToString.Exclude
    public FilterOption parentFilter;

    @Column(name = "IS_ACTIVE")
    public Boolean isActive;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Document that = (Document) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
