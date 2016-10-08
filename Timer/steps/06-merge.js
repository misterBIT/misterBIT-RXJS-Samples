
const Observable = Rx.Observable;

const startButton   = document.querySelector('#start');
const stopButton    = document.querySelector('#stop');
const resetButton   = document.querySelector('#reset');

const start$        = Observable.fromEvent(startButton, 'click');
const stop$         = Observable.fromEvent(stopButton, 'click');
const reset$        = Observable.fromEvent(resetButton, 'click');
const interval$     = Observable.interval(1000);


const data  = {count:0};
const inc   = (acc)=> ({count: acc.count + 1});
const reset = (acc)=> data;

const intervalThatStops$ = interval$
    .takeUntil(stop$);

// Merged stream of 2 types of functions
const incOrReset$ = Observable.merge(
    intervalThatStops$.mapTo(inc),
    reset$.mapTo(reset)
);

start$
    .switchMapTo(incOrReset$)
    .startWith(data)
    .scan((acc, curr)=> curr(acc))
    .subscribe((x)=> document.querySelector('#output').innerHTML=x.count);









