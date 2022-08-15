import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  private ls = window.localStorage;

  constructor() {}

  public setItem(key:any, value:any) {
    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    return true;
  }

  public getItem(key:any) {
    let local = this.ls.getItem(key);
    let value = local!== null ? JSON.parse(local) : null;
    try {
      return value;
    } catch (e) {
      return null;
    }
  }

  public clear() {
    this.ls.clear();
  }
}
