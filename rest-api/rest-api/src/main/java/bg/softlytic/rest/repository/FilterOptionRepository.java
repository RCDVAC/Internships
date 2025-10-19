package bg.softlytic.rest.repository;

import bg.softlytic.model.entity.FilterOption;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.UUID;

@ApplicationScoped
public class FilterOptionRepository implements PanacheRepositoryBase<FilterOption, UUID> {
}
