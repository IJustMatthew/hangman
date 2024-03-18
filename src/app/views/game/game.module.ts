import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
    declarations: [GameComponent],
    imports: [CommonModule, GameRoutingModule, RouterModule],
})
export class GameModule {}
