import {BaseInput, BaseInputProps} from "./base";
import {NumberHelper} from "./../../utils";

export class CurrencyInput extends BaseInput<number> {
    constructor(props: BaseInputProps<number>) {
        super(props, { inputType: "text" });
    }

    protected valueToType(val: string | undefined) {
        return NumberHelper.parseString(val);
    }

    protected valueToString(val: string | number | undefined) {
        return NumberHelper.toString(val) || "";
    }
}
