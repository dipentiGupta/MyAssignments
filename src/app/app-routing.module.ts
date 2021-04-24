import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  {path: '', component: ItemListComponent},
  {path:'create', component: ItemComponent},
  {path:'edititem/:itemId', component: ItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
