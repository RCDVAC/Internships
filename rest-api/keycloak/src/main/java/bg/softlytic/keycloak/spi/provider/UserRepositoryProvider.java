package bg.softlytic.keycloak.spi.provider;

import bg.softlytic.model.entity.User;
import org.keycloak.provider.Provider;

import java.util.UUID;

public interface UserRepositoryProvider extends Provider {

    User getUserById(UUID id);

    User getUserByUsername(String username);

    User createUser(String username);

    void removeUserById(UUID id);

    void persistUser(User user);
}
