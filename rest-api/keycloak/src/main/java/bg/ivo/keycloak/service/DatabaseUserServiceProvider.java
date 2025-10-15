package bg.ivo.keycloak.service;

import bg.ivo.keycloak.repository.DatabaseUserRepositoryProvider;
import bg.ivo.keycloak.spi.provider.UserRepositoryProvider;
import bg.ivo.keycloak.spi.provider.UserServiceProvider;
import bg.ivo.model.entity.User;
import org.keycloak.models.KeycloakSession;

import java.util.UUID;

public class DatabaseUserServiceProvider implements UserServiceProvider {

    private final KeycloakSession session;

    private final DatabaseUserRepositoryProvider userRepository;

    public DatabaseUserServiceProvider(KeycloakSession keycloakSession) {
        this.session = keycloakSession;

        this.userRepository = (DatabaseUserRepositoryProvider) keycloakSession.getProvider(UserRepositoryProvider.class);
    }

    @Override
    public User getUserById(String id) {
        return this.userRepository.getUserById(UUID.fromString(id));
    }

    @Override
    public User getUserByUsername(String username) {
        return this.userRepository.getUserByUsername(username);
    }

    @Override
    public User createUser(String username) {
        return this.userRepository.createUser(username);
    }

    @Override
    public void removeUserById(String id) {
        this.userRepository.removeUserById(UUID.fromString(id));
    }

    @Override
    public void persistUser(User user) {
        this.userRepository.persistUser(user);
    }

    @Override
    public void close() {
        // Nothing to close
    }
}
