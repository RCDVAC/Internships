package bg.softlytic.model.filter;

import lombok.Getter;

@Getter
public enum FilterTypes {
    TECHNOLOGY("TECHNOLOGY");

    private final String type;

    FilterTypes(String type) {
        this.type = type;
    }

}
