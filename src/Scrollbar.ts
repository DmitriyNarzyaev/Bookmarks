import Global from "./Global";
import Container = PIXI.Container;

export default class Scrollbar extends Container {
    public thumb :PIXI.Graphics;
    private _track:PIXI.Graphics;
    private readonly _trackHeight:number = Global.WINDOW_HEIGHT;
    private readonly _scrollbarWidth:number = Global.GAP - 2;
    private readonly _thumbHeight:number;

    constructor(thumbHeight:number){
        super();
        this._thumbHeight = thumbHeight;
        this.createTrack();
        this.createThumb();
    }

    private createTrack():void {
        this._track = new PIXI.Graphics;
        this._track
            .beginFill(0x005577, .5)
            .drawRoundedRect(0, 0, this._scrollbarWidth, this._trackHeight, this._scrollbarWidth/2);
        this.addChild(this._track);
    }

    private createThumb():void {
        this.thumb = new PIXI.Graphics;
        this.thumb
            .lineStyle(1, 0x004477, 1, 0)
            .beginFill(0x226699)
            .drawRoundedRect(0, 0, this._scrollbarWidth, this._thumbHeight, this._scrollbarWidth/2);
        this.thumb.interactive = true;
        this.thumb.buttonMode = true;
        this.addChild(this.thumb);
    }
}
