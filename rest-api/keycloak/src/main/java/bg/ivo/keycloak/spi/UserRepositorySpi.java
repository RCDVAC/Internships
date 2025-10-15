package bg.ivo.keycloak.spi;

import bg.ivo.keycloak.spi.provider.UserRepositoryProvider;
import bg.ivo.keycloak.spi.provider.UserRepositoryProviderFactory;
import org.keycloak.provider.Provider;
import org.keycloak.provider.ProviderFactory;
import org.keycloak.provider.Spi;

public class UserRepositorySpi implements Spi {
    @Override
    public boolean isInternal() {
        return false;
    }

    @Override
    public String getName() {
        return "repository";
    }

    @Override
    public Class<? extends Provider> getProviderClass() {
        return UserRepositoryProvider.class;
    }

    @Override
    public Class<? extends ProviderFactory> getProviderFactoryClass() {
        return UserRepositoryProviderFactory.class;
    }
}
