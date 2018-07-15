import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private db: AngularFireDatabase) {
  }

  getItems(path: string) {
    return this.db.list(path);
  }

  createItem(path: string, data: any) {
    const itemsRef = this.db.list(path);
    itemsRef.push(data);
  }

  updateItem(path: string, key: string, data: any) {
    const itemsRef = this.db.list(path);
    itemsRef.set(key, data);
  }

  deleteItem(path: string, key: string) {
    const itemsRef = this.db.list(path);
    itemsRef.remove(key);
  }
}
