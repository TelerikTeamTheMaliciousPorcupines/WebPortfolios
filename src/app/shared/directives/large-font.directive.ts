import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[myLargeFont]'
})
export class LargeFontDirective implements OnChanges {

  @Input() inputFontSize: string;
  @Input() textColor: string;

  constructor(private elRef: ElementRef) {
  }

  ngOnChanges(): void {
    this.elRef.nativeElement.style.color = this.textColor;
    this.elRef.nativeElement.style.fontSize = this.inputFontSize;
  }
}
