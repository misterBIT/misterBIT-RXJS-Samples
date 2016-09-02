// Note how the second Observer receives the value 2 even though it subscribed after the value 2 was sent:


var subject = new Rx.ReplaySubject(3); // buffer 3 values for new subscribers
// You can also specify a window time in milliseconds, to determine how old the recorded values can be
// var subject = new Rx.ReplaySubject(100, 500 /* windowTime */);


subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);

console.log('Done.');


