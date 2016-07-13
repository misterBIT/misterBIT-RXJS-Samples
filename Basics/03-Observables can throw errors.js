//Function
function foo() {
  if (true || false) throw new Error('invalid something');
  return 42;
}

try {
  console.log(foo.call());
} catch (err) {
  console.log('Something wrong happened: ' + err);
}
console.log('This here still runs');

// Observable
var source$ = Rx.Observable.create(function (observer) {
  try {
    observer.next(42);
    observer.next(100);
    observer.next(200); 
    // observer.error(new Error('invalid something'));
    if (true || false) throw new Error('EEEEE');
    setTimeout(function () {
      observer.next(300);
    }, 1000);
  } catch (err) {
    observer.error(err);
  }
  
});

source$.subscribe(
    function nextValueHandler(x) {
        console.log(x);
    },
    function errorHandler(err) {
        console.log('Something went wrong: ' + err);
    },
    function whenCompleted() {
        console.log('Stream is Completed!');
        
    }
)


