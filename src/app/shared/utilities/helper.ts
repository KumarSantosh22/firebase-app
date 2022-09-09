import { Injectable } from "@angular/core";

@Injectable()
export class StringHelper {

    constructor() { }

    public titleCase(text: string): string {
        if (!text || text === null || text === undefined) {
            return '';
        }
        text = text.toLowerCase();
        let str = text.split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            return str.join(' ');
        }
        return '';
    }
}
