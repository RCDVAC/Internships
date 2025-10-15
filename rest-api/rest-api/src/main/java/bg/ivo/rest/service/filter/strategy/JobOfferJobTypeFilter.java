package bg.ivo.rest.service.filter.strategy;

import bg.ivo.model.entity.JobOffer;
import bg.ivo.model.enums.JobType;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@ApplicationScoped
public class JobOfferJobTypeFilter extends JobOfferFilterStrategy<JobType> {
    @Override
    public String getFilterName() {
        return "JOB_OFFER__JOB_TYPE";
    }

    @Override
    public Predicate apply(Root<JobOffer> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder, JobType value) {
        return criteriaBuilder.equal(root.get("jobType"), value);
    }
}
