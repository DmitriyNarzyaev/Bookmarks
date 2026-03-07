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
	private _wheelHandler:()=>void;

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
			if (this._bookmarkGrid.height > this._background.height) {
				this._wheelHandler = Main_Container.addEvent(document, "wheel", this.movingContentForWheel.bind(this));
			}
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

		let lineWidthCorrection:number = 1;
		let maskX:number = 0;
		let maskY:number = Global.GAP + lineWidthCorrection;																				//2 = background line width
		let maskWidth:number = Global.WINDOW_WIDTH;
		let maskHeight:number = Global.WINDOW_HEIGHT - Global.GAP * 2 - lineWidthCorrection * 2;
		let bookmarkGridMask:PIXI.Graphics = new PIXI.Graphics
		bookmarkGridMask
			.beginFill(0xffffff)
			.drawRect(maskX, maskY, maskWidth, maskHeight);
		this.addChild(bookmarkGridMask);
		this._bookmarkGrid.mask = bookmarkGridMask;
	}

	private movingContentForWheel(wheelEvent:WheelEvent):void {															//wheel event
		const delta:number = 30 * (wheelEvent.deltaY > 0 ? 1 : -1);
		if (wheelEvent.deltaY > 0){
			this._bookmarkGrid.y -= Math.abs(delta);
		} else {
			this._bookmarkGrid.y += Math.abs(delta);
		}
		this.dragLimits();
	}

	private static addEvent(object:any, type:string, callback:() => void):() => void {									//wheel event
		if (object.addEventListener) {
			object.addEventListener(type, callback, false);
		} else if (object.attachEvent) {
			object.attachEvent("on" + type, callback);
		} else {
			object["on" + type] = callback;
		}
		return callback;
	}

	private dragLimits():void {
		if (this._bookmarkGrid.y <= Global.WINDOW_HEIGHT - this._bookmarkGrid.height - Global.GAP) {
			this._bookmarkGrid.y = Global.WINDOW_HEIGHT - this._bookmarkGrid.height - Global.GAP;
		} else if (this._bookmarkGrid.y >= Global.GAP*5) {
			this._bookmarkGrid.y = Global.GAP*5;
		}
	}
}
