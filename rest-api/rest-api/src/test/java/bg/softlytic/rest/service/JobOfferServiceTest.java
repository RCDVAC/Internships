package bg.softlytic.rest.service;

import bg.softlytic.exception.JobOfferNotFoundException;
import bg.softlytic.model.entity.JobOffer;
import bg.softlytic.model.entity.Organization;
import bg.softlytic.rest.endpoint.dto.ApplicationMapper;
import bg.softlytic.rest.endpoint.dto.JobOfferDTO;
import bg.softlytic.rest.model.FilterParameter;
import bg.softlytic.rest.repository.JobOfferRepository;
import bg.softlytic.rest.service.filter.FilterService;
import bg.softlytic.rest.testutil.TestDataBuilder;
import bg.softlytic.rest.testutil.UniAssertions;
import io.smallrye.mutiny.Uni;
import jakarta.persistence.criteria.CriteriaQuery;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("JobOfferService Unit Tests")
class JobOfferServiceTest {

    @Mock
    private JobOfferRepository jobOfferRepository;

    @Mock
    private ApplicationMapper applicationMapper;

    @Mock
    private FilterService filterService;

    @InjectMocks
    private JobOfferService jobOfferService;

    private Organization testOrganization;
    private JobOffer testJobOffer;
    private JobOfferDTO testJobOfferDTO;

    @BeforeEach
    void setUp() {
        testOrganization = TestDataBuilder.createOrganization();
        testJobOffer = TestDataBuilder.createJobOffer(testOrganization);
        testJobOfferDTO = TestDataBuilder.createJobOfferDTO(testOrganization.getId().toString());
    }

    // ==================== findById Tests ====================

    @Nested
    @DisplayName("findById")
    class FindById {

        @Test
        @DisplayName("Should return job offer when found")
        void shouldReturnJobOfferWhenFound() {
            UUID jobId = testJobOffer.getId();
            when(jobOfferRepository.findById(jobId)).thenReturn(Uni.createFrom().item(testJobOffer));

            Uni<JobOffer> result = jobOfferService.findById(jobId);

            UniAssertions.awaitAndAssert(result, jobOffer -> {
                assertThat(jobOffer).isNotNull();
                assertThat(jobOffer.getId()).isEqualTo(jobId);
                assertThat(jobOffer.getDescription()).isEqualTo(testJobOffer.getDescription());
            });

            verify(jobOfferRepository).findById(jobId);
        }

        @Test
        @DisplayName("Should throw JobOfferNotFoundException when not found")
        void shouldThrowExceptionWhenNotFound() {
            UUID jobId = UUID.randomUUID();
            when(jobOfferRepository.findById(jobId)).thenReturn(Uni.createFrom().nullItem());

            Uni<JobOffer> result = jobOfferService.findById(jobId);

            UniAssertions.assertFailsWith(result, JobOfferNotFoundException.class);
            verify(jobOfferRepository).findById(jobId);
        }

        @Test
        @DisplayName("Should include job ID in exception message")
        void shouldIncludeJobIdInExceptionMessage() {
            UUID jobId = UUID.randomUUID();
            when(jobOfferRepository.findById(jobId)).thenReturn(Uni.createFrom().nullItem());

            Uni<JobOffer> result = jobOfferService.findById(jobId);

            UniAssertions.assertFailsWithMessage(result, JobOfferNotFoundException.class, jobId.toString());
        }
    }

    // ==================== listAll Tests ====================

    @Nested
    @DisplayName("listAll")
    class ListAll {

        @Test
        @DisplayName("Should return all job offers")
        void shouldReturnAllJobOffers() {
            List<JobOffer> jobOffers = List.of(testJobOffer);
            when(jobOfferRepository.listAll()).thenReturn(Uni.createFrom().item(jobOffers));

            Uni<List<JobOffer>> result = jobOfferService.listAll();

            UniAssertions.awaitAndAssert(result, offers -> {
                assertThat(offers).hasSize(1);
                assertThat(offers.get(0).getId()).isEqualTo(testJobOffer.getId());
            });
        }

        @Test
        @DisplayName("Should return empty list when no job offers")
        void shouldReturnEmptyListWhenNoJobOffers() {
            when(jobOfferRepository.listAll()).thenReturn(Uni.createFrom().item(Collections.emptyList()));

            Uni<List<JobOffer>> result = jobOfferService.listAll();

            UniAssertions.awaitAndAssert(result, offers -> {
                assertThat(offers).isEmpty();
            });
        }
    }

    // ==================== create Tests ====================

    @Nested
    @DisplayName("create")
    class Create {

        @Test
        @DisplayName("Should create and persist job offer")
        void shouldCreateAndPersistJobOffer() {
            when(applicationMapper.toEntity(testJobOfferDTO))
                    .thenReturn(Uni.createFrom().item(testJobOffer));
            when(jobOfferRepository.persist(testJobOffer))
                    .thenReturn(Uni.createFrom().item(testJobOffer));

            Uni<JobOffer> result = jobOfferService.create(testJobOfferDTO);

            UniAssertions.awaitAndAssert(result, created -> {
                assertThat(created).isNotNull();
                assertThat(created.getId()).isEqualTo(testJobOffer.getId());
            });

            verify(applicationMapper).toEntity(testJobOfferDTO);
            verify(jobOfferRepository).persist(testJobOffer);
        }

        @Test
        @DisplayName("Should chain mapper and repository calls correctly")
        void shouldChainMapperAndRepositoryCalls() {
            when(applicationMapper.toEntity(testJobOfferDTO))
                    .thenReturn(Uni.createFrom().item(testJobOffer));
            when(jobOfferRepository.persist(any(JobOffer.class)))
                    .thenReturn(Uni.createFrom().item(testJobOffer));

            Uni<JobOffer> result = jobOfferService.create(testJobOfferDTO);
            UniAssertions.awaitItem(result);

            // Verify order of operations
            var inOrder = inOrder(applicationMapper, jobOfferRepository);
            inOrder.verify(applicationMapper).toEntity(testJobOfferDTO);
            inOrder.verify(jobOfferRepository).persist(testJobOffer);
        }
    }

    // ==================== update Tests ====================

    @Nested
    @DisplayName("update")
    class Update {

        @Test
        @DisplayName("Should update existing job offer")
        void shouldUpdateExistingJobOffer() {
            UUID jobId = testJobOffer.getId();

            when(jobOfferRepository.findById(jobId))
                    .thenReturn(Uni.createFrom().item(testJobOffer));
            when(applicationMapper.updateEntity(testJobOffer, testJobOfferDTO))
                    .thenReturn(Uni.createFrom().item(testJobOffer));
            when(jobOfferRepository.persist(testJobOffer))
                    .thenReturn(Uni.createFrom().item(testJobOffer));

            Uni<JobOffer> result = jobOfferService.update(jobId, testJobOfferDTO);

            UniAssertions.awaitAndAssert(result, updated -> {
                assertThat(updated).isNotNull();
            });

            verify(jobOfferRepository).findById(jobId);
            verify(applicationMapper).updateEntity(testJobOffer, testJobOfferDTO);
            verify(jobOfferRepository).persist(testJobOffer);
        }

        @Test
        @DisplayName("Should throw exception when updating non-existent job offer")
        void shouldThrowExceptionWhenUpdatingNonExistent() {
            UUID jobId = UUID.randomUUID();
            when(jobOfferRepository.findById(jobId)).thenReturn(Uni.createFrom().nullItem());

            Uni<JobOffer> result = jobOfferService.update(jobId, testJobOfferDTO);

            UniAssertions.assertFailsWith(result, JobOfferNotFoundException.class);
            verify(jobOfferRepository).findById(jobId);
            verify(applicationMapper, never()).updateEntity(any(JobOffer.class), any(JobOfferDTO.class));
        }

        @Test
        @DisplayName("Should not persist if job offer not found")
        void shouldNotPersistIfNotFound() {
            UUID jobId = UUID.randomUUID();
            when(jobOfferRepository.findById(jobId)).thenReturn(Uni.createFrom().nullItem());

            Uni<JobOffer> result = jobOfferService.update(jobId, testJobOfferDTO);

            UniAssertions.assertFailsWith(result, JobOfferNotFoundException.class);
            verify(jobOfferRepository, never()).persist(any(JobOffer.class));
        }
    }

    // ==================== delete Tests ====================

    @Nested
    @DisplayName("delete")
    class Delete {

        @Test
        @DisplayName("Should delete existing job offer")
        void shouldDeleteExistingJobOffer() {
            UUID jobId = testJobOffer.getId();

            when(jobOfferRepository.findById(jobId))
                    .thenReturn(Uni.createFrom().item(testJobOffer));
            when(jobOfferRepository.delete(testJobOffer))
                    .thenReturn(Uni.createFrom().voidItem());

            Uni<Boolean> result = jobOfferService.delete(jobId);

            UniAssertions.awaitAndAssert(result, deleted -> {
                assertThat(deleted).isTrue();
            });

            verify(jobOfferRepository).findById(jobId);
            verify(jobOfferRepository).delete(testJobOffer);
        }

        @Test
        @DisplayName("Should throw exception when deleting non-existent job offer")
        void shouldThrowExceptionWhenDeletingNonExistent() {
            UUID jobId = UUID.randomUUID();
            when(jobOfferRepository.findById(jobId)).thenReturn(Uni.createFrom().nullItem());

            Uni<Boolean> result = jobOfferService.delete(jobId);

            UniAssertions.assertFailsWith(result, JobOfferNotFoundException.class);
            verify(jobOfferRepository).findById(jobId);
            verify(jobOfferRepository, never()).delete(any());
        }
    }

    // ==================== filter Tests ====================

    @Nested
    @DisplayName("filter")
    class Filter {

        @Test
        @DisplayName("Should filter job offers using FilterService")
        @SuppressWarnings("unchecked")
        void shouldFilterJobOffersUsingFilterService() {
            List<FilterParameter> params = List.of(new FilterParameter("type", "name", "value"));
            CriteriaQuery<JobOffer> mockQuery = mock(CriteriaQuery.class);
            List<JobOffer> filteredResults = List.of(testJobOffer);

            when(filterService.filter(JobOffer.class, params))
                    .thenReturn(Uni.createFrom().item(mockQuery));
            when(jobOfferRepository.filterJobs(mockQuery))
                    .thenReturn(Uni.createFrom().item(filteredResults));

            Uni<List<JobOffer>> result = jobOfferService.filter(params);

            UniAssertions.awaitAndAssert(result, jobs -> {
                assertThat(jobs).hasSize(1);
            });

            verify(filterService).filter(JobOffer.class, params);
            verify(jobOfferRepository).filterJobs(mockQuery);
        }

        @Test
        @DisplayName("Should handle empty filter parameters")
        @SuppressWarnings("unchecked")
        void shouldHandleEmptyFilterParameters() {
            List<FilterParameter> params = Collections.emptyList();
            CriteriaQuery<JobOffer> mockQuery = mock(CriteriaQuery.class);

            when(filterService.filter(JobOffer.class, params))
                    .thenReturn(Uni.createFrom().item(mockQuery));
            when(jobOfferRepository.filterJobs(mockQuery))
                    .thenReturn(Uni.createFrom().item(Collections.emptyList()));

            Uni<List<JobOffer>> result = jobOfferService.filter(params);

            UniAssertions.awaitAndAssert(result, jobs -> {
                assertThat(jobs).isEmpty();
            });
        }
    }
}
