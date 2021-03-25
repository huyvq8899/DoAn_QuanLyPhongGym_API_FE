import { NgModule } from '@angular/core';
import { MDanhMucRoutingModule } from './m-danh-muc-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  imports: [
    SharedModule,
    MDanhMucRoutingModule,
    NgZorroAntdMobileModule,
  ],
  declarations: [
    // MLoiNhuanComponent, MAddEditLoiNhuanComponent,
    // MChenhLechComponent, AddEditMChenhLechComponent,
    // MKhoHangComponent, MAddEditKhoHangComponent,
    // MSanPhamComponent, MAddEditSanPhamComponent,
    // MNhaCungCapComponent, MAddEditNhaCungCapComponent,
    // MCuocVanChuyenComponent, MAddEditCuocVanChuyenComponent,
    // MVungComponent,MAddVungComponent,
    // MChietKhauComponent,MAddEditChietKhauComponent,
    // MLaiXeComponent,MAddEditLaiXeComponent,
    // MNganhNgheComponent,MAddEditNganhNgheModalComponent,
    // MPhongBanComponent,MAddEditPhongBanModalComponent,
    // MPhuongAnNhapComponent,MAddEditPhuongAnNhapComponent
  ]
})
export class MDanhMucModule { }
