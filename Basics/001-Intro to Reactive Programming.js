
// Over Time
//var interval$ = Rx.Observable.interval(500);
//interval$.subscribe(i => console.log(i));




// Using Array
var source = ['4', '2', 'puki', '1', '3', '11', 'muki', '1'];

var result = source
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y);

// Using Observables
var valuesOverTime$ = Rx.Observable.interval(500).take(source.length)
  .map(i => +source[i])
  //.do (x => console.log(x))
  .filter(x => !isNaN(x))
  //.reduce((x, y) => x + y);
                      

valuesOverTime$.subscribe(function (x) {
  console.log('next: ' + x);
});


