package bg.softlytic.rest.config.filter;

import bg.softlytic.rest.service.filter.strategy.FilterStrategy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Instance;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@ApplicationScoped
public class FilterStrategyRegistry {

    private final Map<String, FilterStrategy<?, ?>> filterStrategyMap;

    @Inject
    public FilterStrategyRegistry(Instance<FilterStrategy<?, ?>> strategies) {
        this.filterStrategyMap = strategies.stream()
                .collect(Collectors.toMap(FilterStrategy::getName, Function.identity()));
    }

    public List<FilterStrategy<?, ?>> listAll(){

    }

    public FilterStrategy<?, ?> getByName(String filterName) {
        return filterStrategyMap.get(filterName);
    }

}
