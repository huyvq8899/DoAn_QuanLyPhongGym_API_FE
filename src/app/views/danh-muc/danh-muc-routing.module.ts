import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardTypeComponent } from './card-type/card-type.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { FacilityComponent } from './facility/facility.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'bao-gia', pathMatch: 'full',
    },
    {
        path: 'card-type',
        component:CardTypeComponent
    },
    {
        path: 'equipment',
        component:EquipmentComponent
    },
    {
        path: 'facility',
        component:FacilityComponent
    },
    {
        path: 'service',
        component:ServiceComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DanhMucRoutingModule { }
