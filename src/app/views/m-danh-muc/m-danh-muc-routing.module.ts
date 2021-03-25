import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    // {
    //     path: 'm-phuong-an-nhap',
    //     component: MPhuongAnNhapComponent
    // },
    // {
    //     path: 'm-phuong-an-nhap/m-add-edit-phuong-an-nhap',
    //     component: MAddEditPhuongAnNhapComponent,
    // },
    // {
    //     path: 'm-phong-ban',
    //     component: MPhongBanComponent
    // },
    // {
    //     path: 'm-phong-ban/m-add-edit-phong-ban',
    //     component: MAddEditPhongBanModalComponent,
    // },
    // {
    //     path: 'm-nganh-nghe',
    //     component: MNganhNgheComponent
    // },
    // {
    //     path: 'm-nganh-nghe/m-add-edit-nganh-nghe',
    //     component: MAddEditNganhNgheModalComponent,
    // },
    // {
    //     path: 'm-chiet-khau',
    //     component: MChietKhauComponent
    // },
    // {
    //     path: 'm-chiet-khau/m-add-edit-chiet-khau',
    //     component: MAddEditChietKhauComponent,
    // },
    // {
    //     path: 'm-lai-xe',
    //     component: MLaiXeComponent
    // },
    // {
    //     path: 'm-lai-xe/m-add-edit-lai-xe',
    //     component: MAddEditLaiXeComponent,
    // },



    // {
    //     path: 'm-vung',
    //     component: MVungComponent
    // },
    // {
    //     path: 'm-vung/m-add-vung',
    //     component: MAddVungComponent,
    // },
    // {
    //     path: 'm-loi-nhuan',
    //     component: MLoiNhuanComponent
    // },
    // {
    //     path: 'm-loi-nhuan/m-add-loi-nhuan',
    //     component: MAddEditLoiNhuanComponent
    // },
    // {
    //     path: 'm-chenh-lech',
    //     component: MChenhLechComponent
    // },
    // {
    //     path: 'm-chenh-lech/m-add-edit-chenh-lech',
    //     component: AddEditMChenhLechComponent
    // },
    // {
    //     path: 'm-kho-hang',
    //     component: MKhoHangComponent
    // },
    // {
    //     path: 'm-kho-hang/m-add-edit-kho-hang',
    //     component: MAddEditKhoHangComponent
    // },
    // {
    //     path: 'm-san-pham',
    //     component: MSanPhamComponent
    // },
    // {
    //     path: 'm-san-pham/m-add-edit-san-pham',
    //     component: MAddEditSanPhamComponent
    // },
    // {
    //     path: 'm-nha-cung-cap',
    //     component: MNhaCungCapComponent
    // },
    // {
    //     path: 'm-nha-cung-cap/m-add-edit-nha-cung-cap',
    //     component: MAddEditNhaCungCapComponent
    // },
    // {
    //     path: 'm-cuoc-van-chuyen',
    //     component: MCuocVanChuyenComponent
    // },
    // {
    //     path: 'm-cuoc-van-chuyen/m-add-edit-cuoc-van-chuyen',
    //     component: MAddEditCuocVanChuyenComponent
    // },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MDanhMucRoutingModule { }
