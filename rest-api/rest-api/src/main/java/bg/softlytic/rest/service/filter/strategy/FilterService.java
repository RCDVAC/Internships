package bg.softlytic.rest.service.filter.strategy;

import bg.softlytic.rest.config.filter.FilterRegistry;
import bg.softlytic.rest.service.filter.FilterParameter;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
@Slf4j
public class FilterService {

    @Inject
    FilterRegistry filterRegistry;

    public <E> Uni<CriteriaQuery<E>> filter(Class<E> entity, List<FilterParameter> filterParams) {
        return Panache.withSession(() -> {
            return Panache.getSession().onItem().transform(session -> {
                CriteriaBuilder cb = session.getFactory().getCriteriaBuilder();
                CriteriaQuery<E> query = cb.createQuery(entity);
                Root<E> root = query.from(entity);

                List<Predicate> predicates = new ArrayList<>();
                for (FilterParameter filterParameter : filterParams) {
                    FilterStrategy<?, ?> genericStrategy = filterRegistry.getStrategy(filterParameter.getName());

                    if (genericStrategy != null) {
                        try {
                            @SuppressWarnings("unchecked")
                            FilterStrategy<E, Object> strategy = (FilterStrategy<E, Object>) genericStrategy;
                            predicates.add(strategy.apply(root, query, cb, filterParameter.getValue()));
                        } catch (ClassCastException e) {
                            log.error("Bad filter cast! Error: {}", e.getMessage());
                        }

                    }
                }

                query.select(root).where(cb.and(predicates.toArray(new Predicate[0])));
                return query;
            });
        });
    }

}
