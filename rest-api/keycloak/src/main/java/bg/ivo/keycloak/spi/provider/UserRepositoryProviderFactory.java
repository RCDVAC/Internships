package bg.ivo.keycloak.spi.provider;

import org.keycloak.provider.ProviderFactory;

public interface UserRepositoryProviderFactory<T extends UserRepositoryProvider> extends ProviderFactory<T> {
}
