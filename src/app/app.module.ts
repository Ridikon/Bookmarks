import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireStorageModule} from 'angularfire2/storage';

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ModalModule} from 'ngx-bootstrap';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {BookmarkComponent} from './bookmark/bookmark.component';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SettingsComponent} from './settings/settings.component';
import {AppRoutingModule} from './app-routing.module';
import {AddBookmarkComponent} from './add-bookmark/add-bookmark.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {UserFormComponent} from './user-form/user-form.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        BookmarkComponent,
        BookmarksComponent,
        SettingsComponent,
        AddBookmarkComponent,
        UsersComponent,
        UserComponent,
        UserFormComponent
    ],
    imports: [
        BrowserModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AppRoutingModule,
        AngularFireStorageModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
