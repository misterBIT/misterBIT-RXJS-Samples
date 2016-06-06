

// Load an audio file
var audioWin        = new Audio('sound/win.mp3');
var audioRight      = new Audio('sound/right.mp3');
var audioWrong      = new Audio('sound/wrong.mp3');


document.addEventListener('DOMContentLoaded', () => {
    
    let board = document.querySelector('.board');
    
    //console.log('ready');
    // let cards = document.querySelectorAll('.card');
    // [].forEach.call(cards, (card)=>{card.addEventListener('click')})

    var clicks = Rx.Observable.fromEvent(document.querySelectorAll('.card'), 'click')

    var gameOver$ = Rx.Observable.create(observer => {
        if (board.querySelectorAll('.card.flipped').length === board.querySelectorAll('.card').length) {
            console.log('Emmitng!');
            
            observer.next('win')
        }
    });

    //gameOver$.subscribe(e=>console.log('vic', e));

    
    var twoClicks$ = clicks.map(ev=>ev.target.parentNode)
        .filter(el=> !el.classList.contains('flipped'))
        .do(el=> el.classList.add('flipped'))
        .take(2)
        .do((e)=>{console.log(e);})
        .reduce((twoClicks, click)=>{
            //cl(twoClicks);
            return [...twoClicks, click]
        }, []).share();
    
    var wrong$ = twoClicks$
        .filter(clicks => clicks[0].getAttribute('data-card') !== clicks[1].getAttribute('data-card'))
        .delay(1000)
        .do(els=> {console.log('Wrong:', els);els[0].classList.remove('flipped'); els[1].classList.remove('flipped')})

    var right$ = twoClicks$
        .filter(clicks => clicks[0].getAttribute('data-card') === clicks[1].getAttribute('data-card'))
        .do(() => audioRight.play())


Rx.Observable.merge(right$, wrong$)
    .do((e)=>{console.log('merged: ', e);})

//   .takeUntil(gameOver$)
  .takeUntil(Rx.Observable.timer(10000))
  //.repeat()
    .subscribe(
        (e)=>{console.log('YEAH!', e)},
        (e)=>{console.log('Error !!', e)},
        (e)=>{console.log('Completed!', e)}
    );
    
    
});



