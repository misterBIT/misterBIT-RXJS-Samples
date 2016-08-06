// Just handling that button
var clicks = Rx.Observable.fromEvent(document.querySelector('#btn'), 'click')


function onNext(x) {console.log('Oh Ji Thanks', x);}
function onError(e){console.error(e)}
function OnCompleted() {console.log('cleaning up')};

clicks.subscribe(onNext, onError, OnCompleted);



// Monkey patching for ease of demo:
Array.prototype.concatAll = function() {
    var results = [];

    this.forEach(function(subArray) {
        subArray.forEach(function(item) {
            results.push(item);
        });
    });

    return results;
};

// Drag and Drop with observables:
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



