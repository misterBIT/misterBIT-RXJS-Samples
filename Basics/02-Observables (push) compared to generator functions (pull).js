// Observables (push) compared to generator functions (pull)

// Generator (PULL) - passive generator of values
// Producer
function* fibo() {
  console.log('Hello');
  yield 1;
  yield 2;
  yield 3;
  yield 5;
}

// Consumer determines when the value are sent
var iterator = fibo();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);


// Observable (PUSH)
// Producer determines when the values are sent
var bar = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(function () {
    observer.next(5);
  }, 1000);
});

// Consumer
bar.subscribe(function (x) {
  console.log(x);
});

