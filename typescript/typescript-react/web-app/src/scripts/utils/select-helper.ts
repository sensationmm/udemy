import {SelectInputOption} from "./../components";
import {EnumHelper} from "./enum-helper";

export class SelectHelper {
    private constructor() {
    }

    static enumToOptions(e: any, valueToStringFunction: (val: number) => string): SelectInputOption[] {
        return EnumHelper.getValues(e).map((val) => ({
            text: valueToStringFunction(val),
            value: val.toString()
        }));
    }
}
