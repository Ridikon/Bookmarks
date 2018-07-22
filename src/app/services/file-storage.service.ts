import {Injectable} from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
import {finalize, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileStorageService {
    constructor(private storage: AngularFireStorage) {
    }

    uploadFile(filePath: string, event) {
        const randomId = Math.random().toString(36).substring(2);
        const ref = this.storage.ref(filePath + '_' + randomId);
        const task = this.storage.upload(filePath + '_' + randomId, event.target.files[0]);
        let downloadURL;
        return task.snapshotChanges().pipe(
            finalize(() => downloadURL = ref.getDownloadURL())
        );
    }
}
