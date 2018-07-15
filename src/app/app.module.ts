import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ModalModule} from 'ngx-bootstrap';
import {BookmarkComponent} from './bookmark/bookmark.component';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookmarkComponent,
    BookmarksComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
