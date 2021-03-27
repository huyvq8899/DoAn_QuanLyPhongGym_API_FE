import { NgModule } from '@angular/core';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { AddEditCardTypeComponent } from './card-type/add-edit-card-type/add-edit-card-type/add-edit-card-type.component';
import { CardTypeComponent } from './card-type/card-type.component';
import { AddEditEquipmentComponent } from './equipment/add-edit-equipment/add-edit-equipment/add-edit-equipment.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { AddEditFacilityComponent } from './facility/add-edit-facility/add-edit-facility/add-edit-facility.component';
import { FacilityComponent } from './facility/facility.component';
@NgModule({
  imports: [
 
    SharedModule,
    DanhMucRoutingModule
  ],
  declarations: [
    AddEditCardTypeComponent,CardTypeComponent,
    EquipmentComponent,AddEditEquipmentComponent,
    FacilityComponent, AddEditFacilityComponent

]
})
export class DanhMucModule { }
