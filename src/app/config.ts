import { EventEmitter, Injectable } from '@angular/core';
import { User } from './shared/models/user.model';

@Injectable()
export class Config {

    // Saving Logged in User
    public static userChanged: EventEmitter<User> = new EventEmitter<User>();

    private static _user: User = new User();

    static set user(user: User) {
        this._user = user;
        this.userChanged.emit(user);
    }

    static get user(): User {
        if (!this._user && localStorage.getItem('user')) {
            this._user = new User();
        }
        return this._user;
    }

    // Check if auth token is expired
    static get tokenExpired() {
        const token = localStorage.getItem('authToken');
        if (token) {
          const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
          return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        }
        return true;
      }
}