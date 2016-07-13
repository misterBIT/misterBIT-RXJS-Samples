
// Over Time
// var interval$ = Rx.Observable.interval(500);
// interval$.subscribe(i => console.log(i));

// Using Array
var source = ['4', '2', 'puki', '1', '3', '11', 'muki', '1'];

// Using Observables
var valuesOverTime$ = Rx.Observable.interval(200).take(source.length)
  .map(i => +source[i])
  
  .filter(x => !isNaN(x))
  .do (x => console.log(x))
  .reduce((x, y) => x + y);
                      

valuesOverTime$.subscribe(function (x) {
  console.log('next: ' + x);
});


