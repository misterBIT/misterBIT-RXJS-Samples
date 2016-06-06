// Using Array
var source = ['4', '2', 'puki', '1', '3', '11', 'muki', '1'];

var result = source
                .map(x => parseInt(x))
                .filter(x => !isNaN(x))
                .reduce((x, y) => x + y);

console.log('Simple array result :', result);

// Using Observables
var values$ = Rx.Observable.fromArray(source)
                .map(x => parseInt(x))
                .filter(x => !isNaN(x))
                .reduce((acc, curr) => acc + curr);



values$.subscribe(function (x) {
  console.log('Observable Result: ' + x);
});


