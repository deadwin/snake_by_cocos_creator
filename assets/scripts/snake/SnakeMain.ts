// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SnakeBase from "./SnakeBase";
import SnakeConfig, { DIRECTION } from "./SnakeConfig";
import SnakeMgr from "./SnakeMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SnakeMain extends cc.Component {
    @property(cc.Prefab)
    snakeItem:cc.Prefab = null;

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Node)
    point:cc.Node = null;
    @property(cc.Prefab)
    wall:cc.Prefab = null;

    onLoad () {
        this.init();
    }

    private init(){
        this.point.active = false;
        SnakeMgr.instance.nextStep = this.nextStep.bind(this);

        this.initWalls();
        this.initSnake();
        this.createPoint();
        this.addEvents();
    }

    public initWalls(){
        SnakeMgr.instance.walls = [];
        for(let i = 0;i < SnakeConfig.MAX_X;i ++){
            SnakeMgr.instance.walls.push(cc.v2(i,0));
            SnakeMgr.instance.walls.push(cc.v2(i,SnakeConfig.MAX_Y - 1));
        }

        for(let i = 0;i < SnakeConfig.MAX_Y;i ++){
            SnakeMgr.instance.walls.push(cc.v2(0,i));
            SnakeMgr.instance.walls.push(cc.v2(SnakeConfig.MAX_X - 1,i));
        }
        SnakeMgr.instance.walls.forEach((pos) =>{
            let wall = cc.instantiate(this.wall);
            wall.position = SnakeConfig.getPosByXY(pos.x,pos.y);
            this.content.addChild(wall);
        });
    }

    private initSnake(){ 
        let snakeItem = cc.instantiate(this.snakeItem);
        this.content.addChild(snakeItem);
        let randXY:cc.Vec2 = cc.v2(0,0);
        while(true){
            randXY = cc.v2(Math.floor(Math.random() * SnakeConfig.MAX_X),Math.floor(Math.random() * SnakeConfig.MAX_Y));
           if(SnakeMgr.instance.checkContain(randXY.x,randXY.y)){
           }else{
               break;;
           }
        }
        SnakeMgr.instance.snakeHead = snakeItem.getComponent(SnakeBase);
        SnakeMgr.instance.snakes = [];
        SnakeMgr.instance.snakes.push(SnakeMgr.instance.snakeHead);
        SnakeMgr.instance.snakeHead.init(randXY.x,randXY.y,null,null);

    }

    private createPoint():void {
        this.point.parent = this.content;
        let randXY:cc.Vec2 = cc.v2(0,0);
        while(true){
             randXY = cc.v2(Math.floor(Math.random() * SnakeConfig.MAX_X),Math.floor(Math.random() * SnakeConfig.MAX_Y));
            if(SnakeMgr.instance.checkContain(randXY.x,randXY.y)){
            }else{
                break;;
            }
        }
        this.point.position = SnakeConfig.getPosByXY(randXY.x,randXY.y);
        SnakeMgr.instance.pointX = randXY.x;
        SnakeMgr.instance.pointY = randXY.y;
        this.point.active = true;
    }

    private nextStep(){
        let snakeItem = cc.instantiate(this.snakeItem);
        this.content.addChild(snakeItem);
        let lastSnake = SnakeMgr.instance.snakes[SnakeMgr.instance.snakes.length - 1];
        let comp = snakeItem.getComponent(SnakeBase);
        SnakeMgr.instance.snakes.push(comp);

        comp.init(lastSnake.lastX,lastSnake.lastY, lastSnake,null);
        lastSnake.after = comp;
        this.createPoint();
    }

    private addEvents(){
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStartEvent,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEndEvent,this);

    }

    private t_start_pos:cc.Vec2 = cc.v2(0,0);
    private onTouchStartEvent(e:cc.Event.EventTouch):void{
        this.t_start_pos = e.getLocation();
    }
    private onTouchEndEvent(e:cc.Event.EventTouch):void{
        console.log("onTouchEndEvent")
        let d_x = e.getLocation().x - this.t_start_pos.x;
        let d_y = e.getLocation().y - this.t_start_pos.y;
        let direction = DIRECTION.left;
        if(Math.abs(d_x) > Math.abs(d_y)){
            if(d_x > 0){
                direction = DIRECTION.right;
            }
        }else{
            if(d_y > 0){
                direction = DIRECTION.up;
            }else{
                direction = DIRECTION.down;
            }
        }
        if(SnakeMgr.instance.snakeHead.direction + direction == 0){

        }else{
            SnakeMgr.instance.snakeHead.direction= direction;
        }
    }

    start () {

    }

    // update (dt) {}
}
