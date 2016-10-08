const END_OF_ROAD = 800;

// utility function to flatten a list recursively (es7?)
const flatten = list => list.reduce(
    (acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr), []
);

// Here is our DOM operation for moving that car:
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

    // This is the force that keeps pushing the cars back to start
    const resistance$ = Rx.Observable
                        .interval(1000)
                        .do(i => {moveCar(elCars[0], -50);moveCar(elCars[1], -50)})
    const timer = resistance$.subscribe(
        v   =>  v,
        e   =>  console.log(e),
        ()  =>  console.log('Completed!')
    );

    
    // Filter only game-keys
    const keys$ = Rx.Observable
        .fromEvent(document, 'keyup')
        .filter(ev => flatten(gameKeys).includes(ev.code) )
        
   // Figure the playerId for those keys, and emit them forward in pairs  
   const player1$ = keys$
                        .filter(e => gameKeys[0].includes(e.code))
                        .bufferCount(2)
                        .map(evs => ({player: 0, evs}))
                        
   // Same for player 2, this could be made more generic                     
   const player2$ = keys$
                        .filter(e => gameKeys[1].includes(e.code))
                        .bufferCount(2)
                        .map(evs => ({player: 1, evs}))
                             
   const game$ = Rx.Observable.merge(player1$, player2$)

                        // What is fileterd here?
                        .filter(({evs}) => evs[0].code !== evs[1].code)

                        // converts: [ev, ev] to a timestamp diff                        
                        .map(({player, evs}) => ({player, diff: parseInt(evs[1].timeStamp - evs[0].timeStamp)}))

                        // The force formula
                        .map(({player, diff}) => ({player, force: Math.max(0, 100 - diff )}))

                        // .do((obj)=>console.log(obj))

                        // Move the right car here and get back the curr location
                        .map(({player, force}) => moveCar(elCars[player], force))
                        .takeWhile(loc => loc < END_OF_ROAD)

    game$.subscribe(
        v   =>  v,
        e   =>  console.log(e),
        ()  =>  {
            console.log('Completed!');
            timer.unsubscribe();
            audioWin.play();
        }
    );
});



