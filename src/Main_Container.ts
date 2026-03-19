import Container = PIXI.Container;
import Bookmark_Grid from "./Bookmark_Grid";
import Background from "./Background";
import Scrollbar from "./Scrollbar";
import Global from "./Global";
import { InteractionEvent, IPoint } from "pixi.js";
import { Main } from "./Main";

export default class Main_Container extends Container {
	private _level:ILevel;
	private _wheelHandler:()=>void;
	private _background:Background;
	private _bookmarkGrid:Bookmark_Grid;
	private _scrollbar:Scrollbar;
	private _scrollbarTouchDownY:number;

	constructor() {
		super();
		this._level = Global.JSON_LOADER.response;
		this.startAll();
	}

	private startAll():void {
		this.createBackground();
		this.createBookmarks();

		if (this._bookmarkGrid.height > this._background.height) {
			this._wheelHandler = Main_Container.addEvent(document, "wheel", this.movingContentForWheel.bind(this));
			this.createScrollbar();

			this._scrollbar.thumb.addListener('pointerdown', this.scrollbarPointerdown, this);
			this._scrollbar.thumb.addListener('pointerup', this.scrollbarPointerup, this);
			this._scrollbar.thumb.addListener('pointerupoutside', this.scrollbarPointerup, this);
		}
	}

	private createBackground():void {
		this._background = new Background();
		this.addChild(this._background);
	}

	private createBookmarks():void {
		this._bookmarkGrid = new Bookmark_Grid(Global.JSON_LOADER.response);
		this._bookmarkGrid.x = (Global.WINDOW_WIDTH - this._bookmarkGrid.width) / 2;
		this._bookmarkGrid.y = Global.GAP * 5;
		this.addChild(this._bookmarkGrid);

		let lineWidthCorrection:number = 1;
		let maskX:number = 0;
		let maskY:number = Global.GAP * 5 - lineWidthCorrection;
		let maskWidth:number = Global.WINDOW_WIDTH;
		let maskHeight:number = Global.WINDOW_HEIGHT - Global.GAP * 7 + lineWidthCorrection*2;
		let bookmarkGridMask:PIXI.Graphics = new PIXI.Graphics

		bookmarkGridMask
			.beginFill(0xffffff)
			.drawRect(maskX, maskY, maskWidth, maskHeight);
		this.addChild(bookmarkGridMask);
		this._bookmarkGrid.mask = bookmarkGridMask;
	}

	private createScrollbar():void {
		const thumbHeight:number = Global.WINDOW_HEIGHT * (Global.WINDOW_HEIGHT  / (this._bookmarkGrid.height + Global.GAP*7));
		this._scrollbar = new Scrollbar(thumbHeight);
		this._scrollbar.x = Global.WINDOW_WIDTH - (this._scrollbar.width + Global.GAP) / 2;
		this._scrollbar.y = Global.GAP;
		this._scrollbar.height = Global.WINDOW_HEIGHT - Global.GAP*2;
		this.addChild(this._scrollbar);
	}

	private movingContentForWheel(wheelEvent:WheelEvent):void {															//wheel event
		const delta:number = 30 * (wheelEvent.deltaY > 0 ? 1 : -1);
		if (wheelEvent.deltaY > 0){
			this._scrollbar.thumb.y += Math.abs(delta);
		} else {
			this._scrollbar.thumb.y -= Math.abs(delta);
		}
		this.dragLimits();
		this.bookmarkGridMoving();
	}

	private bookmarkGridMoving():void {
		this._bookmarkGrid.y = Global.GAP * 5 - this._scrollbar.thumb.y * (Global.WINDOW_HEIGHT / (this._scrollbar.thumb.height ));
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

	private scrollbarPointerdown(event:InteractionEvent):void {
		this._scrollbarTouchDownY = this._scrollbar.thumb.toLocal(event.data.global).y;
		this._scrollbar.thumb.addListener('pointermove', this.scrollbarOnDragMove, this);
		this._scrollbar.thumb.tint =  0x80baf3;
	}

	private scrollbarOnDragMove(event:InteractionEvent):void {
		const newPosition:IPoint = event.data.getLocalPosition(this._scrollbar);
		this._scrollbar.thumb.y = newPosition.y - this._scrollbarTouchDownY;
		this.bookmarkGridMoving();
		this.dragLimits();
	}

	private scrollbarPointerup():void {
		this._scrollbarTouchDownY = 0;
		this._scrollbar.thumb.removeListener('pointermove', this.scrollbarOnDragMove, this);
		this._scrollbar.thumb.tint =  0xffffff;
	}

	private dragLimits():void {
		if (this._scrollbar.thumb.y <= 0) {
			this._scrollbar.thumb.y = 0;
		} else if (this._scrollbar.thumb.y >= Global.WINDOW_HEIGHT - this._scrollbar.thumb.height) {
			this._scrollbar.thumb.y = Global.WINDOW_HEIGHT - this._scrollbar.thumb.height;
		}

		if (this._bookmarkGrid.y >= Global.GAP*5) {
			this._bookmarkGrid.y = Global.GAP*5;
		} else if (this._bookmarkGrid.y <= Global.WINDOW_HEIGHT - this._bookmarkGrid.height - Global.GAP*2) {
			this._bookmarkGrid.y = Global.WINDOW_HEIGHT - this._bookmarkGrid.height - Global.GAP*2;
		}
	}
}
