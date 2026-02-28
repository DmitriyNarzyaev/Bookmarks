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

		let name:string = "Google";
		let link:string = "https://google.com";

		let bookmarkX:number = 0;
		let bookmarkY:number = 0;

		for (let iterator:number = 0; iterator < 9; iterator++) {
			let bookmark:Bookmark = new Bookmark(
				name,
				()=>{this.buttonClick(link);});
			this._bookmarkContainer.addChild(bookmark);
			bookmark.x = bookmarkX;
			bookmark.y = bookmarkY;
			bookmarkX += bookmark.width + Global.GAP;

			if (bookmarkX + bookmark.width > Global.WINDOW_WIDTH) {
				bookmarkX = 0;
				bookmarkY += bookmark.height + Global.GAP;
			}
		}

		this._bookmarkContainer.x = (Global.WINDOW_WIDTH - this._bookmarkContainer.width) / 2;
	}

	private buttonClick(link:string):void {
		console.log("click");
		window.open(link, '_blank')
	}
}
