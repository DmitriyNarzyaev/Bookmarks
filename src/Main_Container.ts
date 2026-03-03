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
		let background = new Background();
		this.addChild(background);
	}

	private createBookmarks():void {
		if (! this._bookmarkContainer) {
			this._bookmarkContainer = new PIXI.Container;
			this._bookmarkContainer.x = Global.GAP * 2;
			this._bookmarkContainer.y = Global.GAP * 5.5;
			this.addChild(this._bookmarkContainer);
		}

		let bookmarkX:number = 0;
		let bookmarkY:number = 0;
		let colorRed:string = "10";
		let colorGreen:string = "50";
		let colorBlue:string = "90";
		let changeColorStep:number = 15

		if (this._level != null) {
			for (let iterator:number = 0; iterator < this._level.items.length; iterator++) {
				let bgColor:string = colorRed + colorGreen + colorBlue;
				console.log("color = " + bgColor);
				let bookmark:Bookmark = new Bookmark(
					this._level.items[iterator].mapX,
					this._level.items[iterator].mapY,
					()=>{this.buttonClick(this._level.items[iterator].link);},
					parseInt(bgColor, 16));
				this._bookmarkContainer.addChild(bookmark);
				bookmark.x = bookmarkX;
				bookmark.y = bookmarkY;
				bookmarkX += bookmark.width + Global.GAP;

				if (bookmarkX + bookmark.width > Global.WINDOW_WIDTH) {
					bookmarkX = 0;
					bookmarkY += bookmark.height + Global.GAP;

					let testcolorBlue = Math.abs(Number(colorBlue));
					let changeBlue:number = testcolorBlue -= changeColorStep;
					colorBlue = changeBlue as any as string;

					let testcolorRed = Math.abs(Number(colorRed));
					let changeRed:number = testcolorRed += changeColorStep;
					colorRed = changeRed as any as string;
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
