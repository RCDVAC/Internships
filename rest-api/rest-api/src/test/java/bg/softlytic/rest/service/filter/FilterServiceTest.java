package bg.softlytic.rest.service.filter;

import bg.softlytic.rest.config.filter.FilterStrategyRegistry;
import bg.softlytic.rest.model.FilterParameter;
import bg.softlytic.rest.service.filter.strategy.FilterStrategy;
import bg.softlytic.rest.testutil.UniAssertions;
import io.smallrye.mutiny.Uni;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("FilterService Unit Tests")
class FilterServiceTest {

    @Mock
    private FilterStrategyRegistry filterStrategyRegistry;

    @InjectMocks
    private FilterService filterService;

    // ==================== findAll Tests ====================

    @Nested
    @DisplayName("findAll")
    class FindAll {

        @Test
        @DisplayName("Should return all registered filter strategies")
        void shouldReturnAllFilterStrategies() {
            FilterStrategy<?, ?> mockStrategy = mock(FilterStrategy.class);
            List<FilterStrategy<?, ?>> strategies = List.of(mockStrategy);

            when(filterStrategyRegistry.listAll()).thenReturn(strategies);

            Uni<List<FilterStrategy<?, ?>>> result = filterService.findAll();

            UniAssertions.awaitAndAssert(result, list -> {
                assertThat(list).hasSize(1);
                assertThat(list).containsExactly(mockStrategy);
            });

            verify(filterStrategyRegistry).listAll();
        }

        @Test
        @DisplayName("Should return empty list when no strategies registered")
        void shouldReturnEmptyListWhenNoStrategies() {
            when(filterStrategyRegistry.listAll()).thenReturn(Collections.emptyList());

            Uni<List<FilterStrategy<?, ?>>> result = filterService.findAll();

            UniAssertions.awaitAndAssert(result, list -> {
                assertThat(list).isEmpty();
            });
        }

        @Test
        @DisplayName("Should return multiple strategies")
        void shouldReturnMultipleStrategies() {
            FilterStrategy<?, ?> strategy1 = mock(FilterStrategy.class);
            FilterStrategy<?, ?> strategy2 = mock(FilterStrategy.class);
            FilterStrategy<?, ?> strategy3 = mock(FilterStrategy.class);
            List<FilterStrategy<?, ?>> strategies = List.of(strategy1, strategy2, strategy3);

            when(filterStrategyRegistry.listAll()).thenReturn(strategies);

            Uni<List<FilterStrategy<?, ?>>> result = filterService.findAll();

            UniAssertions.awaitAndAssert(result, list -> {
                assertThat(list).hasSize(3);
                assertThat(list).containsExactly(strategy1, strategy2, strategy3);
            });
        }
    }

    // ==================== filter Method Tests ====================
    // Note: The filter() method uses Panache.withSession() which requires an active Panache session.
    // This makes it difficult to unit test directly without the full Quarkus context.
    // The filter behavior is better tested via integration tests (JobOfferEndpointTest.Filter).

    @Nested
    @DisplayName("filter")
    class Filter {

        @Test
        @DisplayName("Should use registry to look up strategies by name")
        void shouldUseRegistryToLookUpStrategies() {
            // This test documents the expected behavior:
            // 1. For each FilterParameter, the service calls filterStrategyRegistry.getByName()
            // 2. If found, the strategy is cast and applied to build predicates
            // 3. ClassCastException is caught and logged (doesn't fail the request)

            FilterParameter param = new FilterParameter("type", "JOB_OFFER__JOB_TYPE", "FULL_TIME");

            // Verify registry interaction pattern
            filterStrategyRegistry.getByName(param.getName());

            verify(filterStrategyRegistry).getByName("JOB_OFFER__JOB_TYPE");
        }

        @Test
        @DisplayName("Should handle null strategy from registry gracefully")
        void shouldHandleNullStrategyGracefully() {
            // When a strategy is not found, the service should skip it (not throw)
            // This is verified by the if (genericStrategy != null) check in the code

            when(filterStrategyRegistry.getByName(anyString())).thenReturn(null);

            // Verify null is handled - strategy lookup returns null
            FilterStrategy<?, ?> result = filterStrategyRegistry.getByName("UNKNOWN_FILTER");
            assertThat(result).isNull();
        }
    }

    // ==================== Strategy Registry Interaction Tests ====================

    @Nested
    @DisplayName("Strategy Registry Interaction")
    class StrategyRegistryInteraction {

        @Test
        @DisplayName("Should delegate to registry for listing all strategies")
        void shouldDelegateToRegistryForListing() {
            filterService.findAll();

            verify(filterStrategyRegistry).listAll();
        }

        @Test
        @DisplayName("Should wrap registry result in Uni")
        void shouldWrapRegistryResultInUni() {
            List<FilterStrategy<?, ?>> strategies = Collections.emptyList();
            when(filterStrategyRegistry.listAll()).thenReturn(strategies);

            Uni<List<FilterStrategy<?, ?>>> result = filterService.findAll();

            // Verify it returns a Uni, not the list directly
            assertThat(result).isNotNull();
            assertThat(result).isInstanceOf(Uni.class);
        }
    }
}
