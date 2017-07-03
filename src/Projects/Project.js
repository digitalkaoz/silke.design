import React, {Component} from 'react';

class Project extends Component {

    renderLeftContent() {
        if (this.props.direction === 'ltr') {
            return this.renderVisual();
        } else {
            return this.renderDescription();
        }
    }

    renderRightContent() {
        if (this.props.direction === 'ltr') {
            return this.renderDescription();
        } else {
            return this.renderVisual();
        }
    }

    renderDescription() {
        return <p>{this.props.text}</p>;
    }

    renderVisual() {
        return <div>
            <p>{this.props.name}</p>
            <img src={this.props.logo}/>        
        </div>;
    }

    render() {
        return (
            <div className="project row">
                <div className="col s12 m6">
                    {this.renderLeftContent()}
                </div>
                <div className="col s12 m6">
                    {this.renderRightContent()}
                </div>
            </div>
        );
    }
}

export default Project;