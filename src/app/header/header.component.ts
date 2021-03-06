import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  form: FormGroup;
  headerTheme: string;

  constructor() {
      if (localStorage.pageOptions) {
          const theme = JSON.parse(localStorage.getItem('pageOptions'));
          this.headerTheme = theme.themeColor;
      } else {
          this.headerTheme = 'white';
      }
  }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('')
    });
  }

  searchRun() {
    this.search.emit(this.form.value.search);
  }
}
