import Bookmark from "./Bookmark";
import Global from "./Global";
import Container = PIXI.Container;
import "pixi.js";

export default class Bookmark_Grid extends Container {
    private _level:ILevel;

    constructor(level:ILevel) {
        super();
            this._level = level;
            this.createBookmarks();
        }

        private createBookmarks():void {
        let bookmarkX:number = 0;
        let bookmarkY:number = 0;
        let colorRed:string = "20";
        let colorGreen:string = "50";
        let colorBlue:string = "80";
        let changeColorStep:number = 20;

        if (this._level != null) {
            for (let iterator: number = 0; iterator < this._level.items.length; iterator++) {
                let bgColor: string = colorRed + colorGreen + colorBlue;
                console.log("color = " + bgColor);
                let bookmark: Bookmark = new Bookmark(
                    this._level.items[iterator].mapX,
                    this._level.items[iterator].mapY,
                    () => {
                        this.buttonClick(this._level.items[iterator].link);
                    },
                    parseInt(bgColor, 16));
                this.addChild(bookmark);
                bookmark.x = bookmarkX;
                bookmark.y = bookmarkY;
                bookmarkX += bookmark.width + Global.GAP;

                if (bookmarkX + bookmark.width > Global.WINDOW_WIDTH - Global.GAP*3) {
                    bookmarkX = 0;
                    bookmarkY += bookmark.height + Global.GAP;

                    let testcolorBlue = Math.abs(Number(colorBlue));
                    let changeBlue: number = testcolorBlue -= changeColorStep;
                    colorBlue = changeBlue as any as string;

                    let testcolorRed = Math.abs(Number(colorRed));
                    let changeRed: number = testcolorRed += changeColorStep;
                    colorRed = changeRed as any as string;

                    if (colorBlue == "80") {
                        changeColorStep = 20
                    } else if (colorBlue == "20") {
                        changeColorStep = -20
                    }

                    console.log(changeColorStep)
                }
            }
        }
    }

    private buttonClick(link:string):void {
        console.log("click");
        window.open(link, '_blank')
    }
}
