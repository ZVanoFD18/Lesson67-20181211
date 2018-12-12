var Task;
(function (Task) {
    /**
     * Интерфейс описывает одну точку в 2D системе координат
     */
    var IPoint = /** @class */ (function () {
        function IPoint() {
        }
        return IPoint;
    }());
    /**
     * Класс-коллекция.
     * Зранит только объекты интерфейса IPoint.
     */
    var PointCollection = /** @class */ (function () {
        function PointCollection() {
            // this.points = [];
        }
        ;
        PointCollection.prototype.getCount = function () {
            return this.points.length;
        };
        ;
        PointCollection.prototype.get = function (index) {
            if (this.getCount() < index) {
                return null;
            }
            return this.points[index];
        };
        ;
        PointCollection.prototype.add = function (point) {
            this.points.push(point);
        };
        ;
        return PointCollection;
    }());
    /**
     * Класс, для хранения массива JSON-ов.
     */
    var JsonXYList = /** @class */ (function () {
        function JsonXYList() {
            this.list = [];
        }
        JsonXYList.prototype.addXY = function (x, y) {
            this.list.push({
                x: x,
                y: y
            });
        };
        ;
        JsonXYList.prototype.getXY = function (index) {
            if (this.list.length < index) {
                return false;
            }
            return this.list[index];
        };
        ;
        return JsonXYList;
    }());
    /**
     * Адаптер.
     * Позволяет использовать объект JsonXYList, как будто он класса JsonXYList (по интерфейсу IPointCollection)
     */
    var AdapteerJsonXYList2PointCollection = /** @class */ (function () {
        function AdapteerJsonXYList2PointCollection(items) {
            this.jXYList = items;
        }
        AdapteerJsonXYList2PointCollection.prototype.setList = function (list) {
            this.jXYList = list;
        };
        AdapteerJsonXYList2PointCollection.prototype.getCount = function () {
            return this.jXYList.list.length;
        };
        ;
        AdapteerJsonXYList2PointCollection.prototype.get = function (index) {
            var item = this.jXYList.getXY(index);
            if (item === false) {
                return null;
            }
            var result = new IPoint();
            result.x = item.x;
            result.y = item.y;
            return result;
        };
        ;
        AdapteerJsonXYList2PointCollection.prototype.add = function (point) {
            this.jXYList.addXY(point.x, point.y);
        };
        ;
        return AdapteerJsonXYList2PointCollection;
    }());
    Task.AdapteerJsonXYList2PointCollection = AdapteerJsonXYList2PointCollection;
    var App = /** @class */ (function () {
        function App() {
        }
        /**
         * Этот метод рисует график.
         * Вот тут и применяется адаптер.
         * @param {PointCollection} points
         * @param {HTMLCanvasElement} canvas
         */
        App.draw = function (points, canvas) {
            /**
             * @type {CanvasRenderingContext2D}
             */
            var ctx = canvas.getContext("2d");
            ctx.strokeStyle = '#ff00cc';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0, len = points.getCount(); i < len; i++) {
                var point = points.get(i);
                console.log(i, point);
                ctx.lineTo(point.x, point.y);
            }
            ctx.stroke();
        };
        ;
        /**
         * Наполнение данніми из формы выполняется сюда.
         */
        App.jXYList = new JsonXYList();
        return App;
    }());
    Task.App = App;
})(Task || (Task = {}));
