namespace Task {
    /**
     * Интерфейс описывает одну точку в 2D системе координат
     */
    class IPoint {
        x: number;
        y: number;
    }

    /**
     * Интерфейс коллекции точек.
     */
    interface IPointCollection {
        getCount(): number;
        get(index: number): IPoint;
        add(point: IPoint): void;
    }

    /**
     * Класс-коллекция.
     * Зранит только объекты интерфейса IPoint.
     */
    class PointCollection implements IPointCollection{
        private points: [IPoint];

        constructor() {
            // this.points = [];
        };

        public getCount(): number {
            return this.points.length;
        };

        public get(index: number): IPoint {
            if (this.getCount() < index) {
                return null;
            }
            return this.points[index];
        };

        public add(point: IPoint): void {
            this.points.push(point);
        };
    }

    /**
     * Класс, для хранения массива JSON-ов.
     */
    class JsonXYList {
        public list = [];

        public addXY(x: number, y: number) {
            this.list.push({
                x: x,
                y: y
            });
        };

        public getXY(index: number) {
            if (this.list.length < index) {
                return false;
            }
            return this.list[index];
        };
    }

    /**
     * Адаптер.
     * Позволяет использовать объект JsonXYList, как будто он класса JsonXYList (по интерфейсу IPointCollection)
     */
    export class AdapteerJsonXYList2PointCollection implements IPointCollection{
        private jXYList: JsonXYList;

        constructor(items: JsonXYList) {
            this.jXYList = items;
        }
        setList(list:JsonXYList){
            this.jXYList = list;
        }
        getCount(): number{
            return this.jXYList.list.length;
        };
        get(index: number): IPoint{
            let item =  this.jXYList.getXY(index);
            if(item === false){
                return null;
            }
            let result = new IPoint();
            result.x = item.x;
            result.y = item.y;
            return result;
        };
        add(point: IPoint): void{
            this.jXYList.addXY(point.x, point.y);
        };
    }
    export class App {
        /**
         * Наполнение данніми из формы выполняется сюда.
         */
        static jXYList:JsonXYList=new JsonXYList();

        /**
         * Этот метод рисует график.
         * Вот тут и применяется адаптер.
         * @param {PointCollection} points
         * @param {HTMLCanvasElement} canvas
         */
        static draw(points:PointCollection, canvas){
            /**
             * @type {CanvasRenderingContext2D}
             */
            let ctx = canvas.getContext("2d");
            ctx.strokeStyle = '#ff00cc';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let i=0, len = points.getCount(); i < len; i++ ){
                let point = points.get(i);
                console.log(i, point);
                ctx.lineTo(point.x, point.y);
            }
            ctx.stroke();
        };
    }
}