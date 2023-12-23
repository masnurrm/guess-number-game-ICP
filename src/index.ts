import { Canister, query, text, update, Void } from 'azle';

let guessNumber = '';
let attemptLeft = 3;
let score = 100;

const generateNumber = () => {
    // Random number 1 to 100
    const num = Math.floor(Math.random() * 100) + 1;
    guessNumber = num.toString();
};

const setScoreByAttempt = () => {
    if (attemptLeft === 3) {
        score -= 10;
    } else if (attemptLeft === 2) {
        score -= 20;
    } else if (attemptLeft === 1) {
        score -= 30;
    }
};

const reset = () => {
    attemptLeft = 3;
    score = 100;
    generateNumber();
};

export default Canister({
    doGuessNumber: update([text], text, (askNumber) => {
        if (attemptLeft === 0) {
            return 'You have no attempts left, the correct number is ' + guessNumber + '. Please start a new game';
        }
        if (askNumber === guessNumber) {
            reset();
            return 'You win, your score is ' + score.toString() + '. Please start a new game';
        } else if (askNumber > guessNumber) {
            attemptLeft--;
            if (attemptLeft === 0) {
                reset();
                return 'You have no attempts left, the correct number is ' + guessNumber + '. Please start a new game';
            }
            setScoreByAttempt();
            return 'That\'s too high, attempts left: ' + attemptLeft.toString() + ', score: ' + score.toString() + '. Please try again';
        } else {
            attemptLeft--;
            if (attemptLeft === 0) {
                reset();
                return 'You have no attempts left, the correct number is ' + guessNumber + '. Please start a new game';
            }
            setScoreByAttempt();
            return 'That\'s too low, attempts left: ' + attemptLeft.toString() + ', score: ' + score.toString() + '. Please try again';
        }
    }),
    getScore: query([], text, () => {
        return `Your score is ${score}`;
    }),
});
