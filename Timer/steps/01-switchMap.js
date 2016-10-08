
const Observable = Rx.Observable;
const startButton = document.querySelector('#start');

const start$ = Observable.fromEvent(startButton, 'click');
const interval$ = Observable.interval(1000);

// When getting a start, switch over to an interval
const startInterval$ = start$
    .switchMapTo(interval$);


// subscribe and print
startInterval$
    .subscribe((x)=> document.querySelector('#output').innerHTML=x);

