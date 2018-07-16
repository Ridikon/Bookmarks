import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DbService} from '../services/db.service';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  modalRef: BsModalRef;
  form: FormGroup;
  bookmarksCopy: any;
  bookmarks = [];

  constructor(private modalService: BsModalService, private db: DbService) {
  }

  ngOnInit() {
    this.db.getItems('/bookmarks').subscribe(res => {
        this.bookmarks = res;
        // this.bookmarks.map(item => {
        //     item.id = res.key;
        // });
        let copy = JSON.stringify(this.bookmarks);
        this.bookmarksCopy = JSON.parse(copy);
        console.log(res);
    });
    // this.db.getItems('/bookmarks').valueChanges().subscribe(res => {
    //   this.bookmarks = res;
    //   console.log('this.bookmarks', this.bookmarks);
    //   let copy = JSON.stringify(this.bookmarks);
    //   this.bookmarksCopy = JSON.parse(copy);
    // });
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      url: new FormControl('', [Validators.required, this.checkUrl])
    });
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

  addBookmarkModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addBookmark() {
    const bookmark = {
      title: this.form.value.title,
      url: this.form.value.url,
    };
    this.db.createItem('/bookmarks', bookmark);
    this.modalRef.hide();
    this.form.reset();
  }

  searchResult(search) {
    this.bookmarks = this.bookmarksCopy;
    if (!search) {
      return this.bookmarks;
    }
    this.bookmarks = this.bookmarks.filter(item => {
      if (String(item.data.title.toLowerCase()).includes(String(search.toLowerCase()))) {
        return item;
      }
    });
  }
}
