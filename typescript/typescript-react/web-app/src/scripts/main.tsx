import * as React from "react";
import * as ReactDOM from "react-dom";
import {FoodItemEdit} from "./pages/food-items/food-item-edit";
import {FoodItemList} from "./pages/food-items/food-item-list";
import {OrderEdit} from "./pages/orders/order-edit";
import {OrderList} from "./pages/orders/order-list";
import {About} from "./pages/misc/about";
import {Sidebar} from "./pages/partials/sidebar";
import {ShowFoodItemListAction, ShowFoodItemEditAction} from "./actions/food-item-actions";
import {ShowOrderListAction, ShowOrderEditAction} from "./actions/order-actions";
import {ShowAboutAction} from "./actions/about-actions";
import {AppDispatcher} from "./app-dispatcher";

interface MainState {
    page?: JSX.Element;
}

class Main extends React.Component<{}, MainState> {
    constructor() {
        super({});

        this.state = {};
    }

    render() {
        return (
            <div id="main">
                {this.state.page}
            </div>
        );
    }

    componentDidMount() {
        AppDispatcher.register(
            ShowFoodItemListAction,
            () => this.setState({ page: <FoodItemList /> }));
        AppDispatcher.register(
            ShowFoodItemEditAction,
            (action) => this.setState({ page: <FoodItemEdit defaultFoodItem={action.foodItem} /> }));
        AppDispatcher.register(
            ShowOrderListAction,
            () => this.setState({ page: <OrderList /> }));
        AppDispatcher.register(
            ShowOrderEditAction,
            (action) => this.setState({ page: <OrderEdit defaultOrder={action.order} /> }));
        AppDispatcher.register(
            ShowAboutAction,
            () => this.setState({ page: <About /> }));
    }
}

ReactDOM.render(
    <div>
        <Sidebar />
        <Main />
    </div>,
    document.getElementById("react-render-area")
);

// navigate to the default page
AppDispatcher.dispatch(new ShowFoodItemListAction());
