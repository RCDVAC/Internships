package bg.softlytic.keycloak.spi.provider;

import bg.softlytic.model.entity.User;
import org.keycloak.provider.Provider;

public interface UserServiceProvider extends Provider {

    User getUserById(String id);

    User getUserByUsername(String username);

    User createUser(String username);

    void removeUserById(String id);

    void persistUser(User user);


}
