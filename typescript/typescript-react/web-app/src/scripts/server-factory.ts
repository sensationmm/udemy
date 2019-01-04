import {ServerFoodItems, ServerOrders} from "./server";
import defaultConfig, {ConfigStructure} from "./config/config";

export class ServerFactory {
    private static cachedInstance: ServerFactory;
    private serverFoodItems: ServerFoodItems;
    private serverOrders: ServerOrders;

    private constructor(private readonly config: ConfigStructure) {
    }

    static get instance() {
        return ServerFactory.cachedInstance || (ServerFactory.cachedInstance = new ServerFactory(defaultConfig));
    }

    getServerFoodItems() {
        return this.serverFoodItems || (this.serverFoodItems = new ServerFoodItems({ urlPrefix: this.config.serverUrl }));
    }

    getServerOrders() {
        return this.serverOrders || (this.serverOrders = new ServerOrders({ urlPrefix: this.config.serverUrl }));
    }
}
