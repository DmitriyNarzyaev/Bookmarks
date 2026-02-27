import Background from "./Background";
import Container = PIXI.Container;
import "pixi.js";

export default class Main_Container extends Container {
	private _background:Background;

	constructor() {
		super();
		this.createBackground();
	}

	private createBackground():void {
		this._background = new Background();
		this.addChild(this._background);
	}
}
