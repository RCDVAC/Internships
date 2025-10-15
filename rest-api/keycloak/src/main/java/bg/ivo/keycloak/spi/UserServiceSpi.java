package bg.ivo.keycloak.spi;

import bg.ivo.keycloak.spi.provider.UserServiceProvider;
import bg.ivo.keycloak.spi.provider.UserServiceProviderFactory;
import org.keycloak.provider.Provider;
import org.keycloak.provider.ProviderFactory;
import org.keycloak.provider.Spi;

public class UserServiceSpi implements Spi {
    @Override
    public boolean isInternal() {
        return false;
    }

    @Override
    public String getName() {
        return "service";
    }

    @Override
    public Class<? extends Provider> getProviderClass() {
        return UserServiceProvider.class;
    }

    @Override
    public Class<? extends ProviderFactory> getProviderFactoryClass() {
        return UserServiceProviderFactory.class;
    }
}
