import {AppDispatcher} from "./../app-dispatcher";
import {SaveOrderAction, RemoveOrderAction} from "./../actions";
import {BaseStore} from "./base";
import {ServerFactory} from "./../server-factory";
import {Order} from "./../server";

// public
export class OrderStore extends BaseStore {
    static get(orderID: string) {
        return orders[orderID];
    }

    static getAll() {
        return Object.keys(orders).map(orderID => orders[orderID]);
    }
}

// private
let orders: { [orderID: string]: Order } = {};

function setOrders(...items: Order[]) {
    items.forEach(addOrder);
}

function addOrder(order: Order) {
    orders[order.orderID!] = order;
}

function removeOrder(orderID: string) {
    delete orders[orderID];
}

// actions to listen for
AppDispatcher.register(SaveOrderAction, async action => {
    const returnResult = await ServerFactory.instance.getServerOrders().set(action.order);
    addOrder(returnResult);
    OrderStore.emitChange();
});

AppDispatcher.register(RemoveOrderAction, async action => {
    const result = await ServerFactory.instance.getServerOrders().remove({ orderID: action.orderID });
    removeOrder(action.orderID);
    OrderStore.emitChange();
});

ServerFactory.instance.getServerOrders().list().then((returnedItems) => {
    returnedItems.forEach(r => r.receivedDate = new Date(r.receivedDate as any as string));
    setOrders(...returnedItems);
    OrderStore.emitChange();
});
