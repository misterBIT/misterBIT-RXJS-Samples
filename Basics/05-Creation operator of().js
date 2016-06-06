var foo = Rx.Observable.of(7, 4, 42);

// This how we could implement the 'of' ourself: 
// var foo = Rx.Observable.create(function (observer) {
//   observer.next(7);
//   observer.next(4);
//   observer.next(42);
//   observer.complete();
// });



foo.subscribe(function (x) {
  console.log('next ' + x);
}, function (err) {
  console.log('error ' + err);
}, function () {
  console.log('done');
});
