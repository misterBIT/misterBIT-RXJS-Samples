// We can create observable from an array:
// var arr = [7, 4, 42];
// var source1$ = Rx.Observable.fromArray(arr);

// We can create observable from a promise:
// var source2$ = Rx.Observable
//     .fromPromise(fetch('https://api.github.com/users').then(res=>res.json()))
    

// // We can create observable from an iteraor:
function* generator() {
  yield 10;
  yield 20;
  yield 30;
}
var iterator = generator();

// var source$ = source1$;
//  var source$ = source2$;
// from() can autodetect if thats an array, a promise or an iterator
var source$ = Rx.Observable.from(iterator);

// Subscribing:
source$.subscribe(function (x) {
  console.log('next: ', x);
}, function (err) {
  console.log('error: ' , err);
}, function () {
  console.log('done');
});


