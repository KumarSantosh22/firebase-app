import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[gClaim]'
})
export class ClaimDirective implements OnInit, OnChanges {
  @Input() gClaim = '';
  @Input() gClaims: string[] = [];
  @Input() action = '';
  elementTypes = ['input', 'select', 'button'];

  constructor(
    private elem: ElementRef,
  ) { }

  ngOnInit(): void {
    // console.log('native element', this.elem);

    this.checkClaim();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('gClaims', changes);
    this.checkClaim();
  }

  checkClaim() {
    // console.log('text', this.gClaim);
    if (this.gClaim) {
      if (!this.hasClaim(this.gClaim)) {
        // this.elem.nativeElement.disabled = true;
        const elements = this.getElements();
        this.doReadOnly(elements);
      }
    };
    if (this.gClaims.length) {
      if (!this.hasClaims(this.gClaims)) {
        // this.elem.nativeElement.disabled = true;
        const elements = this.getElements();
        this.doReadOnly(elements);
      }
    };
  }

  getElements() {
    const elements = this.elem.nativeElement.
      querySelectorAll(this.elementTypes.join(','));
    return elements;
  }

  doReadOnly(elements: any) {
    for (let i = 0; i < elements.length; i++) {
      if (this.action === 'hide') {
        elements[i].style.display = 'none';
      } else {
        elements[i].disabled = true;
      }
    };
  }

  claims: any[] = [];
  roles: any[] = [];

  public hasClaim(claimName: string) {
    if (this.isInRole('admin')) {
      return true;
    }
    const name = claimName.toUpperCase();
    return this.claims.includes(name);
  }

  public isInRole(roleName: string) {
    const name = roleName.toUpperCase();
    return this.roles.includes(name);
  }

  public hasClaims(claimNames: string[]): any {
    for (let index = 0; index < claimNames.length; index++) {
      const claim = claimNames[index].toUpperCase();
      if (this.claims.includes(claim)) {
        // console.log('cc',claimNames[index]);
        return true;
      }
    }
  }

  getJSON(key: string) {
    const item = localStorage.getItem(key);
    if (item && item !== 'undefined') {
      return JSON.parse(item);
    }
    return null;
  }

}
