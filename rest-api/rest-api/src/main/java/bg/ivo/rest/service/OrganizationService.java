package bg.ivo.rest.service;

import bg.ivo.model.entity.Organization;
import bg.ivo.rest.endpoint.dto.ApplicationMapper;
import bg.ivo.rest.endpoint.dto.OrganizationDTO;
import bg.ivo.rest.repository.OrganizationRepository;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

@Slf4j
@ApplicationScoped
public class OrganizationService {

    @Inject
    OrganizationRepository organizationRepository;
    @Inject
    ApplicationMapper applicationMapper;

    @WithTransaction
    public Uni<Organization> getById(UUID uuid) {
        return organizationRepository.findById(uuid);
//                .orElseThrow(() -> {
//            log.error("Organization with id: {}, not found", uuid);
//            return new OrganizationNotFoundException();
//        });
    }

    @WithTransaction
    public Uni<Organization> createOrganization(OrganizationDTO organizationDTO) {
        Uni<Organization> organizationUni = applicationMapper.toBasicEntity(organizationDTO);
        return organizationUni.onItem().transformToUni((organization -> organizationRepository.persist(organization)));
    }

}
