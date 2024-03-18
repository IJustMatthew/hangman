import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    constructor() {}

    public setItem(key: string, payload: string): void {
        localStorage.setItem(key, payload);
    }

    public getItem(key: string): string {
        return localStorage.getItem(key) as string;
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clearStorage(): void {
        localStorage.clear();
    }
}
