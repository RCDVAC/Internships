package bg.softlytic.model.entity;

import bg.softlytic.model.enums.Education;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.proxy.HibernateProxy;
import org.hibernate.type.SqlTypes;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "USERS", schema = "jobs_project")
@Getter
@Setter
@ToString
public class User {

    @Id
    public UUID id;
    public String username;
    @Column(name = "CREDENTIAL_DATA")
    public String credentialData;
    @Column(name = "SECRET_DATA")
    public String secretData;
    @Column(name = "FIRST_NAME")
    public String firstName;
    @Column(name = "MIDDLE_NAME")
    public String middleName;
    @Column(name = "LAST_NAME")
    public String lastName;
    @Column(name = "EMAIL")
    public String email;
    @Column(name = "PHONE_NUMBER")
    public String phoneNumber;
    @Column(name = "DATE_CREATED")
    public Timestamp dateCreated;
    @Column(name = "DESCRIPTION")
    public String description;
    @Column(name = "IS_ACTIVE")
    public Boolean isActive;
    @Column(name = "EDUCATION")
    @Enumerated(EnumType.STRING)
    public Education education;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "ATTRIBUTES")
    public Map<String, List<String>> attributes;
    @Column(name = "EMAIL_VERIFIED")
    public Boolean emailVerified;
//    @JdbcTypeCode(SqlTypes.JSON)
//    public Set<Search> searches;

    public User() {

    }

    public User(Boolean isActive, Map<String, List<String>> attributes, Boolean emailVerified) {
        this.id = UUID.randomUUID();
        this.isActive = isActive;
        this.attributes = attributes;
        this.emailVerified = emailVerified;
    }


    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        User user = (User) o;
        return this.id != null && Objects.equals(this.id, user.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
