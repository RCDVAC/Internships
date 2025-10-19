package bg.softlytic.model.entity;

import jakarta.persistence.*;
import lombok.ToString;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "FILTER_OPTION", schema = "JOBS_PROJECT")
public class FilterOption {

    @Id
    @Column(name = "ID")
    public UUID id;

    @Column(name = "NAME")
    public String name;

    @Column(name = "TYPE")
    public String type;

    @Column(name = "PRESENTABLE_NAME")
    public String presentableName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_FILTER_OPTION_ID")
    @ToString.Exclude
    public FilterOption parentFilter;

    @ManyToMany()
    @ToString.Exclude
    public Set<JobOffer> jobOffers;


}
