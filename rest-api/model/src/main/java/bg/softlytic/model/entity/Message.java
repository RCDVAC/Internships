package bg.softlytic.model.entity;

import bg.softlytic.model.enums.MessageStatus;
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
@Table(name = "MESSAGE", schema = "JOBS_PROJECT")
@Getter
@Setter
@ToString
public class Message {

    @Id
    public UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONVERSATION_ID", nullable = false)
    @ToString.Exclude
    public Conversation conversation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SENDER_USER_ID", nullable = false)
    @ToString.Exclude
    public User sender;

    @Column(name = "CONTENT", columnDefinition = "text")
    public String content;

    @Column(name = "STATUS", nullable = false)
    @Enumerated(EnumType.STRING)
    public MessageStatus status;

    @Column(name = "DATE_SENT", nullable = false)
    public Timestamp dateSent;

    @Column(name = "DATE_EDITED")
    public Timestamp dateEdited;

    @Column(name = "IS_DELETED", nullable = false)
    public Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REPLY_TO_MESSAGE_ID")
    @ToString.Exclude
    public Message replyTo;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL)
    @ToString.Exclude
    public Set<MessageAttachment> attachments = new HashSet<>();

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL)
    @ToString.Exclude
    public Set<MessageReadReceipt> readReceipts = new HashSet<>();

    public Message() {
        this.id = UUID.randomUUID();
        this.status = MessageStatus.SENT;
        this.isDeleted = false;
        this.dateSent = Timestamp.from(Instant.now());
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Message that = (Message) o;
        return this.id != null && Objects.equals(this.id, that.id);
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
