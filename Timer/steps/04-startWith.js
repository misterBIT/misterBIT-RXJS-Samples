const Observable = Rx.Observable;

const startButton       = document.querySelector('#start');
const stopButton        = document.querySelector('#stop');

const start$            = Observable.fromEvent(startButton, 'click');
const stop$             = Observable.fromEvent(stopButton, 'click');
const interval$         = Observable.interval(1000);

const intervalThatStops$ = interval$
    .takeUntil(stop$);

const data = {count:0};

start$
    .switchMapTo(intervalThatStops$)
    // To provide the initialValue for scan, its common to use startWith
    .startWith(data)
    .scan((acc)=> {
      return {count: acc.count + 1}
     })
    .subscribe((x)=> document.querySelector('#output').innerHTML=x.count);

