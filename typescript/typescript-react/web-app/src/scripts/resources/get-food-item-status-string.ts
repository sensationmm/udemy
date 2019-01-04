import {FoodItemStatus} from "./../server";
import {assertNever} from "./../utils";

export function getFoodItemStatusString(foodItemStatus: FoodItemStatus | undefined) {
    switch (foodItemStatus) {
        case undefined:
            return "";
        case FoodItemStatus.Active:
            return "Active";
        case FoodItemStatus.Inactive:
            return "Inactive";
        default:
            return assertNever(foodItemStatus, `Not implemented value: ${foodItemStatus}`);
    }
}
