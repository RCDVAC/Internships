package bg.ivo.rest.config.filter;

import bg.ivo.rest.service.filter.strategy.FilterStrategy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Instance;
import jakarta.inject.Inject;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@ApplicationScoped
public class FilterRegistry {

    private final Map<String, FilterStrategy<?, ?>> filterStrategyMap;

    @Inject
    public FilterRegistry(Instance<FilterStrategy<?, ?>> strategies) {
        this.filterStrategyMap = strategies.stream()
                .collect(Collectors.toMap(FilterStrategy::getFilterName, Function.identity()));
    }

    public FilterStrategy<?, ?> getStrategy(String filterName) {
        return filterStrategyMap.get(filterName);
    }

}
