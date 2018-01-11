import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoundDecimalPipe} from '../../src/app/shared/pipes/round-decimal.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [RoundDecimalPipe],
    exports: [RoundDecimalPipe]
})
export class SharedPipesModule { }
