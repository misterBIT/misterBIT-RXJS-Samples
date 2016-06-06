
Array.prototype.concatAll = function() {
    var results = [];

    this.forEach(function(subArray) {
        subArray.forEach(function(item) {
            results.push(item);
        });
    });

    return results;
};


var Observable = Rx.Observable;

var parent = document.getElementById("parent");
var widget = document.getElementById("widget");

var mouseDowns = Observable.fromEvent(widget, "mousedown");
var parentMouseMoves = Observable.fromEvent(parent, "mousemove");
var parentMouseUps = Observable.fromEvent(parent, "mouseup");

var drags =
    mouseDowns.
        map((e) => {
            return parentMouseMoves.
                takeUntil(parentMouseUps);
        }).
        concatAll();

var subscription =
    drags.forEach(
        (e) => {
            widget.style.left = e.clientX + "px";
            widget.style.top = e.clientY + "px";
        });



