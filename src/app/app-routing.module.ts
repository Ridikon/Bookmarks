import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {BookmarksComponent} from "./bookmarks/bookmarks.component";
import {SettingsComponent} from "./settings/settings.component";

const appRouts: Routes = [
    {
        path: '',
        component: BookmarksComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRouts)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}