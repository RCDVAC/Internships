package bg.ivo.keycloak.service;

import bg.ivo.keycloak.spi.provider.UserServiceProviderFactory;
import org.keycloak.Config;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;

public class DatabaseUserServiceFactory implements UserServiceProviderFactory<DatabaseUserServiceProvider> {

    public static final String PROVIDER_ID = "database-user-service-provider";


    @Override
    public DatabaseUserServiceProvider create(KeycloakSession session) {
        return new DatabaseUserServiceProvider(session);
    }

    @Override
    public void init(Config.Scope config) {

    }

    @Override
    public void postInit(KeycloakSessionFactory factory) {

    }

    @Override
    public void close() {

    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }
}
