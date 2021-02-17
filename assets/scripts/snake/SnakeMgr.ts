// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SnakeBase from "./SnakeBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SnakeMgr{
    private static _ins:SnakeMgr = null;
    public static get instance(){
        if(!this._ins){
            this._ins = new SnakeMgr();
        }
        return this._ins;
    }

    public snakeHead:SnakeBase = null;

    public snakes:SnakeBase[] = [];

    public pointX:number = 0;
    public pointY:number = 0;

    public checkPoint(X:number, Y:number):boolean {
        if(this.pointX == X && this.pointY == Y){
            if(this.nextStep){
                this.nextStep();
            }
            return true;
        }
    }

    public nextStep:Function = null;

    public walls:cc.Vec2[] = [];

    public checkContain(X:number, Y:number):boolean {

        for(let i = 0;i < this.snakes.length;i++){
            if(this.snakes[i].X == X &&this.snakes[i].Y == Y){
                return true;
            }
        }
        for(let i = 0;i < this.walls.length;i++){
            if(this.walls[i].x == X &&this.walls[i].y == Y){
                return true;
            }
        }
        return false;
    }


}


