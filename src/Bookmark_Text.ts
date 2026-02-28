import Container = PIXI.Container;
import "pixi.js";
import {TextStyle} from "pixi.js";

export default class Bookmark_Text extends Container {

    constructor(size:number, text:string, color:number) {
        super();
        this.bookmarkBackground(size, text, color);
    }

    private bookmarkBackground(size:number, text:string, color:number):void {
        let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'times new roman',
            fontSize: size,
            fill: [color],
            align: 'center'
        });

        let contentText:PIXI.Text = new PIXI.Text (text, textStyle);
        this.addChild(contentText);
    }
}