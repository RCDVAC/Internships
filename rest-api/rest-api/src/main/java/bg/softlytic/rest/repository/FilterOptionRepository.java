package bg.softlytic.rest.repository;

import bg.softlytic.model.entity.FilterOption;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;

import java.util.UUID;

public class FilterOptionRepository implements PanacheRepositoryBase<FilterOption, UUID> {
}
