// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SnakeConfig, { DIRECTION } from "./SnakeConfig";
import SnakeMgr from "./SnakeMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SnakeBase extends cc.Component {
    @property(cc.Label)
    txt_id:cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    private pre:SnakeBase = null;
    public after:SnakeBase = null;
    public X:number = 0;
    public Y:number = 0;
    public direction:DIRECTION = DIRECTION.up;

    public lastX:number = 0;
    public lastY:number = 0;

    public init(X:number,Y:number,pre:SnakeBase,after:SnakeBase){
        this.X = X;
        this.Y = Y;
        this.node.position = SnakeConfig.getPosByXY(X,Y);
        this.pre = pre;
        this.after = after;
        this.direction = DIRECTION.up;
        this.txt_id.string = SnakeMgr.instance.snakes.length + "";
        if(this.pre){

        }else{
            this.schedule(this.step,0.1,cc.macro.REPEAT_FOREVER);
        }
    }

    public step():void {
        let nextPos = cc.v2(0,0);
        this.lastX = this.X;
        this.lastY = this.Y;
        switch(this.direction){
            case DIRECTION.up:
                nextPos =cc.v2(0,-1);
            break;
            case DIRECTION.down:
                nextPos =cc.v2(0,1);
            break;
            case DIRECTION.left:
                nextPos =cc.v2(-1,0);
            break;
            case DIRECTION.right:
                nextPos =cc.v2(1,0);
            break;
        }
        if(SnakeMgr.instance.checkContain(this.X + nextPos.x,this.Y + nextPos.y)){
            // this.unschedule(this.step);
            console.error('game over');
        }else{
            this.X += nextPos.x;
            this.Y += nextPos.y;
            this.node.position = SnakeConfig.getPosByXY(this.X,this.Y);
    
            if(this.after){
                this.after.move(this.lastX,this.lastY);
            }
            SnakeMgr.instance.checkPoint(this.X,this.Y);
        }
    }

    public move(preX:number,preY:number){
        this.lastX = this.X;
        this.lastY = this.Y;
        this.X = preX;
        this.Y = preY;
        this.node.position = SnakeConfig.getPosByXY(this.X,this.Y);
        if(this.after){
            this.after.move(this.lastX,this.lastY);
        }
    }

    // update (dt) {}
}
