package bg.softlytic.model.entity;

import bg.softlytic.model.enums.DocumentType;
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
@Table(name = "DOCUMENT", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class Document {

    @Id
    public UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    @ToString.Exclude
    public User user;

    @Column(name = "FILE_NAME", nullable = false)
    public String fileName;

    @Column(name = "ORIGINAL_FILE_NAME", nullable = false)
    public String originalFileName;

    @Column(name = "FILE_PATH", nullable = false)
    public String filePath;

    @Column(name = "FILE_SIZE", nullable = false)
    public Long fileSize;

    @Column(name = "MIME_TYPE", nullable = false)
    public String mimeType;

    @Column(name = "DOCUMENT_TYPE", nullable = false)
    @Enumerated(EnumType.STRING)
    public DocumentType documentType;

    @Column(name = "DESCRIPTION")
    public String description;

    @Column(name = "DATE_UPLOADED", nullable = false)
    public Timestamp dateUploaded;

    @Column(name = "DATE_MODIFIED", nullable = false)
    public Timestamp dateModified;

    @Column(name = "IS_ACTIVE", nullable = false)
    public Boolean isActive;

    @Column(name = "IS_PRIMARY", nullable = false)
    public Boolean isPrimary;

    public Document() {
        this.id = UUID.randomUUID();
        this.isActive = true;
        this.isPrimary = false;
        this.dateUploaded = Timestamp.from(Instant.now());
        this.dateModified = Timestamp.from(Instant.now());
    }

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
