import { Validator, NG_VALIDATORS, UntypedFormControl, ValidationErrors } from '@angular/forms';
import { Directive, OnInit, forwardRef, Input } from '@angular/core';

@Directive({
  selector: '[gPatterns]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PatternspDirective, multi: true }
  ]
})
export class PatternspDirective implements OnInit {
  @Input() patterns: any[] = [];
  @Input() patternMatch: string = 'or';
  @Input() separator: string = ',';
  ngOnInit() {
  }

  validate(c: UntypedFormControl): ValidationErrors {
    let isValid = true;
    let val: string = c.value;
    let results:any[] = [];
    let invalidData:any[] = [];
    const data = val.split(this.separator).map(x => x.trim());
    data.forEach(text => {
      if (!this.checkPatterns(text)) {
        invalidData.push(text);
      }
      results.push(this.checkPatterns(text));
    });
    results.forEach(res => {
      if (res === false) {
        isValid = false;
      }
    });
    if (!isValid) {
      let invalid = invalidData.join(', ') || '';
      return { 'patterns': !isValid, 'invalidValues': invalid };
    }
    return {};
  }

  checkPatterns(val: string): any {
    for (let index = 0; index < this.patterns.length; index++) {
      const element = this.patterns[index];
      let pattern = new RegExp(element);
      if (this.patternMatch == 'or') {
        if (pattern.test(val)) {
          return true;
        }
      }
    }
    return false;
  }

}