export const ActionType = {
    VISIBLE: 0,
    INVISIBLE: 1,
    MOVE_X: 2,
    MOVE_Y: 3,
    REMOVE: 4
};

export default class Action {
    constructor(type, props) {
        this.type = type;
        this.state = props;
    }
}