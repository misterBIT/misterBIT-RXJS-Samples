// var source = Rx.Observable.from([1, 2, 3]);

// source.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// source.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });



var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// This is, under the hood, `source.subscribe(subject)`:
multicasted.connect();

console.log('Done');

