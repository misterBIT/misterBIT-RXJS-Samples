const Observable = Rx.Observable;

const startButton   = document.querySelector('#start');
const stopButton    = document.querySelector('#stop');

const start$        = Observable.fromEvent(startButton, 'click');
const interval$     = Observable.interval(1000);

// Added a stop$ stream
const stop$ = Observable.fromEvent(stopButton, 'click');

// Now we have an interval that stops!
const intervalThatStops$ = interval$
    .takeUntil(stop$);

start$
    .switchMapTo(intervalThatStops$)
    .subscribe((x)=> document.querySelector('#output').innerHTML=x);

