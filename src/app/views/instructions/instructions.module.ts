import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InstructionsRoutingModule } from './instructions-routing.module';
import { InstructionsComponent } from './instructions.component';

@NgModule({
    declarations: [InstructionsComponent],
    imports: [CommonModule, InstructionsRoutingModule, RouterModule],
})
export class InstructionsModule {}
