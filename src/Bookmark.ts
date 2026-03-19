import Container = PIXI.Container;
import "pixi.js";

export default class Bookmark extends Container {
    private _backgroundWidth:number = 350
    private _backgroundHeight:number = 200
    private readonly _callback:()=>void;

    constructor(spriteX:number,spriteY:number, callback:()=>void = null, bgColor:number) {
        super();
        this._callback = callback;
        this.bookmarkBackground(bgColor);
        this.createImage(spriteX, spriteY);
        this.interactive = true;
        this.buttonMode = true;
        if (callback) {
            this.addListener('pointertap', this.pointerTabHandler, this);
        }
    }

    private bookmarkBackground(bgColor:number):void {
        let background:PIXI.Graphics = new PIXI.Graphics;
        background.lineStyle(1, 0x123321);
        background.beginFill(bgColor);
        background.drawRect(0, 0, this._backgroundWidth, this._backgroundHeight);
        this.addChild(background);
    }

    private createImage(spriteX:number, spriteY:number):void {
        let textureX:number = spriteX;
        let textureY:number = spriteY;
        let textureWidth:number = 350;
        let textureHeight:number = 200;
        let mapTexture:any = new PIXI.Texture(PIXI.utils.TextureCache["mapOfLogo"]);
        mapTexture.frame = new PIXI.Rectangle(textureX, textureY, textureWidth, textureHeight);
        let image:PIXI.Sprite = new PIXI.Sprite(mapTexture);
        this.addChild(image);
    }

    private pointerTabHandler():void {
        this._callback();
    }
}
