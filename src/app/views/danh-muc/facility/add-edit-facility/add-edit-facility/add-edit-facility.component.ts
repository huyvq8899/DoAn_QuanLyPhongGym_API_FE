import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FacilityService } from 'src/app/services/facility.service';

@Component({
  selector: 'app-add-edit-facility',
  templateUrl: './add-edit-facility.component.html',
  styleUrls: ['./add-edit-facility.component.scss']
})
export class AddEditFacilityComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() FacilityData: any;
  myFormGroup: FormGroup;
  loading: boolean;
  displayData: any;
  selectedId: string;
  selectedUser: any;
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private facilityService: FacilityService,
    private router: Router,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`id`).setValue(this.idNew);
    } else {
      
      this.myFormGroup.patchValue({
        ...this.FacilityData
      });
    }
    this.loading = true;
    this.selectedId = localStorage.getItem('userId');
 
  }
  

  saveChanges() {
    if(this.myFormGroup.invalid) {
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }
      return;
    }
    // console.log('submitted');
    if (this.isAddNew === true) {
      // console.log('api insert');
      this.facilityService.postFacility(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          console.log(this.myFormGroup.value);
          this.modal.destroy(rs);
          this.message.create('success', `Thêm thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.facilityService.putFacility(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin thành công`);
            this.modal.destroy(result);
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);
            this.modal.destroy(result);
          }
        }
      );
    }
    //const myFormGroupData = this.myFormGroup.getRawValue();
    //this.modelRef.destroy(myFormGroupData);
  }


  createForm() {
    this.myFormGroup = this.fb.group({
      id: [null],
      facilityName: [null, [Validators.required]],
      taxCode: [null, [Validators.required]],
      email: [null,],
      address: [null, [Validators.required]],
      numberPhone: [null, [Validators.required]],
      fax: [null,],
      establishedDay: ["02/08/1999", [Validators.required]],
      userId: this.selectedId,
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}
