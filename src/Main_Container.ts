import Container = PIXI.Container;
import "pixi.js";
import Global from "./Global";
import {TextStyle} from "pixi.js";

export default class Main_Container extends Container {
	private _background:PIXI.Graphics;
	private _gap:number = 20;

	constructor() {
		super();
		this.background();
		this.createTitle();
	}

	private background():void {
		let bgX:number = this._gap;
		let bgY:number = this._gap;
		let bgWidth:number = Global.WINDOW_WIDTH - bgX * 2;
		let bgHeight:number = Global.WINDOW_HEIGHT - bgY * 2;

		this._background = new PIXI.Graphics;
		this._background.lineStyle(2, 0x004477);
		this._background.beginFill(0x226699);
		this._background.drawRect(bgX, bgY, bgWidth, bgHeight);
		this.addChild(this._background);
	}

	private createTitle():void {
		let textStyle:TextStyle = new PIXI.TextStyle ({
			fontFamily: 'times new roman',
			fontSize: 60,
			fill: [0x123321],
			align: 'center'
		});

		let contentText:PIXI.Text = new PIXI.Text ("BOOKMARKS", textStyle);
		contentText.x = (Global.WINDOW_WIDTH - contentText.width) / 2;
		contentText.y = this._gap * 1.5;
		this.addChild(contentText);
	}
}
