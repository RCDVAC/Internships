package bg.softlytic.rest.repository;

import bg.softlytic.model.entity.Organization;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.UUID;

@ApplicationScoped
public class OrganizationRepository implements PanacheRepositoryBase<Organization, UUID> {
}
