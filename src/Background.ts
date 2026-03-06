import Container = PIXI.Container;
import "pixi.js";
import Bookmark_Text from "./Bookmark_Text";
import Global from "./Global";

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
        let textSize:number;
        Global.WINDOW_WIDTH > Global.WINDOW_HEIGHT ? textSize = 60 : textSize = Global.WINDOW_WIDTH/15;
        let title:Bookmark_Text = new Bookmark_Text(textSize, "BOOKMARKS", 0x123321 );

        title.x = (Global.WINDOW_WIDTH - title.width) / 2;
        title.y = Global.GAP * 1.5;
        this.addChild(title);
    }
}
