import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() search = new EventEmitter<string>();
  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;
  headerTheme: string;

  constructor(private renderer: Renderer2) {
      if (localStorage.pageOptions) {
          const theme = JSON.parse(localStorage.getItem('pageOptions'));
          this.headerTheme = theme.themeColor;
      } else {
          this.headerTheme = 'white';
      }
  }

  ngAfterViewInit(): void {
      // this.inputRef.nativeElement.focus()
      this.renderer.selectRootElement('#input-search').focus()
      // this.renderer.removeAttribute(this.inputRef.nativeElement, 'placeholder');
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
