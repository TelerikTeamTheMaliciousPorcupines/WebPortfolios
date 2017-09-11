import { EncryptPipe } from './pipes/encrypt.pipe';
import { LargeFontDirective } from './directives/large-font.directive';
import { SortPipe } from './pipes/sort.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SortPipe,
    EncryptPipe,
    LargeFontDirective,
  ],
  exports: [
    SortPipe,
    EncryptPipe,
    LargeFontDirective,
  ]
})
export class SharedModule { }
