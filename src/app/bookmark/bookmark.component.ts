import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  @Input() bookmarkItem: { title: string, url: string, id: number };
  modalRef: BsModalRef;
  form: FormGroup;

  constructor(private modalService: BsModalService, private db: DbService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.bookmarkItem.title, Validators.required),
      url: new FormControl(this.bookmarkItem.url, [Validators.required, this.checkUrl])
    });
  }

  editBookmarkModal(template: TemplateRef<any>) {
    console.log(template);
    this.modalRef = this.modalService.show(template);
  }

  editBookmark(item) {
    this.db.updateItem('bookmarks', String(item.id),  this.form.value);
  }

  checkUrl(control: FormControl) {
    const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (regex.test(control.value)) {
      return null;
    }
    return {
      'errorCode': true
    };
  }

}
