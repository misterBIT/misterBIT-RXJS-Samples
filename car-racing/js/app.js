const END_OF_ROAD = 800;

const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

const moveCar = (elCar, power) => {
                    let currLoc = parseInt(elCar.style.left) + power;
                    if (currLoc < 0 ) currLoc = 0;
                    elCar.style.left = currLoc + 'px';
                    return currLoc;
                }
                             


const audioWin        = new Audio('sound/win.mp3');

// TODO: switch to observable to enjoy better operators
const gameKeys = [['Digit1', 'Digit2'], ['ArrowRight', 'ArrowLeft']];

document.addEventListener('DOMContentLoaded', () => {

    const elCars = Array.from(document.querySelectorAll('.car'));

    const resistance$ = Rx.Observable
                        .interval(1000)
                        //.map(i => elCar1)
                        .do(i => {moveCar(elCars[0], -50);moveCar(elCars[1], -50)})
    const timer = resistance$.subscribe(
        v   =>  console.log('Time is Passing:', v),
        e   =>  console.log(e),
        ()  =>  console.log('Completed!')
    );



    
    const keys$ = Rx.Observable
        .fromEvent(document, 'keyup')
        .filter(ev => flatten(gameKeys).includes(ev.code) )
        

   const player1$ = keys$
                        .filter(e => gameKeys[0].includes(e.code))
                        .bufferCount(2)
                        // .do((x)=> console.log('Array: ', x))
                        .map(evs => ({player: 0, evs}))
                        

   const player2$ = keys$
                        .filter(e => gameKeys[1].includes(e.code))
                        .bufferCount(2)
                        .map(evs => ({player: 1, evs}))
                             
   const source$ = Rx.Observable.merge(player1$, player2$)
                        .filter(({evs}) => evs[0].code !== evs[1].code)                        
                        .map(({player, evs}) => ({player, diff: parseInt(evs[1].timeStamp - evs[0].timeStamp)}))
                        .map(({player, diff}) => ({player, force: Math.max(0, 100 - diff )}))
                        .map(({player, force}) => moveCar(elCars[player], force))
                        .takeWhile(loc => loc < END_OF_ROAD)

    source$.subscribe(
        v   =>  console.log('Value:', v),
        e   =>  console.log(e),
        ()  =>  {
            console.log('Completed!');
            timer.unsubscribe();
            audioWin.play();
        }
    );
    
    
});



