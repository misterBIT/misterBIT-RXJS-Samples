var foo = Rx.Observable.interval(1000);
// var foo = Rx.Observable.timer(2000, 100);


// Can also use a date
// var date = new Date(new Date().getTime() + 3000);
// var foo = Rx.Observable.timer(date, 1000);

const subscription = foo.subscribe(function (x) {
  console.log('next: ' + x);
}, function (err) {
  console.log(err);
}, function () {
  console.log('done');
});

setTimeout(()=> {
    console.log('Unsubscribing!');
    subscription.unsubscribe()
}, 6000)
