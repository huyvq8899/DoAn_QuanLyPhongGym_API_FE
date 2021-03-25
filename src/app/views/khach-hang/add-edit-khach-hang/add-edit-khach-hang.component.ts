// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NzModalRef } from 'ng-zorro-antd/modal';
// import { NzMessageService } from 'ng-zorro-antd/message';
// import { KhachHangService } from 'src/app/services/khach-hang.service';
// import { Router } from '@angular/router';
// import { VungService } from 'src/app/services/vung.service';
// import { SearchEngine } from "src/app/shared/searchEngine";
// import {NganhNgheService} from 'src/app/services/nganh-nghe.service'
// import {PhuongAnNhapService} from 'src/app/services/phuong-an-nhap.service'
// import { ValidatorsDupcateMaKhachHang } from "src/app/customValidators/validatorsDupcateName";
// import { NzModalService } from 'ng-zorro-antd/modal';
// import { AddEditVungComponent } from 'src/app/views/danh-muc/vung/modal/add-edit-vung/add-edit-vung.component';
// import { AddEditPhuongAnNhapComponent } from 'src/app/views/danh-muc/phuong-an-nhap/modal/add-edit-phuong-an-nhap/add-edit-phuong-an-nhap.component';
// import { AddEditNganhNgheComponent } from 'src/app/views/danh-muc/nganh-nghe/modal/add-edit-nganh-nghe/add-edit-nganh-nghe.component'
// import { PagingParams } from 'src/app/models/PagingParams';
// import { UserService } from 'src/app/services/user.service';
// @Component({
//   selector: 'app-add-edit-khach-hang',
//   templateUrl: './add-edit-khach-hang.component.html',
//   styleUrls: ['./add-edit-khach-hang.component.scss']
// })
// export class AddEditKhachHangModalComponent implements OnInit {
//   @Input() idNew: any;
//   @Input() isAddNew: boolean;
//   @Input() khachHangData: any;
//   stt:any;
//   listPhuongAnNhap:any[]=[];
//   listPhuongAnNhapTmp:any[]=[];
//   listVung:any[]=[];
//   listVungTmp:any[]=[];
//   listNganh:any[]=[];
//   listNganhTmp:any[]=[];
//   myFormGroup: FormGroup;
//   selectedloaiKhachHang:any;
//   selectedId:any;
//   displayData: PagingParams = {
//     PageNumber: 1,
//     PageSize: 20,
//     Keyword: '',
//     SortKey: '',
//     SortValue: '',
//     fromDate: "",
//     toDate: "",
//     KeywordCol: "",
//     ColName: "",
//   };
//   BaoLanhs=[
//     {
//       ma:1,
//       loai:'Có'
//     },
//     {
//       ma:2,
//       loai:'Không'
//     }
//   ]
//   cacLoaiTrangThai=[
//     {
//       ma:1,
//       loai:'Đã bán'
//     },
//     {
//       ma:2,
//       loai:'Chưa bán'
//     }
//   ]
//   constructor(
//     private modelRef: NzModalRef,
//     private fb: FormBuilder,
//     private message: NzMessageService,
//     private khachhang: KhachHangService,
//     private router: Router,
//     private modal: NzModalRef,
//     private VungService : VungService,
//     private NganhNgheService:NganhNgheService,
//     private modalz :NzModalService,
//     private PhuongAnNhapService:PhuongAnNhapService,
//     private userService:UserService
//   ) { }
//     cacLoaiKhachHang=[
//       {
//         ma:1,
//         loai:'Thương mại'
//       },
//       {
//         ma:2,
//         loai:'Công nghiệp'
//       }
//     ]
//     onVungChange(event){
     
//       const vung = this.listVung.find(x => x.vungId === event);
//   //console.log(khachHang);
//     if (this.myFormGroup.dirty) {
     
//       if (vung) {
  
//         this.myFormGroup.patchValue({
//           maKhachHang:vung.maVung,
//           tenVung:vung.tenVung
         
//         });

//       }

//     }
//     }
//     onNganhChange(event){
      
//       const nganh = this.listNganh.find(x => x.nganhNgheId === event);
//   console.log(nganh);
//     if (this.myFormGroup.dirty) {
//       if (nganh) {
//         this.myFormGroup.patchValue({
//           tenNganhNghe:nganh.tenNganhNghe,
//           maNganhNghe:nganh.maNganhNghe
//         });
 
//       }
//     }
//     }
//   ngOnInit() {
//       this.selectedId=localStorage.getItem('userId');;
//     this.createForm();
//     if(this.isAddNew) {
//       this.myFormGroup.get(`id`).setValue(this.idNew);
//     } else {
//       this.myFormGroup.patchValue({
//         tenNganhNghe:this.khachHangData.tenNganhNghe,
//         tenVung:this.khachHangData.tenVung,
//         ...this.khachHangData
//       });
//     }
//     this.PhuongAnNhapService.getAll().subscribe((rs:any)=>{
//       this.listPhuongAnNhap=rs;
//       this.listPhuongAnNhapTmp=rs;
//       // if(this.isAddNew && rs.length > 0) { 
//       //   this.myFormGroup.get('vungId').setValue(rs[0].vungId);
//       //   this.myFormGroup.get('maKhachHang').setValue(rs[0].maVung);
//       // }
//     })
//     this.VungService.getAll().subscribe((rs:any)=>{
//       this.listVung=rs;
//       this.listVungTmp=rs;
//       // if(this.isAddNew && rs.length > 0) { 
//       //   this.myFormGroup.get('vungId').setValue(rs[0].vungId);
//       //   this.myFormGroup.get('maKhachHang').setValue(rs[0].maVung);
//       // }
//     })
//     this.myFormGroup.get('loaiKhachHang').setValue(this.cacLoaiKhachHang[0].loai);
//     this.myFormGroup.get('trangThaiKhachHang').setValue(this.cacLoaiTrangThai[0].loai);
//     this.NganhNgheService.getAll().subscribe((rs:any)=>{
//       this.listNganh=rs;
//       this.listNganhTmp=rs;
//       // if(this.isAddNew && rs.length > 0) { 
//       //   this.myFormGroup.get('nganhNgheId').setValue(rs[0].nganhNgheId);
//       // }
//     })
//   }
//   addPhuongAnNhap() {
//     const modal = this.modalz.create({
//       nzTitle: 'Thêm mới',
//       nzContent: AddEditPhuongAnNhapComponent,
//       nzClosable: false,
//       nzFooter: 'null',
//       nzWidth: '30%',
//       nzStyle: {
//         top: '10px'
//       },
//       nzComponentParams: {
//         idNew: this.listPhuongAnNhap.length + 1,
//         isAddNew: true
//       },
//     });
//     modal.afterClose.subscribe((rs: any) => {
//       if (rs) {
//         this.ngOnInit();
//       }
//     });
//   }
//   addVung() {
//     const modal = this.modalz.create({
//       nzTitle: 'Thêm mới',
//       nzContent: AddEditVungComponent,
//       nzClosable: false,
//       nzFooter: 'null',
//       nzWidth: '30%',
//       nzStyle: {
//         top: '10px'
//       },
//       nzComponentParams: {
//         idNew: this.listVung.length + 1,
//         isAddNew: true
//       },
//     });
//     modal.afterClose.subscribe((rs: any) => {
//       if (rs) {
//         this.ngOnInit();
//       }
//     });
//   }

//   addNganh() {
//     const modal = this.modalz.create({
//       nzTitle: 'Thêm mới',
//       nzContent: AddEditNganhNgheComponent,
//       nzClosable: false,
//       nzFooter: 'null',
//       nzWidth: '30%',
//       nzStyle: {
//         top: '10px'
//       },
//       nzComponentParams: {
//         idNew: this.listNganh.length + 1,
//         isAddNew: true
//       },
//     });
//     modal.afterClose.subscribe((rs: any) => {
//       if (rs) {
//         this.ngOnInit();
//       }
//     });
//   }
//   saveChanges() {
//     if(this.myFormGroup.invalid) {      
//       for (const i in this.myFormGroup.controls) {

//         this.myFormGroup.controls[i].markAsDirty();
//         this.myFormGroup.controls[i].updateValueAndValidity();
//       }
//       return;
//     }
//     // console.log('submitted');
//     if (this.isAddNew === true) {
//       console.log('api insert');
      
//       this.khachhang.Insert(1,this.myFormGroup.value).subscribe((rs: any) => {
//         if (rs === 1) {
//           this.modal.destroy(rs);
//           this.message.create('success', `Thêm khách hàng thành công`);
          
//           // console.log(rs);
//         } else {
//           this.message.create('error', `Thêm thông tin không thành công`);
//           this.modal.destroy(rs);
//           // console.log(rs);
//         }
//       });
//     }
//     else {
//       this.khachhang.Update(1,this.myFormGroup.getRawValue()).subscribe(
//         (result: any) => {
//           if (result === 1) {
//             // console.log(result);
//             this.message.create('success', `Cập nhật thông tin khách hàng thành công`);
//             this.modal.destroy(result);
            
//           } else {
//             this.message.create('error', `Sửa thông tin không thành công`);
//             // console.log(result);
//             this.modal.destroy(result);
//           }
//         }
//       );
//     }
//     //const myFormGroupData = this.myFormGroup.getRawValue();
//     //this.modelRef.destroy(myFormGroupData);
//   }
//   searchVung(event){
//     const arrCondition = ["tenVung"];
//     this.listVung = SearchEngine(this.listVungTmp, arrCondition, event);
//   }
//   searchNganh(event){
//     const arrCondition = ["tenNganhNghe"];
//     this.listNganh = SearchEngine(this.listNganhTmp, arrCondition, event);
//   }

//   createForm() {
//     if(this.isAddNew){
//     this.myFormGroup = this.fb.group({
//       id: [0],
//       createdDate:[null],
//       tenKhachHang: [null, [Validators.required]],
//       maKhachHang: [
//         null,[Validators.required],[ValidatorsDupcateMaKhachHang(this.khachhang,""),],
//       ],
//       diaChi: [null, [Validators.required]],
//       vanPhongGiaoDich:[null],
//       diaChiGiaoHang:[null],
//       email: [null],
//       hanMuc:[null],
//       thoiHanNo:[null],
//       deXuatNhanVien:[null],
//       sanLuongHangThang: [0],
//       phuongAnNhapId: [null],
//       nhaCungCapHienTai: [null],
//       giaTrietKhau: [null],
//       mongMuonKhachHang: [null],
//       cacVanDeCuaNhaCCCu: [null],
//       nguoiLienHe: [null, [Validators.required]],
//       chucVu: [null],
//       soDienThoai: [null, [Validators.required]],
//       luuY: [null],
//       danhGiaChung: [null],
//       loaiKhachHang: [null, [Validators.required]],
//       trangThaiKhachHang: [null, [Validators.required]],   
//       vungId:[null],
//       nganhNgheId:[null],
//       tenVung:[null, [Validators.required]],
//       tenNganhNghe:[null, [Validators.required]],
//       maSoThue:[null],
//       nguoiDaiDienPhapLuat: [null, [Validators.required]],
//       congNo:[null, [Validators.required]],
//       checkCIC:[null, [Validators.required]],
//       baoLanhThanhToan: [null],
//       soDienThoaiNguoiDaiDien:[null, [Validators.required]],
//       keToan:[null],
//       soDienThoaiKeToan:[null],
//       giamDoc:[null],
     

//     });
//   }else{
//     this.myFormGroup = this.fb.group({
//       id: [0],
//       tenKhachHang: [null, [Validators.required]],
//       maKhachHang: [
//         null,
//         [Validators.required],
//         [
//           ValidatorsDupcateMaKhachHang(
//             this.khachhang,
//             this.khachHangData.maKhachHang
//           ),
//         ],
//       ],
//       diaChi: [null, [Validators.required]],
//       vanPhongGiaoDich:[null],
//       diaChiGiaoHang:[null],
//       email: [null],
//       hanMuc:[null],
//       thoiHanNo:[null],
//       deXuatNhanVien:[null],
//       sanLuongHangThang: [null],
//       phuongAnNhapId: [null],
//       nhaCungCapHienTai: [null],
//       giaTrietKhau: [null],
//       mongMuonKhachHang: [null],
//       cacVanDeCuaNhaCCCu: [null],
//       nguoiLienHe: [null, [Validators.required]],
//       chucVu: [null],
//       soDienThoai: [null, [Validators.required]],
//       luuY: [null],
//       danhGiaChung: [null],
//       loaiKhachHang: [null, [Validators.required]],
//       trangThaiKhachHang: [null, [Validators.required]],   
//       vungId:[null],
//       nganhNgheId:[null],
//       tenVung:[null, [Validators.required]],
//       tenNganhNghe:[null, [Validators.required]],
//       maSoThue:[null],
//       nguoiDaiDienPhapLuat: [null, [Validators.required]],
//       congNo:[null, [Validators.required]],
//       checkCIC:[null, [Validators.required]],
//       baoLanhThanhToan: [null],
//       soDienThoaiNguoiDaiDien:[null, [Validators.required]],
//       keToan:[null],
//       soDienThoaiKeToan:[null],
//       giamDoc:[null],
//       ModifiedBy:this.selectedId
//     });
//   }
//   }

//   closeModal() {
//     this.modelRef.destroy(null);
//   }
// }
