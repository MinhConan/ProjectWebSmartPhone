import {
  Directive,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appToggleOnHover]',
})
export class ToggleOnHoverDirective {
  constructor() {}

  @HostBinding('style.display') display: string = 'none';

  @HostListener('mouseenter') mouseover() {
    this.display = 'block';
  }

  @HostListener('mouseleave') mouseleave() {
    this.display = 'none';
  }
}
