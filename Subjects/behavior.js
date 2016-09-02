
var subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
    next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
    next: (v) => console.log('observerB: ' + v)
});

subject.next(3);

console.log('Done');
