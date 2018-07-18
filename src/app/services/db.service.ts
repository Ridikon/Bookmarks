import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DbService {

    constructor(private db: AngularFireDatabase) {
    }

    getItems(path: string) {
        const bookmarkList = this.db.list(path).snapshotChanges()
            .pipe(map(items => {
                return items.map(a => {
                    const data = a.payload.val();
                    const key = a.payload.key;
                    return {key, data};
                });
            }));
        return bookmarkList;
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
