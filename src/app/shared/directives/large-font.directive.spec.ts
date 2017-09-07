import { LargeFontDirective } from './large-font.directive';
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('Directive: LargeFont', () => {
  it('should create an instance', () => {
    const el = new Object();
    const directive = new LargeFontDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});