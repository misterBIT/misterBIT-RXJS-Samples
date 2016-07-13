
const subject$ = new Rx.Observable((observer) => {
    let inter = setInterval(() => observer.next('Proud Single Value') , 1000);
    return function unsubscribeMe() {
        clearInterval(inter);
    };
});

var subscription = subject$.subscribe({
  next:     x =>    console.log('Next: ' + x),
  error:    err =>  console.log(err),
  complete: () =>   console.log('done')
});

setTimeout(() => subscription.unsubscribe(), 4500);
