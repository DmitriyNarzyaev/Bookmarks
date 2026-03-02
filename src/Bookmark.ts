import Container = PIXI.Container;
import "pixi.js";
import { Sprite } from "pixi.js";

export default class Bookmark extends Container {
    private _backgroundWidth:number = 350
    private _backgroundHeight:number = 200
    private readonly _callback:()=>void;

    constructor(spriteNumber:number, callback:()=>void = null) {
        super();
        this._callback = callback;
        this.bookmarkBackground();
        this.createImage(spriteNumber);
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

    private createImage(spriteNumber:number):void {
        let textureX:number = spriteNumber * 350;
        let textureY:number = 0;
        let textureWidth:number = 350;
        let textureHeight:number = 200;
        let mapTexture:any = new PIXI.Texture(PIXI.utils.TextureCache["mapLogo"]);
        mapTexture.frame = new PIXI.Rectangle(textureX, textureY, textureWidth, textureHeight);
        let image:PIXI.Sprite = new PIXI.Sprite(mapTexture);
        this.addChild(image);
    }

    private pointerTabHandler():void {
        this._callback();
    }
}