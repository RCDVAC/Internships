package bg.softlytic.rest.config.filter;

import bg.softlytic.exception.FilterStrategyNotFoundException;
import bg.softlytic.rest.repository.FilterOptionRepository;
import bg.softlytic.rest.service.filter.strategy.FilterStrategy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Instance;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@ApplicationScoped
public class FilterStrategyRegistry {

    @Inject
    FilterOptionRepository filterOptionRepository;

    private final List<FilterStrategy<?, ?>> filterStrategies;

    @Inject
    public FilterStrategyRegistry(Instance<FilterStrategy<?, ?>> strategies) {
        this.filterStrategies = strategies.stream().toList();

        // TODO: Get filter options from FILTER_OPTION table and save them to filterStrategyMap
    }

    public List<FilterStrategy<?, ?>> listAll(){
        return filterStrategies;
    }

    public FilterStrategy<?, ?> getByName(String filterName) {
        Optional<FilterStrategy<?, ?>> foundStrategy = filterStrategies
                .stream()
                .filter((filterStrategy -> filterStrategy.getName().equals(filterName)))
                .findFirst();

        return foundStrategy
                .orElseThrow(FilterStrategyNotFoundException::new);
    }

}
