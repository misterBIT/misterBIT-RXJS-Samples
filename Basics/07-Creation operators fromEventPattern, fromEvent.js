// fromEventPattern is a general mechanism for adding/removing event listeners,
// fromEvent is a good shortcut.

// function addEventHandler(handler) {
//   document.addEventListener('click', handler);
// }
// function removeEventHandler(handler) {
//   document.removeEventListener('click', handler);
// }

// var evs$ = Rx.Observable.fromEventPattern(
//   addEventHandler, removeEventHandler
// );


var evs$ = Rx.Observable.fromEvent(document, 'mousemove')
  
  .map(ev => ev.x)
  .map(x => `rgb(4, ${x % 256}, 9)`)                           
      

evs$.subscribe(function (x) {
//   console.log('next ', x);
  document.body.style.backgroundColor = x;
  
}, function (err) {
  console.log('error ', err);
}, function () {
  console.log('done');
});
