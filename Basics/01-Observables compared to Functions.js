// 01-Observables compared to Functions

function foo() {
  console.log('Hello');
  return 42;
}

console.log('before');
console.log(foo.call());
console.log('after');


var bar = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(function () {
    observer.next(300);
  }, 1000);
});

console.log('before');
bar.subscribe(function (x) {
  console.log(x);
});
console.log('after');

// setTimeout(()=>{
//   bar.subscribe(function (x) {
//     console.log('Me Too!', x);
//   })
// }, 5000)



// Points to Concider:
// observables are lazy like functions 
// observables are synchronous like functions
// observables can emit multiple values over time! 