// Manually creating an Observable:
// var subject$ = new Rx.Observable(subscribe);
// subject$.subscribe(onNext, onError, onComplete);


var onNext      = function (x) { console.log('next: ' + x); };
var onError     = function (err) { console.log(err); }
var onComplete  = function () { console.log('Done'); }   

// Here is a producer function for our Observable
function subscribe(observer) {
  observer.next(42);
  observer.next(100);
  observer.next(200);
  observer.complete();
}



/// This is sort of what happen behind the scenes:
var observer = {
  next: onNext,
  error: onError,
  complete: onComplete,
};
subscribe(observer);

