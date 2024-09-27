import { Routes } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: 'user-info', component: UserInfoComponent},
    {path:'users-list', component: UsersListComponent},
    {path:'home',component:HomeComponent},
    { path: "**", component: HomeComponent },
];
