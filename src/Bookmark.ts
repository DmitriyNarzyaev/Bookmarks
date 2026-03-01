import Container = PIXI.Container;
import "pixi.js";
import { Sprite } from "pixi.js";

export default class Bookmark extends Container {
    private _backgroundWidth:number = 350
    private _backgroundHeight:number = 200
    private readonly _callback:()=>void;

    constructor(spriteName:string, callback:()=>void = null) {
        super();
        this._callback = callback;
        this.bookmarkBackground();
        this.createImage(spriteName);
        this.interactive = true;
        this.buttonMode = true;
        if (callback) {
            this.addListener('pointertap', this.pointerTabHandler, this);
        }
    }

    private bookmarkBackground():void {
        let background:PIXI.Graphics = new PIXI.Graphics;
        background.lineStyle(2, 0xffffff);
        background.beginFill(0x3F888F);
        background.drawRect(0, 0, this._backgroundWidth, this._backgroundHeight);
        this.addChild(background);
    }

    private createImage(spriteName:string):void {
        let background:PIXI.Sprite = Sprite.from(spriteName);
        this.addChild(background);
    }

    private pointerTabHandler():void {
        this._callback();
    }
}