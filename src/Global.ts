import Application = PIXI.Application;

export default class Global {
    public static readonly WINDOW_WIDTH:number = window.innerWidth;
    public static readonly WINDOW_HEIGHT:number = window.innerHeight;
    public static readonly GAP:number = 20;
    public static JSON_LOADER:XMLHttpRequest;
    public static PIXI_APP:Application;
}
