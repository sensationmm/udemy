import * as React from "react";

export class PageContent extends React.Component<{}, {}> {
    render() {
        return (
            <div className="content">
                {this.props.children}
            </div>
        );
    }
}
