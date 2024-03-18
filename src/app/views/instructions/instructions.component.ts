import { Component, OnInit } from '@angular/core';
import { GameRoutes } from './../../enums/routes.enum';

@Component({
    selector: 'app-instructions',
    templateUrl: './instructions.component.html',
    styleUrls: ['./instructions.component.scss'],
})
export class InstructionsComponent implements OnInit {
    public routes = GameRoutes;
    constructor() {}

    ngOnInit(): void {}
}
