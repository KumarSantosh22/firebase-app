import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MsgService {

  constructor(private messageService: MessageService) { }

  success(msg: string, title: string = 'Success') {
    this.add('success', title, msg);
  }

  info(msg: string, title: string = 'Information') {
    this.add('info', title, msg);
  }

  warning(msg: string, title: string = 'Warning') {
    this.add('warn', title, msg);
  }

  error(msg: string, title: string = 'Error') {
    this.add('error', title, msg);
  }

  add(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  clear() {
    this.messageService.clear();
  }
}
