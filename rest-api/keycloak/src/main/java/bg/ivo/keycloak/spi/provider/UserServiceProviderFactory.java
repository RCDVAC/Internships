package bg.ivo.keycloak.spi.provider;

import org.keycloak.provider.ProviderFactory;

public interface UserServiceProviderFactory<T extends UserServiceProvider> extends ProviderFactory<T> {
}
