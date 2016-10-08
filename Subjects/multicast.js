var source = Rx.Observable.from([1, 2, 3]);

// Multiple sucscribers are usually a seperate execution context
// source.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// source.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });

// Unless the observable is multicast.
// Subjects are mulicasts.

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

