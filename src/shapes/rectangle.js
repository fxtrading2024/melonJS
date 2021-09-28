import Vector2d from "./../math/vector2.js";
import Polygon from "./poly.js";

/**
 * @classdesc
 * a rectangle Object
 * @class
 * @extends me.Polygon
 * @memberOf me
 * @constructor
 * @param {Number} x position of the Rectangle
 * @param {Number} y position of the Rectangle
 * @param {Number} w width of the rectangle
 * @param {Number} h height of the rectangle
 */

class Rect extends Polygon {

    constructor(x, y, w, h) {
        // parent constructor
        super(x, y, [
            new Vector2d(0, 0), // 0, 0
            new Vector2d(w, 0), // 1, 0
            new Vector2d(w, h), // 1, 1
            new Vector2d(0, h)  // 0, 1
        ]);
        this.shapeType = "Rectangle";
    }

    /** @ignore */
    onResetEvent(x, y, w, h) {
        this.setShape(x, y, w, h);
    }

    /**
     * set new value to the rectangle shape
     * @name setShape
     * @memberOf me.Rect.prototype
     * @function
     * @param {Number} x position of the Rectangle
     * @param {Number} y position of the Rectangle
     * @param {Number|Array} w|points width of the rectangle, or an array of vector defining the rectangle
     * @param {Number} [h] height of the rectangle, if a numeral width parameter is specified
     * @return {me.Rect} this rectangle
     */
    setShape(x, y, w, h) {
        var points = w; // assume w is an array by default

        this.pos.set(x, y);

        if (arguments.length === 4) {
            points = this.points;
            points[0].set(0, 0); // 0, 0
            points[1].set(w, 0); // 1, 0
            points[2].set(w, h); // 1, 1
            points[3].set(0, h); // 0, 1
        }

        this.setVertices(points);
        return this;
    }


    /**
     * left coordinate of the Rectangle
     * @public
     * @type {Number}
     * @name left
     * @memberOf me.Rect
     */

    /**
     * @ignore
     */
    get left() {
        return this.pos.x;
    }

    /**
     * right coordinate of the Rectangle
     * @public
     * @type {Number}
     * @name right
     * @memberOf me.Rect
     */

    /**
     * @ignore
     */
    get right() {
        var w = this.width;
        return (this.pos.x + w) || w;
    }

    /**
     * top coordinate of the Rectangle
     * @public
     * @type {Number}
     * @name top
     * @memberOf me.Rect
     */

    /**
     * @ignore
     */
    get top() {
        return this.pos.y;
    }

    /**
     * bottom coordinate of the Rectangle
     * @public
     * @type {Number}
     * @name bottom
     * @memberOf me.Rect
     */

    /**
     * @ignore
     */
    get bottom() {
        var h = this.height;
        return (this.pos.y + h) || h;
    }

    /**
     * width of the Rectangle
     * @public
     * @type {Number}
     * @name width
     * @memberOf me.Rect
     */

    /**
     * @ignore
     */
    get width() {
        return this.points[2].x;
    }
    /**
     * @ignore
     */
    set width(value) {
        this.points[1].x = this.points[2].x = value;
        this.recalc();
        this.updateBounds();
    }

    /**
     * height of the Rectangle
     * @public
     * @type {Number}
     * @name height
     * @memberOf me.Rect
     */

    /**
     * @ignore
     */
    get height() {
        return this.points[2].y;
    }
    /**
     * @ignore
     */
    set height(value) {
        this.points[2].y = this.points[3].y = value;
        this.recalc();
        this.updateBounds();
    }

    /**
     * absolute center of this rectangle on the horizontal axis
     * @public
     * @type {Number}
     * @name centerX
     * @memberOf me.Rect
     */

    /**
     * @ignore
     */
    get centerX() {
        if (isFinite(this.width)) {
            return this.pos.x + (this.width / 2);
        } else {
            return this.width;
        }
    }

    /**
     * @ignore
     */
    set centerX (value) {
        this.pos.x = value - (this.width / 2);
    }

    /**
     * absolute center of this rectangle on the vertical axis
     * @public
     * @type {Number}
     * @name centerY
     * @memberOf me.Rect
     */

    /**
     * @ignore
     */
    get centerY() {
        if (isFinite(this.height)) {
            return this.pos.y + (this.height / 2);
        } else {
            return this.height;
        }
    }
    
    /**
     * @ignore
     */
    set centerY(value) {
        this.pos.y = value - (this.height / 2);
    }

    /**
     * resize the rectangle
     * @name resize
     * @memberOf me.Rect.prototype
     * @function
     * @param {Number} w new width of the rectangle
     * @param {Number} h new height of the rectangle
     * @return {me.Rect} this rectangle
     */
    resize(w, h) {
        this.width = w;
        this.height = h;
        return this;
    }

    /**
     * scale the rectangle
     * @name scale
     * @memberOf me.Rect.prototype
     * @function
     * @param {Number} x a number representing the abscissa of the scaling vector.
     * @param {Number} [y=x] a number representing the ordinate of the scaling vector.
     * @return {me.Rect} this rectangle
     */
    scale(x, y = x) {
        this.width *= x;
        this.height *= y;
        return this;
    }

    /**
     * clone this rectangle
     * @name clone
     * @memberOf me.Rect.prototype
     * @function
     * @return {me.Rect} new rectangle
     */
    clone() {
        return new Rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    /**
     * copy the position and size of the given rectangle into this one
     * @name copy
     * @memberOf me.Rect.prototype
     * @function
     * @param {me.Rect} rect Source rectangle
     * @return {me.Rect} new rectangle
     */
    copy(rect) {
        return this.setShape(rect.pos.x, rect.pos.y, rect.width, rect.height);
    }

    /**
     * translate the rect by the specified offset
     * @name translate
     * @memberOf me.Rect.prototype
     * @function
     * @param {Number} x x offset
     * @param {Number} y y offset
     * @return {me.Rect} this rectangle
     */
    /**
     * translate the rect by the specified vector
     * @name translate
     * @memberOf me.Rect.prototype
     * @function
     * @param {me.Vector2d} v vector offset
     * @return {me.Rect} this rectangle
     */
    translate() {
        var _x, _y;

        if (arguments.length === 2) {
            // x, y
            _x = arguments[0];
            _y = arguments[1];
        } else {
            // vector
            _x = arguments[0].x;
            _y = arguments[0].y;
        }

        this.pos.x += _x;
        this.pos.y += _y;

        return this;
    }

    /**
     * Shifts the rect to the given position vector.
     * @name shift
     * @memberOf me.Rect
     * @function
     * @param {me.Vector2d} position
     */
    /**
     * Shifts the rect to the given x, y position.
     * @name shift
     * @memberOf me.Rect
     * @function
     * @param {Number} x
     * @param {Number} y
     */
    shift() {
        if (arguments.length === 2) {
            // x, y
            this.pos.set(arguments[0], arguments[1]);
        } else {
            // vector
            this.pos.setV(arguments[0]);
        }
    }

    /**
     * merge this rectangle with another one
     * @name union
     * @memberOf me.Rect.prototype
     * @function
     * @param {me.Rect} rect other rectangle to union with
     * @return {me.Rect} the union(ed) rectangle
     */
    union(/** {me.Rect} */ r) {
        var x1 = Math.min(this.left, r.left);
        var y1 = Math.min(this.top, r.top);

        this.resize(
            Math.max(this.right, r.right) - x1,
            Math.max(this.bottom, r.bottom) - y1
        );

        this.pos.set(x1, y1);

        return this;
    }

    /**
     * check if this rectangle is intersecting with the specified one
     * @name overlaps
     * @memberOf me.Rect.prototype
     * @function
     * @param  {me.Rect} rect
     * @return {boolean} true if overlaps
     */
    overlaps(r) {
        return (
            this.left < r.right &&
            r.left < this.right &&
            this.top < r.bottom &&
            r.top < this.bottom
        );
    }

    /**
     * Returns true if the rectangle contains the given rectangle
     * @name contains
     * @memberOf me.Rect.prototype
     * @function
     * @param {me.Rect} rect
     * @return {boolean} true if contains
     */

    /**
     * Returns true if the rectangle contains the given point
     * @name contains
     * @memberOf me.Rect.prototype
     * @function
     * @param  {Number} x x coordinate
     * @param  {Number} y y coordinate
     * @return {boolean} true if contains
     */

    /**
     * Returns true if the rectangle contains the given point
     * @name contains
     * @memberOf me.Rect
     * @function
     * @param {me.Vector2d} point
     * @return {boolean} true if contains
     */
    contains() {
        var arg0 = arguments[0];
        var _x1, _x2, _y1, _y2;
        if (arguments.length === 2) {
             // x, y
             _x1 = _x2 = arg0;
             _y1 = _y2 = arguments[1];
         } else {
             if (arg0 instanceof Rect) {
                 // me.Rect
                 _x1 = arg0.left;
                 _x2 = arg0.right;
                 _y1 = arg0.top;
                 _y2 = arg0.bottom;
             } else {
                 // vector
                 _x1 = _x2 = arg0.x;
                 _y1 = _y2 = arg0.y;
             }
         }
         return (
             _x1 >= this.left &&
             _x2 <= this.right &&
             _y1 >= this.top &&
             _y2 <= this.bottom
         );
    }

    /**
     * check if this rectangle is identical to the specified one
     * @name equals
     * @memberOf me.Rect.prototype
     * @function
     * @param  {me.Rect} rect
     * @return {boolean} true if equals
     */
    equals(r) {
        return (
            r.left === this.left &&
            r.right === this.right &&
            r.top === this.top &&
            r.bottom === this.bottom
        );
    }

    /**
     * determines whether all coordinates of this rectangle are finite numbers.
     * @name isFinite
     * @memberOf me.Rect.prototype
     * @function
     * @return {boolean} false if all coordinates are positive or negative Infinity or NaN; otherwise, true.
     */
    isFinite() {
        return (isFinite(this.pos.x) && isFinite(this.pos.y) && isFinite(this.width) && isFinite(this.height));
    }

    /**
     * Returns a polygon whose edges are the same as this box.
     * @name toPolygon
     * @memberOf me.Rect.prototype
     * @function
     * @return {me.Polygon} a new Polygon that represents this rectangle.
     */
    toPolygon() {
        return new Polygon(
            this.pos.x, this.pos.y, this.points
        );
    }
};


export default Rect;
