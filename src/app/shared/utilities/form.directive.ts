import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { StringHelper } from './helper';
@Directive({
  selector: '[appForm]',
})
export class FormDirective implements OnInit {
  @Input() gForm = '';
  @Input() name = '';
  @Input() id = '';
  @Input() showLabel = true;
  @Input() star = false;
  @Input() ModelId = 0;
  @Input() unique = '';

  constructor(
    private el: ElementRef,
     private control: NgControl,
     private helper: StringHelper
     ) {

  }

  ngOnInit() {
    const elem = this.el.nativeElement;
    const label = this.name ? (this.helper.titleCase('' + this.name)) : '';
    if (this.showLabel && label) {
      const starHtml = this.star !== false ? '<span class="error">*</span>' : '';
      elem.insertAdjacentHTML('beforebegin', `<label class="d-block" for="${this.control.name}">${label}:${starHtml}</label>`);
    }
    if (elem.nodeName === 'INPUT' || elem.nodeName === 'SELECT' || elem.nodeName === 'TEXTAREA') {
      elem.className += ' form-control';
      elem.name = elem.name || 'someRandomName';
    }
  }

  ngOnChange() {
    const elem = this.el.nativeElement;
    const label = this.name ? (this.helper.titleCase('' + this.name)) : '';
    if (this.showLabel && label) {
      const starHtml = this.star !== false ? '<span class="error">*</span>' : '';
      elem.insertAdjacentHTML('beforebegin', `<label class="d-block" for="${this.control.name}">${label}:${starHtml}</label>`);
    }
  }

  @HostListener('change', ['$event'])
  // @HostListener('ionChange', ['$event'])
  @HostListener('touch', ['$event'])
  // @HostListener('input', ['$event'])
  @HostListener('blur', ['$event']) onEvent($event: any) {
    if ($event.type === 'blur' && $event.target.value && typeof this.control.value === 'string') {
      $event.target.value = $event.target.value.trim();
    }
    this.checkError();
  }

  checkError() {
    const node = this.el.nativeElement;
    const msgBlock = node.nextSibling;
    if (msgBlock && msgBlock.id == 'errorMessages') {
      msgBlock.remove();
      // node.removeChild(msgBlock);
    }

    if (this.control.invalid && (this.control.dirty || this.control.touched)) {
      node.insertAdjacentHTML('afterend', `<div id="errorMessages" class="error-container">${this.getErrorMessages()}</div>`);
    }
  }

  getErrorMessages() {
    const config: any = {
      currency: 'Invalid currency',
      email: 'Invalid email address',
      future: 'Please enter future date/time',
      max: 'Maximum ${max} can be entered',
      min: 'Minimum ${min} can be entered',
      minlength: 'Please enter minimum ${requiredLength} characters',
      password: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      pattern: 'Invalid Pattern',
      phone: 'Please enter 10 digit phone number',
      required: 'This field is Required',
      url: 'Please enter a valid url',
      zip: 'Please enter valid zip code',
      unique: 'Already exists'
    };
    let msg = '';
    for (const key in this.control.errors) {
      if (this.control.errors.hasOwnProperty(key)) {
        msg += `<div class="text-danger small">${this.parse(config[key], this.control.errors[key])}</div>`;
      }
    }
    return msg;
  }

  getParsedValue(path: string, obj: any) {
    const fb = `$\{${path}}`;
    return path.split('.').reduce((res, key) => res[key] !== undefined ? res[key] : fb, obj);
  }

  parse(template: string, map: string) {
    return template.replace(/\$\{.+?}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim();
      return this.getParsedValue(path, map);
    });
  }
}
