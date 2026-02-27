import Background from "./Background";
import Bookmark from "./Bookmark";
import Global from "./Global";
import Container = PIXI.Container;
import "pixi.js";

export default class Main_Container extends Container {
	private _bookmarkContainer:PIXI.Container;

	constructor() {
		super();
		this.createBackground();
		this.createBookmarks();
	}

	private createBackground():void {
		let background = new Background();
		this.addChild(background);
	}

	private createBookmarks():void {
		this._bookmarkContainer = new PIXI.Container;
		this._bookmarkContainer.x = Global.GAP * 2;
		this._bookmarkContainer.y = Global.GAP * 5.5;
		this.addChild(this._bookmarkContainer);

		let bookmark:Bookmark = new Bookmark();
		this._bookmarkContainer.addChild(bookmark);
	}
}
