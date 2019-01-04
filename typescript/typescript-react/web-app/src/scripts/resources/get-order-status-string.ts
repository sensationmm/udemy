import {OrderStatus} from "./../server";
import {assertNever} from "./../utils";

export function getOrderStatusString(orderStatus: OrderStatus | undefined) {
    switch (orderStatus) {
        case undefined:
            return "";
        case OrderStatus.Pending:
            return "Pending";
        case OrderStatus.Received:
            return "Received";
        case OrderStatus.Enroute:
            return "Enroute";
        case OrderStatus.Delivered:
            return "Delivered";
        case OrderStatus.Canceled:
            return "Canceled";
        default:
            return assertNever(orderStatus, `Not implemented value: ${orderStatus}`);
    }
}
