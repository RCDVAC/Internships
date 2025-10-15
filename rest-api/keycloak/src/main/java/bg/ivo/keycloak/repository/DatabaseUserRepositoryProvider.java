package bg.ivo.keycloak.repository;

import bg.ivo.exception.UserNotFoundException;
import bg.ivo.keycloak.spi.provider.UserRepositoryProvider;
import bg.ivo.model.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.connections.jpa.JpaConnectionProvider;
import org.keycloak.models.KeycloakSession;

import java.util.HashMap;
import java.util.UUID;

@Slf4j
public class DatabaseUserRepositoryProvider implements UserRepositoryProvider {

    private final KeycloakSession session;

    EntityManager entityManager;

    public DatabaseUserRepositoryProvider(KeycloakSession keycloakSession) {
        this.session = keycloakSession;

        this.entityManager = keycloakSession.getProvider(JpaConnectionProvider.class, "user-store").getEntityManager();
    }

    @Override
    public User getUserById(UUID id) {
        try {
            return entityManager.find(User.class, id);
        } catch (NoResultException e) {
            log.error("User with id: {}, not found", id);
            throw new UserNotFoundException("User with id: " + id + ", not found.", e);
        }
    }

    @Override
    public User getUserByUsername(String username) {
        try {
            TypedQuery<User> query = entityManager.createQuery("select u FROM User u where u.username = :username", User.class);
            query.setParameter("username", username);
            return query.getSingleResult();
        } catch (NoResultException e) {
            log.error("User with username: {}, not found", username);
            throw new UserNotFoundException("User with username: " + username + ", not found.", e);
        }
    }

    @Override
    public User createUser(String username) {
        User user = new User(true, new HashMap<>(), false);
        user.setUsername(username);
        entityManager.persist(user);
        return user;
    }

    @Override
    public void removeUserById(UUID id) {
        User user = getUserById(id);
        entityManager.remove(user);
    }

    @Override
    public void persistUser(User user) {
        this.entityManager.persist(user);
    }


    @Override
    public void close() {
        // Nothing to close
    }
}
