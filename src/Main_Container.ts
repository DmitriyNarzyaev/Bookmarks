import Background from "./Background";
import Bookmark from "./Bookmark";
import Global from "./Global";
import Container = PIXI.Container;
import "pixi.js";

export default class Main_Container extends Container {
	public static JSON_LOADER:XMLHttpRequest;
	private _bookmarkContainer:PIXI.Container;
	private _level:ILevel;

	constructor() {
		super();
		this.jsonLoader();
	}

	private jsonLoader():void {
		Main_Container.JSON_LOADER = new XMLHttpRequest();
		Main_Container.JSON_LOADER.responseType = "json";

		Main_Container.JSON_LOADER.open("GET", "base.json", true);
		Main_Container.JSON_LOADER.onreadystatechange = () => {
			this._level = Main_Container.JSON_LOADER.response;
			this.createBackground();
			this.createBookmarks();
		};
		Main_Container.JSON_LOADER.send();

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

		let bookmarkX:number = 0;
		let bookmarkY:number = 0;

		if (this._level != null) {
			for (let iterator:number = 0; iterator < this._level.items.length; iterator++) {
				let bookmark:Bookmark = new Bookmark(
					this._level.items[iterator].name,
					()=>{this.buttonClick(this._level.items[iterator].link);});
				this._bookmarkContainer.addChild(bookmark);
				bookmark.x = bookmarkX;
				bookmark.y = bookmarkY;
				bookmarkX += bookmark.width + Global.GAP;

				if (bookmarkX + bookmark.width > Global.WINDOW_WIDTH) {
					bookmarkX = 0;
					bookmarkY += bookmark.height + Global.GAP;
				}
			}
		}
		this._bookmarkContainer.x = (Global.WINDOW_WIDTH - this._bookmarkContainer.width) / 2;
	}

	private buttonClick(link:string):void {
		console.log("click");
		window.open(link, '_blank')
	}
}
