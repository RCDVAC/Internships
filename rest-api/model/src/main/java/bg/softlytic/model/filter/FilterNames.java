package bg.softlytic.model.filter;

public enum FilterNames {
    WORK_TYPE("WORK_TYPE");
    private final String name;

    FilterNames(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
