import {AppDispatcher} from "./../app-dispatcher";
import {SaveFoodItemAction, RemoveFoodItemAction} from "./../actions";
import {BaseStore} from "./base";
import {FoodItem, FoodItemStatus} from "./../server";
import {ServerFactory} from "./../server-factory";
import {SelectInputOption} from "./../components";

let foodItems: { [foodItemID: string]: FoodItem } = {};

// public
export class FoodItemStore extends BaseStore {
    static get(foodItemID: string) {
        return foodItems[foodItemID];
    }

    static getAll() {
        return Object.keys(foodItems).map(foodItemID => foodItems[foodItemID]);
    }

    static getForSelect(): SelectInputOption[] {
        return FoodItemStore.getAll()
            .filter(foodItem => foodItem.status === FoodItemStatus.Active)
            .map(foodItem => ({
                text: foodItem.name,
                value: foodItem.foodItemID!
            }));
    }
}

// private
function setFoodItems(...items: FoodItem[]) {
    items.forEach(addFoodItem);
}

function addFoodItem(foodItem: FoodItem) {
    foodItems[foodItem.foodItemID!] = foodItem;
}

function removeFoodItem(foodItemID: string) {
    delete foodItems[foodItemID];
}

// actions to listen for
AppDispatcher.register(SaveFoodItemAction, async action => {
    const returnResult = await ServerFactory.instance.getServerFoodItems().set(action.foodItem);
    addFoodItem(returnResult);
    FoodItemStore.emitChange();
});

AppDispatcher.register(RemoveFoodItemAction, async action => {
    const result = await ServerFactory.instance.getServerFoodItems().remove({ foodItemID: action.foodItemID });
    removeFoodItem(action.foodItemID);
    FoodItemStore.emitChange();
});

ServerFactory.instance.getServerFoodItems().list().then(returnedItems => {
    setFoodItems(...returnedItems);
    FoodItemStore.emitChange();
});
