package bg.softlytic.keycloak.model;

import bg.softlytic.model.entity.User;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.component.ComponentModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;
import org.keycloak.storage.StorageId;
import org.keycloak.storage.adapter.AbstractUserAdapterFederatedStorage;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Slf4j
@Getter
public class UserAdapter extends AbstractUserAdapterFederatedStorage {

    private final User user;
    private final KeycloakSession session;

    public UserAdapter(KeycloakSession session, RealmModel realm, ComponentModel storageProviderModel, User user) {
        super(session, realm, storageProviderModel);
        this.session = session;
        this.storageId = new StorageId(storageProviderModel.getId(), user.getId().toString());
        this.user = user;
        this.user.setDateCreated(Timestamp.from(Instant.now()));
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public void setUsername(String username) {
        this.user.setUsername(username);
    }

    @Override
    public Long getCreatedTimestamp() {
        return user.getDateCreated().getTime();
    }

    @Override
    public void setCreatedTimestamp(Long timestamp) {
        this.user.setDateCreated(Timestamp.from(Instant.ofEpochMilli(timestamp)));
    }

    @Override
    public void setSingleAttribute(String name, String value) {
        checkAttributeNameNotNull(name);
        if (handleUserProfileAttributesWrite(name, List.of(value))) {
            return;
        }

        Map<String, List<String>> attributes = user.getAttributes();

        if (attributes.get(name) != null) {
            attributes.remove(name);
        }

        attributes.put(name, List.of(value));
    }

    @Override
    public void removeAttribute(String name) {
        checkAttributeNameNotNull(name);
        this.user.attributes.remove(name);
    }

    @Override
    public void setAttribute(String name, List<String> values) {
        checkAttributeNameNotNull(name);
        if (handleUserProfileAttributesWrite(name, values)) {
            return;
        }

        Map<String, List<String>> attributes = user.getAttributes();

        if (attributes.get(name) != null) {
            attributes.remove(name);
        }
        attributes.put(name, values);
    }

    @Override
    public String getFirstAttribute(String name) {
        checkAttributeNameNotNull(name);
        String attribute = handleUserProfileAttributesRead(name);
        if (attribute != null) {
            return attribute;
        }
        if (user.getAttributes().get(name) == null) {
            return null;
        }
        return user.getAttributes().get(name).getFirst();
    }

    @Override
    public Map<String, List<String>> getAttributes() {
        Map<String, List<String>> attributes = user.getAttributes();
        attributes.put(UserModel.USERNAME, Collections.singletonList(getUsername()));
        attributes.put(UserModel.FIRST_NAME, Collections.singletonList(getFirstName()));
        attributes.put(Attributes.MIDDLE_NAME, Collections.singletonList(user.getMiddleName()));
        attributes.put(UserModel.LAST_NAME, Collections.singletonList(getLastName()));
        attributes.put(UserModel.EMAIL, Collections.singletonList(getEmail()));
        attributes.put(Attributes.PHONE_NUMBER, Collections.singletonList(user.getPhoneNumber()));
        return attributes;
    }

    @Override
    public Stream<String> getAttributeStream(String name) {
        checkAttributeNameNotNull(name);
        String attribute = handleUserProfileAttributesRead(name);
        if (attribute != null) {
            return Stream.of(attribute);
        }
        if (user.getAttributes().get(name) == null) {
            return Stream.empty();
        }
        return user.getAttributes().get(name).stream();
    }

    @Override
    public String getFirstName() {
        return this.user.getFirstName();
    }

    @Override
    public void setFirstName(String firstName) {
        this.user.setFirstName(firstName);
    }

    @Override
    public String getLastName() {
        return this.user.getLastName();
    }

    @Override
    public void setLastName(String lastName) {
        this.user.setLastName(lastName);
    }

    @Override
    public String getEmail() {
        return this.user.getEmail();
    }

    @Override
    public void setEmail(String email) {
        this.user.setEmail(email);
    }

    @Override
    public boolean isEnabled() {
        return this.user.getIsActive();
    }

    @Override
    public void setEnabled(boolean enabled) {
        user.setIsActive(enabled);
    }

    String handleUserProfileAttributesRead(String name) {
        checkAttributeNameNotNull(name);
        return switch (name) {
            case UserModel.USERNAME -> this.getUsername();
            case UserModel.FIRST_NAME -> this.getFirstName();
            case Attributes.MIDDLE_NAME -> this.user.getMiddleName();
            case UserModel.LAST_NAME -> this.getLastName();
            case UserModel.EMAIL -> this.getEmail();
            case Attributes.PHONE_NUMBER -> this.user.getPhoneNumber();
            default -> null;
        };
    }

    boolean handleUserProfileAttributesWrite(String name, List<String> value) {
        checkAttributeNameNotNull(name);
        switch (name) {
            case UserModel.USERNAME -> {
                this.setUsername(value.getFirst());
                return true;
            }
            case UserModel.FIRST_NAME -> {
                this.setFirstName(value.getFirst());
                return true;
            }
            case Attributes.MIDDLE_NAME -> {
                this.user.setMiddleName(value.getFirst());
                return true;
            }
            case UserModel.LAST_NAME -> {
                this.setLastName(value.getFirst());
                return true;
            }
            case UserModel.EMAIL -> {
                this.user.setEmail(value.getFirst());
                return true;
            }
            case Attributes.PHONE_NUMBER -> {
                this.user.setPhoneNumber(value.getFirst());
                return true;
            }
            default -> {
                return false;
            }
        }
    }

    void checkAttributeNameNotNull(String name) {
        if (name == null) {
            log.error("Attribute name cannot be null!");
            throw new IllegalArgumentException("Attribute name cannot be null");
        }
    }

    public static class Attributes {
        public static final String PHONE_NUMBER = "phoneNumber";
        public static final String MIDDLE_NAME = "middleName";
    }

}
