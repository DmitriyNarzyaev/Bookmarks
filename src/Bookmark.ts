import Container = PIXI.Container;
import "pixi.js";

export default class Bookmark extends Container {
    private _backgroundWidth:number = 350
    private _backgroundHeight:number = 200

    constructor() {
        super();
        this.bookmarkBackground();
    }

    private bookmarkBackground():void {
        let background:PIXI.Graphics = new PIXI.Graphics;
        background.lineStyle(2, 0x004477);
        background.beginFill(0x3F888F);
        background.drawRect(0, 0, this._backgroundWidth, this._backgroundHeight);
        this.addChild(background);
    }
}