package bg.softlytic.rest.service;

import bg.softlytic.exception.OrganizationNotFoundException;
import bg.softlytic.model.entity.Organization;
import bg.softlytic.rest.endpoint.dto.ApplicationMapper;
import bg.softlytic.rest.endpoint.dto.OrganizationDTO;
import bg.softlytic.rest.repository.OrganizationRepository;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.reactive.mutiny.Mutiny;

import java.util.List;
import java.util.UUID;

@Slf4j
@ApplicationScoped
public class OrganizationService {

    @Inject
    OrganizationRepository organizationRepository;
    @Inject
    ApplicationMapper applicationMapper;

    @WithTransaction
    public Uni<Organization> findById(UUID uuid) {
        return organizationRepository.findById(uuid)
                .onItem().ifNull().failWith(() -> {
                    log.error("Organization with id: {}, not found", uuid);
                    return new OrganizationNotFoundException("Organization with id " + uuid + " not found");
                })
                .onItem().call(org -> Mutiny.fetch(org.getJobsOffers()));
    }

    @WithTransaction
    public Uni<List<Organization>> findAll() {
        return organizationRepository.listAll()
                .onItem().call(orgs -> {
                    // Fetch jobsOffers for each organization
                    List<Uni<Void>> fetches = orgs.stream()
                            .map(org -> Mutiny.fetch(org.getJobsOffers()).replaceWithVoid())
                            .toList();
                    return Uni.join().all(fetches).andFailFast().replaceWithVoid();
                });
    }

    @WithTransaction
    public Uni<Organization> create(OrganizationDTO organizationDTO) {
        return applicationMapper.toBasicEntity(organizationDTO)
                .onItem().transformToUni(organization -> organizationRepository.persist(organization));
    }

    @WithTransaction
    public Uni<Organization> update(UUID uuid, OrganizationDTO organizationDTO) {
        return organizationRepository.findById(uuid)
                .onItem().ifNull().failWith(() -> {
                    log.error("Organization with id: {}, not found for update", uuid);
                    return new OrganizationNotFoundException("Organization with id " + uuid + " not found");
                })
                .onItem().transform(existingOrganization -> {
                    applicationMapper.updateEntity(existingOrganization, organizationDTO);
                    return existingOrganization;
                })
                .onItem().transformToUni(updatedOrganization ->
                        organizationRepository.persist(updatedOrganization))
                .onItem().call(org -> Mutiny.fetch(org.getJobsOffers()));
    }

    @WithTransaction
    public Uni<Boolean> delete(UUID uuid) {
        return organizationRepository.findById(uuid)
                .onItem().ifNull().failWith(() -> {
                    log.error("Organization with id: {}, not found for deletion", uuid);
                    return new OrganizationNotFoundException("Organization with id " + uuid + " not found");
                })
                .onItem().transformToUni(organization -> organizationRepository.delete(organization))
                .onItem().transform(ignored -> true);
    }

}
