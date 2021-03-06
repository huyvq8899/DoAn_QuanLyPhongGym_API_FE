import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NoWhitespaceValidator } from 'src/app/customValidators/no-whitespace-validator';
import { GetDate } from 'src/app/shared/getDate';
import { ValidatorsDupcateName } from 'src/app/customValidators/validatorsDupcateName';
import { ValidatorsDupcateUserName } from 'src/app/customValidators/validatorsDupcateName';
import { ValidatorsDupcateMail } from 'src/app/customValidators/validatorsDupcateMail';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  isAddNew = false;
  data = JSON.parse(localStorage.getItem('currentUser'));
  userForm: FormGroup;
  roles: any = [];
  isLoading = false;
  constructor(
    private usersv: UserService,
    private fb: FormBuilder,
    private message: NzMessageService) { }
  ngOnInit() {
    if (this.isAddNew === true) {
      this.createformInsert();
    } else {
      this.createformUpdate();
      this.userForm.patchValue(this.data);
      this.userForm.get('dateOfBirth').setValue(GetDate(this.data.dateOfBirth));
    }
  }
  createformInsert() {
    this.userForm = this.fb.group({
      userId: [null],
      userName: [null, [Validators.required, NoWhitespaceValidator], [ValidatorsDupcateUserName(this.usersv,'')]],
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, NoWhitespaceValidator], [ValidatorsDupcateMail(this.usersv, '')]],
      title: [null],
      roleId: [null, [Validators.required]]
    });
  }
  createformUpdate() {
    this.userForm = this.fb.group({
      userId: [null, [Validators.required]],
      userName: [{ value: null, disabled: true }, [Validators.required, NoWhitespaceValidator], [ValidatorsDupcateUserName(this.usersv,this.data.userName)]],
      fullName: [null, [Validators.required]],
      // tslint:disable-next-line: max-line-length
      email: [{ value: null, disabled: false }, [Validators.required, Validators.email, NoWhitespaceValidator], [ValidatorsDupcateMail(this.usersv, this.data.email)]],
      title: [null],
      roleId: [null, [Validators.required]],
      dateOfBirth: [null],
      phone: [null],
      address: [null],
    });
  }
  saveChanges(): void {
    if (this.userForm.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.userForm.controls) {
        this.userForm.controls[i].markAsDirty();
        this.userForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    // console.log('submitted');
    if (this.isAddNew === true) {
      // console.log('api insert');
      this.usersv.Insert(this.userForm.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.message.create('success', `Th??m t??i kho???n th??nh c??ng`);
          // console.log(rs);
        } else {
          this.message.create('error', `Th??m l???i`);
          // console.log(rs);
        }
      });
    } else {
      this.isLoading = true;
      this.usersv.Update(this.userForm.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            this.message.create('success', `C???p nh???t t??i kho???n th??nh c??ng`);
            // console.log(result);
            this.isLoading = false;
            this.usersv.GetByUserName(this.userForm.get('userName').value).subscribe(
              (rs: any)=>{
                console.log(rs);
                localStorage.setItem('currentUser', JSON.stringify(rs));
              });
          } else {
            this.message.create('error', `S???a l???i`);
            // console.log(result);
            this.isLoading = false;
          }
        }
      );
    }
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      this.saveChanges();
    }
  }
}
