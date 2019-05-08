export const ActionType = {
    VISIBLE: 0,
    INVISIBLE: 1,
    MOVE_X: 2,
    MOVE_Y: 3,
    REMOVE: 4,
    FADE_IN: 5,
    FADE_OUT: 6
};

export default class Action {
    constructor(type, props) {
        this.type = type;
        this.key = Math.floor(Math.random() * 99999999);
        this.state = props;
    }
}