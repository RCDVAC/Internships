package bg.ivo.keycloak.model.credential;

import lombok.Getter;
import lombok.Setter;
import org.keycloak.credential.hash.PasswordHashProvider;

@Getter
@Setter
public class PasswordHashData {

    private final PasswordHashProvider passwordHashProvider;

    private final String hashingAlgorithm;

    private final int iterations;


    public PasswordHashData(PasswordHashProvider passwordHashProvider, String hashingAlgorithm, int iterations) {
        this.passwordHashProvider = passwordHashProvider;
        this.hashingAlgorithm = hashingAlgorithm;
        this.iterations = iterations;
    }
}
