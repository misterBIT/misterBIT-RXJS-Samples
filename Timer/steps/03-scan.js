const Observable = Rx.Observable;

const startButton   = document.querySelector('#start');
const stopButton    = document.querySelector('#stop');

const start$        = Observable.fromEvent(startButton, 'click');
const stop$         = Observable.fromEvent(stopButton, 'click');
const interval$     = Observable.interval(1000);

const intervalThatStops$ = interval$
    .takeUntil(stop$);

start$
    .switchMapTo(intervalThatStops$)
    // Scan to emit an accumulated result with the item's count
    .scan((acc)=> {
      return {count: acc.count + 1}
     },{count: 0})
    .subscribe((x)=> document.querySelector('#output').innerHTML=x.count);

