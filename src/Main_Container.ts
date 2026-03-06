import Bookmark_Grid from "./Bookmark_Grid";
import Background from "./Background";
import Global from "./Global";
import Container = PIXI.Container;
import "pixi.js";

export default class Main_Container extends Container {
	public static JSON_LOADER:XMLHttpRequest;
	private _level:ILevel;
	private _background:Background;
	private _bookmarkGrid:Bookmark_Grid;
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
			if (this._level != null) {
				this.pictureLoader();
			}
		};
		Main_Container.JSON_LOADER.send();
	}

	private pictureLoader():void {
		const loader:PIXI.Loader = new PIXI.Loader();
		loader
			.add("mapOfLogo", "MapOfLogo.png")
		loader.load(()=> {
			this.createBackground();
			this.createBookmarks();
		});
	}

	private createBackground():void {
		this._background = new Background();
		this.addChild(this._background);
	}

	private createBookmarks():void {
		this._bookmarkGrid = new Bookmark_Grid(Main_Container.JSON_LOADER.response);
		this._bookmarkGrid.x = (Global.WINDOW_WIDTH - this._bookmarkGrid.width) / 2;
		this._bookmarkGrid.y = Global.GAP * 5;
		this.addChild(this._bookmarkGrid);
	}
}
