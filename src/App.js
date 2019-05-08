import React from 'react';
import Scene from "./animation/Scene";
import Unit, {UnitType} from "./animation/Unit";
import Action, {ActionType} from "./animation/Action";

import Man1 from './res/man_00.png';
import Man2 from './res/man_01.png';

export default class App extends React.Component {
    update = (scene, sec) => {
        if (sec === 1) {
            const size = scene.getSize();
            const unit = new Unit({
                type: UnitType.IMG,
                src: [Man1, Man2],
                x: size.w / 2,
                y: size.h * 0.8,
                w: 49,
                h: 71,
                speed: 0.5
            });
            unit.addAction(new Action(ActionType.MOVE_Y, {start: 1, end: 30, y: -(size.h * 0.8)}));
            unit.addAction(new Action(ActionType.FADE_IN, {start: 1, end: 2}));
            unit.addAction(new Action(ActionType.FADE_OUT, {start: 29, end: 30}));
            unit.addAction(new Action(ActionType.REMOVE, {start: 30}));
            scene.addUnit(unit);
        }
    };

    render() {
        return (
            <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                <Scene
                    update={this.update}
                />
            </div>
        );
    }
}

/*
const unit = new Unit({x: 10, y: 10, w: 10, h: 10});
unit.addAction(new Action(ActionType.MOVE_X, {start: 2, end: 5, x: 400}));
unit.addAction(new Action(ActionType.MOVE_Y, {start: 10.5, end: 14, y: -300}));
unit.addAction(new Action(ActionType.MOVE_Y, {start: 1, end: 3, y: 50, repeat: true}));
unit.addAction(new Action(ActionType.INVISIBLE, {start: 15}));
unit.addAction(new Action(ActionType.REMOVE, {start: 15}));
scene.addUnit(unit);
 */