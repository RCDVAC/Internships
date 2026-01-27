package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.entity.*;
import bg.softlytic.rest.repository.*;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Mapper(componentModel = "cdi")
public abstract class ApplicationMapper {

    @Inject
    OrganizationRepository organizationRepository;

    @Inject
    UserRepository userRepository;

    @Inject
    JobOfferRepository jobOfferRepository;

    @Inject
    JobApplicationRepository jobApplicationRepository;

    @Inject
    DocumentRepository documentRepository;

    @Inject
    ConversationRepository conversationRepository;

    @Inject
    MessageRepository messageRepository;

    // ==================== TYPE CONVERSION METHODS ====================

    @Named("timestampToLocalDateTime")
    protected LocalDateTime timestampToLocalDateTime(Timestamp timestamp) {
        return timestamp != null ? timestamp.toLocalDateTime() : null;
    }

    @Named("timestampToLocalDate")
    protected LocalDate timestampToLocalDate(Timestamp timestamp) {
        return timestamp != null ? timestamp.toLocalDateTime().toLocalDate() : null;
    }

    // ==================== JOB OFFER MAPPINGS ====================

    @Mapping(target = "id", expression = "java(jobOffer.getId().toString())")
    @Mapping(target = "organizationId", expression = "java(jobOffer.getOrganization() != null ? jobOffer.getOrganization().getId().toString() : null)")
    @Mapping(target = "dateCreated", source = "dateCreated", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "dateModified", source = "dateModified", qualifiedByName = "timestampToLocalDateTime")
    public abstract JobOfferDTO toDto(JobOffer jobOffer);

    public Uni<JobOffer> toEntity(JobOfferDTO jobOfferDTO) {
        Uni<JobOffer> jobOfferUni = toBasicEntity(jobOfferDTO);
        if (jobOfferDTO.organizationId == null) {
            return jobOfferUni;
        }
        Uni<Organization> organizationUni = findOrganizationById(jobOfferDTO.getOrganizationId());
        return Uni.combine().all().unis(jobOfferUni, organizationUni).asTuple()
                .onItem().transformToUni((tuple) -> {
                    JobOffer jobOffer = tuple.getItem1();
                    Organization organization = tuple.getItem2();
                    jobOffer.setOrganization(organization);
                    return Uni.createFrom().item(jobOffer);
                });
    }

    public Uni<JobOffer> toBasicEntity(JobOfferDTO jobOfferDTO) {
        JobOffer jobOffer = new JobOffer();
        fillBasicJobOfferFields(jobOffer, jobOfferDTO);
        return Uni.createFrom().item(jobOffer);
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "organization", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "visited", ignore = true)
    @Mapping(target = "dateCreated", ignore = true)
    @Mapping(target = "dateModified", ignore = true)
    public abstract void fillBasicJobOfferFields(@MappingTarget JobOffer jobOffer, JobOfferDTO jobOfferDTO);

    public Uni<JobOffer> updateEntity(JobOffer existingJobOffer, JobOfferDTO jobOfferDTO) {
        fillBasicJobOfferFields(existingJobOffer, jobOfferDTO);
        existingJobOffer.setDateModified(Timestamp.from(Instant.now()));

        if (jobOfferDTO.getOrganizationId() != null) {
            return findOrganizationById(jobOfferDTO.getOrganizationId())
                    .onItem().transform(organization -> {
                        existingJobOffer.setOrganization(organization);
                        return existingJobOffer;
                    });
        }
        return Uni.createFrom().item(existingJobOffer);
    }

    // ==================== ORGANIZATION MAPPINGS ====================

    @Mapping(target = "id", expression = "java(organization.getId().toString())")
    @Mapping(target = "dateJoined", source = "dateJoined", qualifiedByName = "timestampToLocalDate")
    @Mapping(target = "jobsOfferIds", expression = "java(organization.getJobsOffers() != null ? organization.getJobsOffers().stream().map(j -> j.getId().toString()).collect(java.util.stream.Collectors.toSet()) : null)")
    public abstract OrganizationDTO toDto(Organization organization);

    public Uni<Organization> toBasicEntity(OrganizationDTO organizationDTO) {
        Organization organization = new Organization();
        fillBasicOrganizationFields(organization, organizationDTO);
        return Uni.createFrom().item(organization);
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "jobsOffers", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "dateJoined", ignore = true)
    public abstract void fillBasicOrganizationFields(@MappingTarget Organization organization, OrganizationDTO organizationDTO);

    public void updateEntity(Organization existingOrganization, OrganizationDTO organizationDTO) {
        fillBasicOrganizationFields(existingOrganization, organizationDTO);
    }

    // ==================== USER MAPPINGS ====================

    @Mapping(target = "id", expression = "java(user.getId().toString())")
    @Mapping(target = "date", source = "dateCreated", qualifiedByName = "timestampToLocalDate")
    @Mapping(target = "passwordHash", ignore = true)
    public abstract UserDTO toDto(User user);

    // ==================== ORGANIZATION ADMIN MAPPINGS ====================

    @Mapping(target = "id", expression = "java(admin.getId().toString())")
    @Mapping(target = "organizationId", expression = "java(admin.getOrganization() != null ? admin.getOrganization().getId().toString() : null)")
    @Mapping(target = "userId", expression = "java(admin.getUser() != null ? admin.getUser().getId().toString() : null)")
    @Mapping(target = "addedByUserId", expression = "java(admin.getAddedBy() != null ? admin.getAddedBy().getId().toString() : null)")
    @Mapping(target = "dateAdded", source = "dateAdded", qualifiedByName = "timestampToLocalDateTime")
    public abstract OrganizationAdminDTO toDto(OrganizationAdmin admin);

    public Uni<OrganizationAdmin> toEntity(OrganizationAdminDTO dto) {
        OrganizationAdmin admin = new OrganizationAdmin();
        admin.setRole(dto.getRole());
        admin.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);

        Uni<Organization> orgUni = dto.getOrganizationId() != null
                ? findOrganizationById(dto.getOrganizationId())
                : Uni.createFrom().nullItem();

        Uni<User> userUni = dto.getUserId() != null
                ? findUserById(dto.getUserId())
                : Uni.createFrom().nullItem();

        Uni<User> addedByUni = dto.getAddedByUserId() != null
                ? findUserById(dto.getAddedByUserId())
                : Uni.createFrom().nullItem();

        return Uni.combine().all().unis(orgUni, userUni, addedByUni).asTuple()
                .onItem().transform(tuple -> {
                    admin.setOrganization(tuple.getItem1());
                    admin.setUser(tuple.getItem2());
                    admin.setAddedBy(tuple.getItem3());
                    return admin;
                });
    }

    // ==================== DOCUMENT MAPPINGS ====================

    @Mapping(target = "id", expression = "java(document.getId().toString())")
    @Mapping(target = "userId", expression = "java(document.getUser() != null ? document.getUser().getId().toString() : null)")
    @Mapping(target = "dateUploaded", source = "dateUploaded", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "dateModified", source = "dateModified", qualifiedByName = "timestampToLocalDateTime")
    public abstract DocumentDTO toDto(Document document);

    public Uni<Document> toEntity(DocumentDTO dto) {
        Document document = new Document();
        fillBasicDocumentFields(document, dto);

        if (dto.getUserId() == null) {
            return Uni.createFrom().item(document);
        }

        return findUserById(dto.getUserId())
                .onItem().transform(user -> {
                    document.setUser(user);
                    return document;
                });
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "dateUploaded", ignore = true)
    @Mapping(target = "dateModified", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "isPrimary", ignore = true)
    public abstract void fillBasicDocumentFields(@MappingTarget Document document, DocumentDTO dto);

    // ==================== JOB APPLICATION MAPPINGS ====================

    @Mapping(target = "id", expression = "java(application.getId().toString())")
    @Mapping(target = "userId", expression = "java(application.getUser() != null ? application.getUser().getId().toString() : null)")
    @Mapping(target = "jobOfferId", expression = "java(application.getJobOffer() != null ? application.getJobOffer().getId().toString() : null)")
    @Mapping(target = "dateApplied", source = "dateApplied", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "dateModified", source = "dateModified", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "documentIds", expression = "java(application.getDocuments() != null ? application.getDocuments().stream().map(d -> d.getDocument().getId().toString()).collect(java.util.stream.Collectors.toSet()) : null)")
    public abstract JobApplicationDTO toDto(JobApplication application);

    public Uni<JobApplication> toEntity(JobApplicationDTO dto) {
        JobApplication application = new JobApplication();
        fillBasicJobApplicationFields(application, dto);

        Uni<User> userUni = dto.getUserId() != null
                ? findUserById(dto.getUserId())
                : Uni.createFrom().nullItem();

        Uni<JobOffer> jobOfferUni = dto.getJobOfferId() != null
                ? findJobOfferById(dto.getJobOfferId())
                : Uni.createFrom().nullItem();

        return Uni.combine().all().unis(userUni, jobOfferUni).asTuple()
                .onItem().transform(tuple -> {
                    application.setUser(tuple.getItem1());
                    application.setJobOffer(tuple.getItem2());
                    return application;
                });
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "jobOffer", ignore = true)
    @Mapping(target = "dateApplied", ignore = true)
    @Mapping(target = "dateModified", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "statusHistory", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "conversations", ignore = true)
    public abstract void fillBasicJobApplicationFields(@MappingTarget JobApplication application, JobApplicationDTO dto);

    public Uni<JobApplication> updateEntity(JobApplication existing, JobApplicationDTO dto) {
        fillBasicJobApplicationFields(existing, dto);
        existing.setDateModified(Timestamp.from(Instant.now()));
        return Uni.createFrom().item(existing);
    }

    // ==================== APPLICATION STATUS HISTORY MAPPINGS ====================

    @Mapping(target = "id", expression = "java(history.getId().toString())")
    @Mapping(target = "applicationId", expression = "java(history.getApplication() != null ? history.getApplication().getId().toString() : null)")
    @Mapping(target = "changedByUserId", expression = "java(history.getChangedBy() != null ? history.getChangedBy().getId().toString() : null)")
    @Mapping(target = "dateChanged", source = "dateChanged", qualifiedByName = "timestampToLocalDateTime")
    public abstract ApplicationStatusHistoryDTO toDto(ApplicationStatusHistory history);

    public Uni<ApplicationStatusHistory> toEntity(ApplicationStatusHistoryDTO dto, JobApplication application, User changedBy) {
        ApplicationStatusHistory history = new ApplicationStatusHistory();
        history.setApplication(application);
        history.setPreviousStatus(dto.getPreviousStatus());
        history.setNewStatus(dto.getNewStatus());
        history.setChangedBy(changedBy);
        history.setNotes(dto.getNotes());
        return Uni.createFrom().item(history);
    }

    // ==================== APPLICATION DOCUMENT MAPPINGS ====================

    @Mapping(target = "id", expression = "java(appDoc.getId().toString())")
    @Mapping(target = "applicationId", expression = "java(appDoc.getApplication() != null ? appDoc.getApplication().getId().toString() : null)")
    @Mapping(target = "documentId", expression = "java(appDoc.getDocument() != null ? appDoc.getDocument().getId().toString() : null)")
    @Mapping(target = "dateAttached", source = "dateAttached", qualifiedByName = "timestampToLocalDateTime")
    public abstract ApplicationDocumentDTO toDto(ApplicationDocument appDoc);

    // ==================== SAVED JOB OFFER MAPPINGS ====================

    @Mapping(target = "id", expression = "java(saved.getId().toString())")
    @Mapping(target = "userId", expression = "java(saved.getUser() != null ? saved.getUser().getId().toString() : null)")
    @Mapping(target = "jobOfferId", expression = "java(saved.getJobOffer() != null ? saved.getJobOffer().getId().toString() : null)")
    @Mapping(target = "dateSaved", source = "dateSaved", qualifiedByName = "timestampToLocalDateTime")
    public abstract SavedJobOfferDTO toDto(SavedJobOffer saved);

    public Uni<SavedJobOffer> toEntity(SavedJobOfferDTO dto) {
        SavedJobOffer saved = new SavedJobOffer();
        saved.setNotes(dto.getNotes());

        Uni<User> userUni = dto.getUserId() != null
                ? findUserById(dto.getUserId())
                : Uni.createFrom().nullItem();

        Uni<JobOffer> jobOfferUni = dto.getJobOfferId() != null
                ? findJobOfferById(dto.getJobOfferId())
                : Uni.createFrom().nullItem();

        return Uni.combine().all().unis(userUni, jobOfferUni).asTuple()
                .onItem().transform(tuple -> {
                    saved.setUser(tuple.getItem1());
                    saved.setJobOffer(tuple.getItem2());
                    return saved;
                });
    }

    // ==================== CONVERSATION MAPPINGS ====================

    @Mapping(target = "id", expression = "java(conversation.getId().toString())")
    @Mapping(target = "applicationId", expression = "java(conversation.getApplication() != null ? conversation.getApplication().getId().toString() : null)")
    @Mapping(target = "dateCreated", source = "dateCreated", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "dateLastMessage", source = "dateLastMessage", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "participantIds", expression = "java(conversation.getParticipants() != null ? conversation.getParticipants().stream().map(p -> p.getUser().getId().toString()).collect(java.util.stream.Collectors.toSet()) : null)")
    public abstract ConversationDTO toDto(Conversation conversation);

    public Uni<Conversation> toEntity(ConversationDTO dto) {
        Conversation conversation = new Conversation();
        conversation.setTitle(dto.getTitle());
        conversation.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);

        if (dto.getApplicationId() == null) {
            return Uni.createFrom().item(conversation);
        }

        return findJobApplicationById(dto.getApplicationId())
                .onItem().transform(application -> {
                    conversation.setApplication(application);
                    return conversation;
                });
    }

    // ==================== CONVERSATION PARTICIPANT MAPPINGS ====================

    @Mapping(target = "id", expression = "java(participant.getId().toString())")
    @Mapping(target = "conversationId", expression = "java(participant.getConversation() != null ? participant.getConversation().getId().toString() : null)")
    @Mapping(target = "userId", expression = "java(participant.getUser() != null ? participant.getUser().getId().toString() : null)")
    @Mapping(target = "dateJoined", source = "dateJoined", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "dateLastRead", source = "dateLastRead", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "typingUpdatedAt", source = "typingUpdatedAt", qualifiedByName = "timestampToLocalDateTime")
    public abstract ConversationParticipantDTO toDto(ConversationParticipant participant);

    public Uni<ConversationParticipant> toEntity(ConversationParticipantDTO dto, Conversation conversation) {
        ConversationParticipant participant = new ConversationParticipant();
        participant.setConversation(conversation);
        participant.setIsTyping(dto.getIsTyping() != null ? dto.getIsTyping() : false);
        participant.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);

        if (dto.getUserId() == null) {
            return Uni.createFrom().item(participant);
        }

        return findUserById(dto.getUserId())
                .onItem().transform(user -> {
                    participant.setUser(user);
                    return participant;
                });
    }

    // ==================== MESSAGE MAPPINGS ====================

    @Mapping(target = "id", expression = "java(message.getId().toString())")
    @Mapping(target = "conversationId", expression = "java(message.getConversation() != null ? message.getConversation().getId().toString() : null)")
    @Mapping(target = "senderUserId", expression = "java(message.getSender() != null ? message.getSender().getId().toString() : null)")
    @Mapping(target = "dateSent", source = "dateSent", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "dateEdited", source = "dateEdited", qualifiedByName = "timestampToLocalDateTime")
    @Mapping(target = "replyToMessageId", expression = "java(message.getReplyTo() != null ? message.getReplyTo().getId().toString() : null)")
    @Mapping(target = "attachmentIds", expression = "java(message.getAttachments() != null ? message.getAttachments().stream().map(a -> a.getId().toString()).collect(java.util.stream.Collectors.toSet()) : null)")
    public abstract MessageDTO toDto(Message message);

    public Uni<Message> toEntity(MessageDTO dto, Conversation conversation, User sender) {
        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setContent(dto.getContent());
        message.setStatus(dto.getStatus() != null ? dto.getStatus() : bg.softlytic.model.enums.MessageStatus.SENT);
        message.setIsDeleted(dto.getIsDeleted() != null ? dto.getIsDeleted() : false);

        if (dto.getReplyToMessageId() != null) {
            return findMessageById(dto.getReplyToMessageId())
                    .onItem().transform(replyTo -> {
                        message.setReplyTo(replyTo);
                        return message;
                    });
        }

        return Uni.createFrom().item(message);
    }

    // ==================== MESSAGE ATTACHMENT MAPPINGS ====================

    @Mapping(target = "id", expression = "java(attachment.getId().toString())")
    @Mapping(target = "messageId", expression = "java(attachment.getMessage() != null ? attachment.getMessage().getId().toString() : null)")
    @Mapping(target = "dateUploaded", source = "dateUploaded", qualifiedByName = "timestampToLocalDateTime")
    public abstract MessageAttachmentDTO toDto(MessageAttachment attachment);

    public MessageAttachment toEntity(MessageAttachmentDTO dto, Message message) {
        MessageAttachment attachment = new MessageAttachment();
        attachment.setMessage(message);
        attachment.setFileName(dto.getFileName());
        attachment.setFilePath(dto.getFilePath());
        attachment.setFileSize(dto.getFileSize());
        attachment.setMimeType(dto.getMimeType());
        return attachment;
    }

    // ==================== FILTER OPTION MAPPINGS ====================

    @Mapping(target = "id", expression = "java(filterOption.getId().toString())")
    public abstract FilterOptionDto toDto(FilterOption filterOption);

    // ==================== HELPER METHODS ====================

    private Uni<Organization> findOrganizationById(String id) {
        UUID uuid = UUID.fromString(id);
        return organizationRepository.findById(uuid);
    }

    private Uni<User> findUserById(String id) {
        UUID uuid = UUID.fromString(id);
        return userRepository.findById(uuid);
    }

    private Uni<JobOffer> findJobOfferById(String id) {
        UUID uuid = UUID.fromString(id);
        return jobOfferRepository.findById(uuid);
    }

    private Uni<JobApplication> findJobApplicationById(String id) {
        UUID uuid = UUID.fromString(id);
        return jobApplicationRepository.findById(uuid);
    }

    private Uni<Document> findDocumentById(String id) {
        UUID uuid = UUID.fromString(id);
        return documentRepository.findById(uuid);
    }

    private Uni<Conversation> findConversationById(String id) {
        UUID uuid = UUID.fromString(id);
        return conversationRepository.findById(uuid);
    }

    private Uni<Message> findMessageById(String id) {
        UUID uuid = UUID.fromString(id);
        return messageRepository.findById(uuid);
    }

}
