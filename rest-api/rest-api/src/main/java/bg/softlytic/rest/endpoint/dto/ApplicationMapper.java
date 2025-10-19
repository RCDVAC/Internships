package bg.softlytic.rest.endpoint.dto;

import bg.softlytic.model.entity.JobOffer;
import bg.softlytic.model.entity.Organization;
import bg.softlytic.rest.repository.OrganizationRepository;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.UUID;

@Slf4j
@Mapper(componentModel = "cdi")
public abstract class ApplicationMapper {

    @Inject
    OrganizationRepository organizationRepository;

    // TO DTO MAPPINGS

    @Mapping(target = "id", expression = "java(jobOffer.id.toString())")
    @Mapping(target = "organizationId", expression = "java(jobOffer.organization.id.toString())")
    public abstract JobOfferDTO toDto(JobOffer jobOffer);

    @Mapping(target = "id", expression = "java(organization.id.toString())")
    public abstract OrganizationDTO toDto(Organization organization);

    // TO ENTITY MAPPINGS

    public Uni<JobOffer> toEntity(JobOfferDTO jobOfferDTO) {
        Uni<JobOffer> jobOfferUni = toBasicEntity(jobOfferDTO);
        if (jobOfferDTO.organizationId == null) {
            return jobOfferUni;
        }
        Uni<Organization> organizationUni = findEntityById(jobOfferDTO.getOrganizationId());
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

    public Uni<Organization> toBasicEntity(OrganizationDTO organizationDTO) {
        Organization organization = new Organization();

        fillBasicOrganizationFields(organization, organizationDTO);

        return Uni.createFrom().item(organization);
    }

    private Uni<Organization> findEntityById(String id) {
        UUID uuid = UUID.fromString(id);
        return organizationRepository.findById(uuid);
    }

    // BASIC FIELD MAPPINGS

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "organization", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "dateCreated", ignore = true)
    @Mapping(target = "dateModified", ignore = true)
    public abstract void fillBasicJobOfferFields(@MappingTarget JobOffer jobOffer, JobOfferDTO jobOfferDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "jobsOffers", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "dateJoined", ignore = true)
    public abstract void fillBasicOrganizationFields(@MappingTarget Organization organization, OrganizationDTO organizationDTO);

}
