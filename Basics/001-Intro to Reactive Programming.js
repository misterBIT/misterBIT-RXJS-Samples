
// Observables may get their values over Time:

// *************** Emits new number every second
// const seconds = Rx.Observable.interval(100);        // 0, 1, 2, 3, …
// const fromOne    = seconds.map(n => n + 1);         // 1, 2, 3, 4, …
// const twoSeconds = fromOne.filter(n => n % 2 == 0); // 0,    2,    …
// const delayed    = twoSeconds.delay(100);             //    0, 1, 2, …
// delayed.take(100).subscribe((data) => console.log(data));



// *************** Using Observable when the datasource is an array:
var source = ['4', '2', 'puki', '1', '3', '11', 'muki', '1'];

var valuesOverTime$ = Rx.Observable.interval(200).take(source.length)
  .map(i => +source[i])
  
  .filter(x => !isNaN(x))
  .do (x => console.log(x))
  .reduce((x, y) => x + y);
                      

valuesOverTime$.subscribe(function (x) {
  console.log('next: ' + x);
});


