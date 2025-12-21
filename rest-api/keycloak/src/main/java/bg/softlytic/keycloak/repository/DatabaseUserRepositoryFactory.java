package bg.softlytic.keycloak.repository;

import bg.softlytic.keycloak.spi.provider.UserRepositoryProviderFactory;
import org.keycloak.Config;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;

public class DatabaseUserRepositoryFactory implements UserRepositoryProviderFactory<DatabaseUserRepositoryProvider> {

    public static final String PROVIDER_ID = "database-user-repository-provider";


    @Override
    public DatabaseUserRepositoryProvider create(KeycloakSession session) {
        return new DatabaseUserRepositoryProvider(session);
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
