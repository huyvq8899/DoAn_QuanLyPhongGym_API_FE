import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardTypeComponent } from './card-type/card-type.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'bao-gia', pathMatch: 'full',
    },
    {

        path: 'card-type',
        component:CardTypeComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DanhMucRoutingModule { }
