package bg.softlytic.rest.repository;

import bg.softlytic.model.entity.OrganizationAdmin;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class OrganizationAdminRepository implements PanacheRepositoryBase<OrganizationAdmin, UUID> {

    public Uni<List<OrganizationAdmin>> findByOrganizationId(UUID organizationId) {
        return list("organization.id", organizationId);
    }

    public Uni<List<OrganizationAdmin>> findByUserId(UUID userId) {
        return list("user.id", userId);
    }

    public Uni<OrganizationAdmin> findByOrganizationAndUser(UUID organizationId, UUID userId) {
        return find("organization.id = ?1 and user.id = ?2", organizationId, userId).firstResult();
    }

}
