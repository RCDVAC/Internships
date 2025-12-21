package bg.softlytic.keycloak.user.storage;

import bg.softlytic.exception.UserNotFoundException;
import bg.softlytic.keycloak.model.UserAdapter;
import bg.softlytic.keycloak.model.credential.PasswordHashData;
import bg.softlytic.keycloak.service.DatabaseUserServiceProvider;
import bg.softlytic.keycloak.spi.provider.UserServiceProvider;
import bg.softlytic.keycloak.util.UserUtils;
import bg.softlytic.model.entity.User;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.component.ComponentModel;
import org.keycloak.credential.CredentialInput;
import org.keycloak.credential.CredentialInputUpdater;
import org.keycloak.credential.CredentialInputValidator;
import org.keycloak.credential.hash.PasswordHashProvider;
import org.keycloak.models.*;
import org.keycloak.models.credential.PasswordCredentialModel;
import org.keycloak.models.credential.dto.PasswordCredentialData;
import org.keycloak.models.credential.dto.PasswordSecretData;
import org.keycloak.storage.StorageId;
import org.keycloak.storage.UserStorageProvider;
import org.keycloak.storage.user.UserLookupProvider;
import org.keycloak.storage.user.UserQueryProvider;
import org.keycloak.storage.user.UserRegistrationProvider;
import org.keycloak.util.JsonSerialization;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@Slf4j
public class CustomDatabaseUserStorageProvider implements UserStorageProvider,
        UserLookupProvider,
        UserQueryProvider,
        UserRegistrationProvider,
        CredentialInputValidator,
        CredentialInputUpdater {

    private final KeycloakSession keycloakSession;

    private final ComponentModel model;

    private final DatabaseUserServiceProvider userService;

    public CustomDatabaseUserStorageProvider(KeycloakSession session, ComponentModel model) {
        this.keycloakSession = session;
        this.model = model;

        this.userService = (DatabaseUserServiceProvider) session.getProvider(UserServiceProvider.class);
    }


    @Override
    public UserModel getUserById(RealmModel realm, String id) {
        try {
            String externalId = StorageId.externalId(id);
            User user = userService.getUserById(externalId);
            return UserUtils.createUserAdapter(keycloakSession, realm, model, user);
        } catch (UserNotFoundException e) {
            return null;
        }
    }

    @Override
    public UserModel getUserByUsername(RealmModel realm, String username) {
        try {
            User user = userService.getUserByUsername(username);
            return UserUtils.createUserAdapter(keycloakSession, realm, model, user);
        } catch (UserNotFoundException e) {
            return null;
        }
    }

    @Override
    public UserModel getUserByEmail(RealmModel realm, String email) {
        // TODO
        return null;
    }

    @SneakyThrows // TODO
    @Override
    public boolean isValid(RealmModel realm, UserModel user, CredentialInput credentialInput) {
        PasswordHashData passwordHashData = getDefaultPasswordHashProvider(realm);

        if (passwordHashData == null) {
            return false;
        }

        User databaseUser = ((UserAdapter) getUserById(realm, user.getId())).getUser();

        PasswordCredentialData passwordCredentialData = JsonSerialization.readValue(databaseUser.getCredentialData(), PasswordCredentialData.class);
        PasswordSecretData passwordSecretData = JsonSerialization.readValue(databaseUser.getSecretData(), PasswordSecretData.class);

        PasswordCredentialModel credentialModel = PasswordCredentialModel.createFromValues(passwordCredentialData, passwordSecretData);

        return passwordHashData.getPasswordHashProvider().verify(credentialInput.getChallengeResponse(), credentialModel);
    }

    @Override
    public UserModel addUser(RealmModel realm, String username) {
        User user = userService.createUser(username);
        return UserUtils.createUserAdapter(keycloakSession, realm, model, user);
    }

    @Override
    public boolean removeUser(RealmModel realm, UserModel user) {
        String externalId = StorageId.externalId(user.getId());
        try {
            userService.removeUserById(externalId);
            return true;
        } catch (Exception e) {
            log.error("Failed to remove user", e);
            return false;
        }
    }

    @Override
    public boolean updateCredential(RealmModel realm, UserModel user, CredentialInput input) {
        PasswordHashData passwordHashData = getDefaultPasswordHashProvider(realm);

        if (passwordHashData == null) {
            return false;
        }

        PasswordCredentialModel passwordCredential = passwordHashData.getPasswordHashProvider()
                .encodedCredential(input.getChallengeResponse(), passwordHashData.getIterations());
        String credentialData = passwordCredential.getCredentialData();
        String secretData = passwordCredential.getSecretData();

        User databaseUser = ((UserAdapter) getUserById(realm, user.getId())).getUser();

        databaseUser.credentialData = credentialData;
        databaseUser.secretData = secretData;

        userService.persistUser(databaseUser);

        return true;
    }

    @Override
    public void disableCredentialType(RealmModel realm, UserModel user, String credentialType) {
        // We don't support multiple credential types
    }

    @Override
    public Stream<String> getDisableableCredentialTypesStream(RealmModel realm, UserModel user) {
        // We don't support multiple credential types
        return Stream.empty();
    }

    @Override
    public boolean supportsCredentialType(String credentialType) {
        // We don't support multiple credential types
        return PasswordCredentialModel.TYPE.equals(credentialType);
    }

    @Override
    public boolean isConfiguredFor(RealmModel realm, UserModel user, String credentialType) {
        // We don't support multiple credential types
        return supportsCredentialType(credentialType);
    }

    @Override
    public Stream<UserModel> searchForUserStream(RealmModel realm, Map<String, String> params, Integer firstResult, Integer maxResults) {
        // TODO
        return Stream.empty();
    }

    @Override
    public Stream<UserModel> getGroupMembersStream(RealmModel realm, GroupModel group, Integer firstResult, Integer maxResults) {
        // TODO
        return Stream.empty();
    }

    @Override
    public Stream<UserModel> searchForUserByUserAttributeStream(RealmModel realm, String attrName, String attrValue) {
        // TODO
        return Stream.empty();
    }

    @Override
    public void close() {

    }

    private PasswordHashData getDefaultPasswordHashProvider(RealmModel realm) {
        PasswordPolicy policy = realm.getPasswordPolicy();
        String defaultHashingAlgorithm = Optional.of(policy.getHashAlgorithm()).orElse("pbkdf2-sha256");
        int hashingIterations = policy.getHashIterations();

        if (hashingIterations == -1) {
            hashingIterations = 64; //default if not present
        }

        PasswordHashProvider passwordHashProvider = keycloakSession.getProvider(PasswordHashProvider.class, defaultHashingAlgorithm);

        if (passwordHashProvider == null) {
            log.error("Could not find password hash provider with hashing algorithm: {}", defaultHashingAlgorithm);
            return null;
        }

        return new PasswordHashData(passwordHashProvider, defaultHashingAlgorithm, hashingIterations);
    }

}
