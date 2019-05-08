import React from "react";
import {ActionType} from "./Action";

const DEFAULT_FPS = 60;

export default class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            count: 0,
            units: []
        };
    }

    componentWillMount() {
        if (!this.timer) {
            this.timer = setInterval(this.draw, 1000 / this.getFPS());
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = null;
    }

    getFPS = () => {
        return this.props.fps || DEFAULT_FPS;
    };

    getSize = () => {
        const e = document.getElementById("ani_svg");
        return e ? {w: e.getBoundingClientRect().width, h: e.getBoundingClientRect().height} : {w: 0, h: 0};
    };

    addUnit = (unit) => {
        this.setState({
            units: [...this.state.units, unit]
        });
    };

    removeUnit = (removeUnits) => {
        this.setState(prevState => ({
            units: prevState.units.filter(item => removeUnits.findIndex(e => e.key === item.key) === -1)
        }));
    };

    draw = () => {
        const {count} = this.state;

        if (this.props.update) {
            this.props.update(this, count / this.getFPS());
        }

        this.runAction();

        this.setState({
            count: count + 1
        });
    };

    runAction = () => {
        const count = this.state.count / this.getFPS();

        let removeUnits = [];

        this.state.units.forEach(item => {
            let removeActions = [];

            console.log(item.actions.length);

            item.actions.forEach(action => {
                if (action.type === ActionType.MOVE_X || action.type === ActionType.MOVE_Y) {
                    const interval = action.state.end - action.state.start;

                    if (action.state.start <= count && action.state.end > count) {
                        if (action.type === ActionType.MOVE_X) {
                            item.addX(action.state.x / interval / this.getFPS());
                        } else {
                            item.addY(action.state.y / interval / this.getFPS());
                        }
                    }

                    if (action.state.end < count && action.state.repeat) {
                        item.reset();
                        action.state.start = count;
                        action.state.end = count + interval;
                    }
                } else if (action.type === ActionType.VISIBLE || action.type === ActionType.INVISIBLE) {
                    if (action.state.start < count) {
                        item.visible = action.type === ActionType.VISIBLE;
                    }
                } else if (action.type === ActionType.REMOVE) {
                    if (action.state.start < count) {
                        removeUnits.push(item);
                    }
                } else if (action.type === ActionType.FADE_IN || action.type === ActionType.FADE_OUT) {
                    const interval = action.state.end - action.state.start;
                    if (action.state.start <= count && action.state.end > count) {
                        if (action.type === ActionType.FADE_IN) {
                            if (action.state.start === count)
                                item.setOpacity(0);
                            item.addOpacity(1 / interval / this.getFPS());
                        } else {
                            if (action.state.start === count)
                                item.setOpacity(1);
                            item.addOpacity(-(1 / interval / this.getFPS()));
                        }
                    }
                }

                //사용이 끝난 액션 삭제
                if (action.state.end && action.state.end < count
                    && !action.state.repeat) {
                    removeActions.push(action);
                }
            });

            if (removeActions.length > 0) {
                item.removeAction(removeActions);
            }
        });

        if (removeUnits.length > 0) {
            this.removeUnit(removeUnits);
        }
    };

    render() {
        const {count, units} = this.state;

        return (
            <svg id="ani_svg" width={'100%'} height={'100%'}>
                {
                    units.filter(unit => unit.visible).map(unit => {
                        const idx = Math.ceil(count / (this.getFPS() * unit.getSpeed()) % unit.component.length) - 1;
                        return unit.component[idx < 0 ? 0 : idx];
                    })
                }
            </svg>
        );
    }
}