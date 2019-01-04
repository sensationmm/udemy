import * as React from "react";
import {AppDispatcher} from "./../../app-dispatcher";
import {ShowFoodItemListAction, SaveFoodItemAction} from "./../../actions";
import {ControlForm, ControlGroup, ButtonGroup, SubmitButton, CancelButton,
    TextInput, SelectInput, CurrencyInput, PageHeader, PageContent} from "./../../components";
import {FoodItem, FoodItemStatus} from "./../../server";
import {SelectHelper, NumberHelper} from "./../../utils";
import {getFoodItemStatusString} from "./../../resources";

interface FoodItemEditProps {
    defaultFoodItem?: FoodItem;
}

interface FoodItemEditState {
    foodItemID?: string;
    name: string;
    price?: number;
    status?: FoodItemStatus;
}

export class FoodItemEdit extends React.Component<FoodItemEditProps, FoodItemEditState> {
    constructor(props: FoodItemEditProps) {
        super(props);

        this.state = { name: "" };

        Object.assign(this.state, props.defaultFoodItem);
    }

    render() {
        return (
            <div>
                <PageHeader title={this.isEditing() ? "Food Items - Edit" : "Food Items - Add"} />
                <PageContent>
                    <ControlForm onSubmit={() => this.onSubmit()}>
                        <ControlGroup>
                            <label htmlFor="name">Name</label>
                            <TextInput
                                id="name"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={(name) => this.setState({ name: name || "" })} />
                        </ControlGroup>
                        <ControlGroup>
                            <label htmlFor="price">Price</label>
                            <CurrencyInput
                                id="price"
                                placeholder="Price"
                                value={this.state.price}
                                onChange={(price) => this.setState({ price })} />
                        </ControlGroup>
                        <ControlGroup>
                            <label htmlFor="status">Status</label>
                            <SelectInput
                                id="status"
                                placeholder="Status"
                                includeBlank={true}
                                value={NumberHelper.toString(this.state.status)}
                                options={SelectHelper.enumToOptions(FoodItemStatus, getFoodItemStatusString)}
                                onChange={(status) => this.setState({ status: NumberHelper.parseString(status) })} />
                        </ControlGroup>
                        <ButtonGroup>
                            <SubmitButton text={this.isEditing() ? "Save" : "Add"} />
                            <CancelButton text="Cancel" onClick={() => this.goBack()} />
                        </ButtonGroup>
                    </ControlForm>
                </PageContent>
            </div>
        );
    }

    private isEditing() {
        return this.state.foodItemID != null;
    }

    private onSubmit() {
        AppDispatcher.dispatch(new SaveFoodItemAction(this.getFoodItemFromState()));
        this.goBack();
    }

    private goBack() {
        AppDispatcher.dispatch(new ShowFoodItemListAction());
    }

    private getFoodItemFromState(): FoodItem {
        return {
            foodItemID: this.state.foodItemID!,
            name: this.state.name,
            price: this.state.price,
            status: this.state.status
        };
    }
}
