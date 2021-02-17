// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class SnakeConfig{
    public static RECT_WIDTH: number = 750;
    public static RECT_HEIGHT: number = 900;

    public static ITEM_WIDTH: number = 30;

    public static MAX_X: number = SnakeConfig.RECT_WIDTH / SnakeConfig.ITEM_WIDTH;
    public static MAX_Y: number = SnakeConfig.RECT_HEIGHT / SnakeConfig.ITEM_WIDTH;

    public static getXYByPos(position:cc.Vec2):cc.Vec2{
        return cc.v2((position.x + SnakeConfig.RECT_WIDTH / 2)  / SnakeConfig.ITEM_WIDTH - 0.5,(SnakeConfig.RECT_HEIGHT / 2 - position.y) / SnakeConfig.ITEM_WIDTH -0.5);
    }
    public static getPosByXY(X:number, Y:number):cc.Vec3{
        return new cc.Vec3((X + 0.5) * SnakeConfig.ITEM_WIDTH - SnakeConfig.RECT_WIDTH / 2, SnakeConfig.RECT_HEIGHT / 2 - (Y + 0.5) * SnakeConfig.ITEM_WIDTH);
    }
}
// window["SnakeConfig"] = SnakeConfig;

export enum DIRECTION{
    up = 1,
    down= -1,
    left= 2,
    right=-2
}