import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { letters } from 'src/app/mocks/letters.mock';
import { GameRoutes } from './../../enums/routes.enum';
import { StoreService } from './../../services/store.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    public routes = GameRoutes;
    public letters = letters;
    public usedLetters: string[] = [];
    public wordBox: string = '';
    public selectedWord: string = '';
    public selectedWordLength: number = 0;
    public tries: number = 0;
    public gameWon: boolean = false;
    public gameLost: boolean = false;

    constructor(
        private router: Router,
        private readonly storeService: StoreService
    ) {}

    ngOnInit(): void {
        // Set game state
        this.selectedWord = this.storeService.getItem('selectedWord');
        this.selectedWordLength = this.selectedWord.length;
        this.wordBox =
            this.storeService.getItem('wordBox') ??
            '_ '.repeat(this.selectedWord.length);
        this.usedLetters =
            JSON.parse(this.storeService.getItem('letters')) ?? [];

        // Check if there's data in store
        if (this.storeService.getItem('letters')) {
            this.tries = this.getWrongCharactersLength(
                this.selectedWord,
                JSON.parse(this.storeService.getItem('letters'))
            );
        } else {
            this.tries = this.usedLetters.length;
        }

        this.gameState();
    }

    // Start new game
    public newGame(): void {
        this.storeService.clearStorage();
        this.router.navigateByUrl(this.routes.GameSettings);
    }

    // End game
    public endGame(): void {
        this.storeService.clearStorage();
        this.router.navigateByUrl(this.routes.Instructions);
    }

    // Select letter from keypad
    public selectLetter(letter: string): void {
        this.tries =
            this.selectedWord.indexOf(letter) === -1
                ? this.tries++
                : this.tries;

        if (this.selectedWord.indexOf(letter) === -1) {
            this.tries++;
        }

        const wordCopy = this.wordBox.split(' ');
        for (let i = 0; i < this.selectedWord.length; i++) {
            if (this.selectedWord[i] === letter) {
                wordCopy[i] = letter;
            }
        }

        this.usedLetters.push(letter);
        this.wordBox = wordCopy.join(' ');
        this.storeService.setItem('wordBox', this.wordBox);
        this.storeService.setItem('letters', JSON.stringify(this.usedLetters));
        this.gameState();
    }

    // Check game state
    gameState(): void {
        const wordsArray = this.wordBox.split(' ');
        const checkWord = wordsArray.join('');
        if (checkWord === this.selectedWord) {
            this.gameWon = true;
            this.gameLost = false;
        }

        if (this.tries >= 10) {
            this.gameWon = false;
            this.gameLost = true;
        }
    }

    // Get Wrong characters length from store
    getWrongCharactersLength(word: string, characters: string[]): number {
        let wrongCharactersLength: number = 0;

        characters.forEach((char) => {
            !word.includes(char) ? wrongCharactersLength++ : '';
        });

        return wrongCharactersLength;
    }
}
