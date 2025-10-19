package bg.softlytic.rest.service.filter.strategy;

import bg.softlytic.model.entity.JobOffer;
import bg.softlytic.model.enums.WorkType;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@ApplicationScoped
public class JobOfferWorkTypeFilter extends JobOfferFilterStrategy<WorkType> {
    @Override
    public String getName() {
        return "JOB_OFFER__WORK_TYPE";
    }

    @Override
    public Predicate apply(Root<JobOffer> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder, WorkType value) {
        return criteriaBuilder.equal(root.get("workType"), value);
    }
}
