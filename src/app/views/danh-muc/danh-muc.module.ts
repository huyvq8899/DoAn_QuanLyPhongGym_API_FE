import { NgModule } from '@angular/core';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { AddEditCardTypeComponent } from './card-type/add-edit-card-type/add-edit-card-type/add-edit-card-type.component';
import { CardTypeComponent } from './card-type/card-type.component';
@NgModule({
  imports: [
 
    SharedModule,
    DanhMucRoutingModule
  ],
  declarations: [
    AddEditCardTypeComponent,CardTypeComponent

]
})
export class DanhMucModule { }
