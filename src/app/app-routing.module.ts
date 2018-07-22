import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {SettingsComponent} from './settings/settings.component';
import {UsersComponent} from './users/users.component';

const appRouts: Routes = [
    {
        path: '',
        component: BookmarksComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'users',
        component: UsersComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRouts)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
