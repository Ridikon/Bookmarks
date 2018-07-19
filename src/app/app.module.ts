import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ModalModule} from 'ngx-bootstrap';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {BookmarkComponent} from './bookmark/bookmark.component';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {SettingsComponent} from './settings/settings.component';
import {AppRoutingModule} from "./app-routing.module";
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        BookmarkComponent,
        BookmarksComponent,
        SettingsComponent,
        AddBookmarkComponent
    ],
    imports: [
        BrowserModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
