export class NumberHelper {
    private constructor() {
    }

    static formatAsCurrency(val: number | undefined, options: { prefix?: string; suffix?: string; } = { prefix: "$" }) {
        let {prefix = "", suffix = ""} = options;

        return val == null ? "" : prefix + val.toFixed(2) + suffix;
    }

    static parseString(val: string | undefined) {
        return NumberHelper.isNumber(val) ? parseFloat(val!) : undefined;
    }

    static toString(val: number | string | undefined) {
        if (typeof val === "number")
            return val.toString();
        else
            return NumberHelper.isNumber(val) ? val : "";
    }

    static isNumber(val: string | undefined) {
        if (val == null)
            return false;
        return !isNaN(parseInt(val, 10));
    }
}
