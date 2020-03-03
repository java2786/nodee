import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './task/view/view.component';
import { AddComponent } from './task/add/add.component';
import { UpdateComponent } from './task/update/update.component';


const routes: Routes = [
    {path: 'view', component: ViewComponent},
    {path: 'add', component: AddComponent},
    {path: 'update', component: UpdateComponent},
    {path: '**', pathMatch:'full', redirectTo: '/view'}
    // {path: '**', pathMatch:'full', component: NotFoundComponent}
  ]
  
export const routing = RouterModule.forRoot(routes);