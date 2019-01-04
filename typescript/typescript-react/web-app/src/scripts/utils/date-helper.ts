import * as moment from "moment";
import config from "./../config/config";

export class DateHelper {
    private constructor() {
    }

    static toLongDateString(date: Date | undefined) {
        return this.format(date, config.date.longFormat);
    }

    static toShortDateString(date: Date | undefined) {
        return this.format(date, config.date.shortFormat);
    }

    private static format(date: Date | undefined, formatString: string) {
        return date == null ? "" : moment(date).format(formatString);
    }
}
