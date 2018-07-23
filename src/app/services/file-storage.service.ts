import {Injectable} from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable({
    providedIn: 'root'
})
export class FileStorageService {
    constructor(private storage: AngularFireStorage) {
    }

    uploadFile(filePath: string, event) {
        const randomId = Math.random().toString(36).substring(2);
        this.storage.ref(filePath + '_' + randomId);
        return this.storage.upload(filePath + '_' + randomId, event.target.files[0]);
    }
}
