export class StringHelper {
    private constructor() {
    }

    static isUndefinedOrWhitespace(str: string | undefined) {
        return str == null || /^\s*$/.test(str);
    }
}
