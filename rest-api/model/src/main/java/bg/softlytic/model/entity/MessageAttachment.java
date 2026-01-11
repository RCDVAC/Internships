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
@Table(name = "MESSAGE_ATTACHMENT", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class MessageAttachment {

    @Id
    public UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MESSAGE_ID", nullable = false)
    @ToString.Exclude
    public Message message;

    @Column(name = "FILE_NAME", nullable = false)
    public String fileName;

    @Column(name = "FILE_PATH", nullable = false)
    public String filePath;

    @Column(name = "FILE_SIZE", nullable = false)
    public Long fileSize;

    @Column(name = "MIME_TYPE", nullable = false)
    public String mimeType;

    @Column(name = "DATE_UPLOADED", nullable = false)
    public Timestamp dateUploaded;

    public MessageAttachment() {
        this.id = UUID.randomUUID();
        this.dateUploaded = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        MessageAttachment that = (MessageAttachment) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
