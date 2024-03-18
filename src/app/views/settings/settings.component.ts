import { Component, OnInit } from '@angular/core';
import * as words from '../../mocks/hangman_words.json';
import { GameRoutes } from './../../enums/routes.enum';
import { StoreService } from './../../services/store.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    public routes = GameRoutes;
    public allWords: string[] = Array.from(words);
    public filteredWords: string[] = [];
    public wordIsSelected: boolean = false;
    public selectedWord: string = '';
    public selectedLength!: number;
    public availableWordLengths: number[] = [];
    public isRandom: boolean = false;

    constructor(private readonly storeService: StoreService) {}

    ngOnInit(): void {
        this.getAvailableWordLengths();
    }

    // Get all available word lengths
    private getAvailableWordLengths(): void {
        const lengths: Record<number, true> = {};
        this.allWords.forEach((word: string) => {
            lengths[word.length] = true;
        });

        const wordLengths = Object.keys(lengths).map((length: string) =>
            parseInt(length)
        );
        this.availableWordLengths = wordLengths.sort((a, b) => a - b);
    }

    // Select from available word lengths
    public selectWordLength(wordLength: number): void {
        this.isRandom = false;
        // Filter words by length
        const filteredWordByLength = this.allWords.filter(
            (word: string) => word.length === wordLength
        );

        this.selectedLength = wordLength;

        // Get random word index
        const randomWordIndex = this.randomLengthFromInterval(
            0,
            filteredWordByLength.length - 1
        );

        // Select random word with specified length
        this.selectedWord = filteredWordByLength[randomWordIndex];

        // Update word select status
        this.wordIsSelected = true;

        // Add word to storage
        this.storeService.setItem(
            'selectedWord',
            this.selectedWord.toUpperCase()
        );
    }

    // Select radnom word length
    public selectRandomWordLength(): void {
        this.isRandom = true;
        // Get random word length
        this.selectedLength = this.randomLengthFromInterval(
            this.availableWordLengths[0],
            this.availableWordLengths[this.availableWordLengths.length - 1]
        );

        // Filter words by random word length
        const filteredWordByLength = this.allWords.filter(
            (word: string) => word.length === this.selectedLength
        );

        // Get random word index
        const randomWordIndex = this.randomLengthFromInterval(
            0,
            filteredWordByLength.length - 1
        );

        // Select random word with specified length
        this.selectedWord = filteredWordByLength[randomWordIndex];

        // Update word select status
        this.wordIsSelected = true;

        // Add word to storage
        this.storeService.setItem(
            'selectedWord',
            this.selectedWord.toUpperCase()
        );
        /* this.isRandom = true; */
    }

    // Get random length in given interval - helper
    private randomLengthFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
