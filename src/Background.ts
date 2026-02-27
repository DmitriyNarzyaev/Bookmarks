import Container = PIXI.Container;
import "pixi.js";
import Global from "./Global";
import {TextStyle} from "pixi.js";

export default class Background extends Container {
    private _background:PIXI.Graphics;

    constructor() {
        super();
        this.background();
        this.title();
    }

    private background():void {
        let bgX:number = Global.GAP;
        let bgY:number = Global.GAP;
        let bgWidth:number = Global.WINDOW_WIDTH - Global.GAP * 2;
        let bgHeight:number = Global.WINDOW_HEIGHT - Global.GAP * 2;

        this._background = new PIXI.Graphics;
        this._background.lineStyle(2, 0x004477);
        this._background.beginFill(0x226699);
        this._background.drawRect(bgX, bgY, bgWidth, bgHeight);
        this.addChild(this._background);
    }

    private title():void {
        let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'times new roman',
            fontSize: 60,
            fill: [0x123321],
            align: 'center'
        });

        let contentText:PIXI.Text = new PIXI.Text ("BOOKMARKS", textStyle);
        contentText.x = (Global.WINDOW_WIDTH - contentText.width) / 2;
        contentText.y = Global.GAP * 1.5;
        this.addChild(contentText);
    }
}