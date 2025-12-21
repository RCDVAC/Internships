package bg.softlytic.rest.service.filter.strategy;

import bg.softlytic.model.entity.JobOffer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@ApplicationScoped
public class JobOfferSalaryFilter extends JobOfferFilterStrategy<Integer> {
    @Override
    public String getFilterName() {
        return "JOB_OFFER__SALARY";
    }

    @Override
    public Predicate apply(Root<JobOffer> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder, Integer value) {
        return criteriaBuilder.gt(root.get("minSalary"), value);
    }
}
