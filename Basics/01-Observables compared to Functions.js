// 01-Observables compared to Functions

// function foo() {
//   console.log('Hello');
//   return 42;
// }

// console.log('before');
// console.log(foo.call());
// console.log('after');

console.log('NOW with Observable:');


var data$ = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(function () {
    observer.next(300);
  }, 3000);
});

console.log('before');
data$.subscribe(function (x) {
  console.log(x);
});
console.log('after');

setTimeout(()=>{
  data$.subscribe(function (x) {
    console.log('Me Too!', x);
  })
}, 2000)



// Points to Consider:
// observables are lazy like functions 
// observables are synchronous like functions
// observables can emit multiple values over time! 