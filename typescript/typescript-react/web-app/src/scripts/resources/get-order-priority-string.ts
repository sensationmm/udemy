import {OrderPriority} from "./../server";
import {assertNever} from "./../utils";

export function getOrderPriorityString(orderPriority: OrderPriority | undefined) {
    switch (orderPriority) {
        case undefined:
            return "";
        case OrderPriority.Low:
            return "Low";
        case OrderPriority.Medium:
            return "Medium";
        case OrderPriority.High:
            return "High";
        default:
            return assertNever(orderPriority, `Not implemented value: ${orderPriority}`);
    }
}
