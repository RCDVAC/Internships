package bg.ivo.keycloak.user.storage;

import org.keycloak.component.ComponentModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.storage.UserStorageProviderFactory;

public class CustomDatabaseUserStorageProviderFactory implements UserStorageProviderFactory<CustomDatabaseUserStorageProvider> {

    public static final String PROVIDER_ID = "custom-database-user-storage";

    @Override
    public CustomDatabaseUserStorageProvider create(KeycloakSession session, ComponentModel model) {
        return new CustomDatabaseUserStorageProvider(session, model);
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }
}
