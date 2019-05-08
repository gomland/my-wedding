import React from 'react';

export const UnitType = {
    Rect: 1,
    IMG: 2
};

export default class Unit {
    constructor(props) {
        this.props = Object.assign({
            type: UnitType.Rect,
            src: [],
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            opacity: 1,
            speed: 1
        }, props);

        this.key = Math.floor(Math.random() * 99999999);
        this.visible = true;
        this.actions = [];
        this.reset();
        this.render();
    }

    render = () => {
        this.component = [];
        if (this.props.type === UnitType.Rect) {
            //Todo : Test
            this.component.push(<rect key={this.key} x={this.x} y={this.y} width={this.props.w} height={this.props.h}
                                      fill={"#f00"}/>);
            this.component.push(<rect key={this.key} x={this.x} y={this.y} width={this.props.w} height={this.props.h}
                                      fill={"#00f"}/>);
            this.component.push(<rect key={this.key} x={this.x} y={this.y} width={this.props.w} height={this.props.h}
                                      fill={"#0f0"}/>);
        } else if (this.props.type === UnitType.IMG) {
            this.component = this.props.src.map(file => <image key={this.key}
                                                               xlinkHref={file} x={this.x} y={this.y}
                                                               width={this.props.w}
                                                               height={this.props.h}
                                                               opacity={this.props.opacity}/>);
        }
    };

    addX = (increase) => {
        this.x += increase;
        this.render();
    };

    addY = (increase) => {
        this.y += increase;
        this.render();
    };

    setOpacity = (opacity) => {
        this.props.opacity = opacity;
    };

    addOpacity = (increase) => {
        this.props.opacity += increase;

        if (this.props.opacity < 0) {
            this.props.opacity = 0;
        } else if (this.props.opacity > 1) {
            this.props.opacity = 1;
        }

        this.render();
    };

    reset = () => {
        this.x = this.props.x;
        this.y = this.props.y;
    };

    addAction = (action) => {
        this.actions.push(action);
    };

    getSpeed = () => this.props.speed;

    removeAction = (actions) => {
        this.actions = this.actions.filter(item => actions.findIndex(e => e.key === item.key) === -1);
    };
}
