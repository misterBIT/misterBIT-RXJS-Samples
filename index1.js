var clicks = Rx.Observable.fromEvent(document.querySelector('#btn'), 'click')


function onNext(x) {console.log('Oh Ji Thanks', x);}
function onError(e){console.error(e)}
function OnCompleted() {console.log('cleaning up')};

clicks.subscribe(onNext, onError, OnCompleted);



// *************** Emits new number every second
// const seconds = Rx.Observable.interval(100);        // 0, 1, 2, 3, …

// const fromOne    = seconds.map(n => n + 1);         // 1, 2, 3, 4, …
// const twoSeconds = fromOne.filter(n => n % 2 == 0); // 0,    2,    …
// const delayed    = twoSeconds.delay(100);             //    0, 1, 2, …

// delayed.take(100).subscribe((data) => console.log(data));



// *************** With Promise:
// var prm = new Promise((resolve, reject) => {
//         console.log('Promise created');
//         setTimeout(()=>{
//             console.log('Timeout ellapsed');
//             resolve(42);
//             //reject(new Error());
//         }, 1000);
// });

// prm.then(data=>console.log('Got your Answer!', data));
// prm.then(data=>console.log('Got your Answer!', data));

// *************** With Observable:
// var source = Rx.Observable.create((observer) => {
//    console.log('Observable created');
//    setInterval(()=>{
//        observer.onNext(Date.now());
//    }, 1000);
  
// });

// source.forEach(data=>console.log('Observe that!', data));


// *************** Observables are lazy
// *************** Observables may emit multiple values along time
// *************** Observables are disposables
// var source = Rx.Observable.create((observer) => {
//    console.log('Observable created, kicking off Interval'); 
//    var t = setInterval(()=>{
//        observer.onNext(42);
//    }, 1000);
//    return ()=>{console.log('Disposing and clearing Interval...');clearInterval(t);};
// });


// var disposable = source.forEach(data=>console.log(data));

// setTimeout(()=>{
//    disposable.dispose();
// }, 5000);


// *************** observer.onCompleted(); observer.onError();
// source.subscribe(
//    function (x) {
//        console.log('Subscriber from another Mother: ' + x);
//    },
//    function (err) {
//        console.log('Error?! : ' + err);
//    },
//    function () {
//        console.log('Never Completed');
//    });
