package bg.softlytic.keycloak.util;

import bg.softlytic.keycloak.model.UserAdapter;
import bg.softlytic.model.entity.User;
import org.keycloak.component.ComponentModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;

public class UserUtils {

    public static UserModel createUserAdapter(KeycloakSession session, RealmModel realmModel, ComponentModel componentModel, User user) {
        UserModel userModel = new UserAdapter(session, realmModel, componentModel, user);

        return userModel;
    }


}
