import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PagingParams } from 'src/app/models/PagingParams';
import { RoleService } from 'src/app/services/role.service';
import { AddEditRoleComponent } from '../modals/add-edit-role/add-edit-role.component';
import { RolePermissionComponent } from '../modals/role-permission/role-permission.component';

@Component({
  selector: 'app-account-list-role',
  templateUrl: './account-list-role.component.html',
  styleUrls: ['./account-list-role.component.css']
})
export class AccountListRoleComponent implements OnInit {
  displayData: PagingParams = {
    PageNumber: 1,
    PageSize: 10,
    Keyword: '',
    SortKey: '',
    SortValue: '',
    fromDate: '',
    toDate: '',
    KeywordCol: '',
    ColName: '',
    userId: '',
  };
  total = 0;
  pageSizeOptions = [];
  listData: any[] = [];
  loading = false;
  constructor(
    private rolesv: RoleService,
    private message: NzMessageService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.loading = true;
    this.displayData.userId = localStorage.getItem('userId');
    this.rolesv.GetAllPaging(this.displayData).subscribe((data: any) => {
      this.listData = data.items;
      this.total = data.totalCount;
      this.displayData.PageNumber = data.currentPage;
      this.pageSizeOptions = [5, 10, 20, 50];
      this.getPageSizeOption();
      this.loading = false;
      // delete all
      if (this.listData.length === 0 && this.displayData.PageNumber > 1) {
        this.displayData.PageNumber -= 1;
        this.LoadData();
      }
    });
  }

  getPageSizeOption() {
    const pageSizeOptions1 = [];
    if (this.total > 10) {
      for (let index = 10; index < this.total; index = (index * 2)) {
        pageSizeOptions1.push(index);
        // console.log(pageSizeOptions1);
      }
    } else {
      this.displayData.PageSize = 10;
    }
    pageSizeOptions1.push(this.total);
    this.pageSizeOptions = pageSizeOptions1;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    // console.log(pageIndex, pageSize, sortField, sortOrder, filter);
    // this.displayData.PageSize = pageSize;
    // this.displayData.PageNumber = pageIndex;
    const sortconst: any = {
      key: sortField,
      value: sortOrder
    }
    //his.sort(sortconst);
    if (sortField != null && sortOrder != null) {
      this.sort(sortconst);
    }
    if (filter.length > 0) {
      this.displayData.ColName = filter[0].key;
      this.displayData.KeywordCol = filter[0].value;
      if (this.displayData.KeywordCol == null) {
        this.displayData.KeywordCol = '';
      }
    }
    this.LoadData();
  }

  changeSearch(event: any) {
    this.displayData.Keyword = event.target.value ? event.target.value : '';
    //this.LoadData();
  }
  search(colName: any) {
    this.displayData.ColName = colName;
    this.LoadData();
    this.displayData.KeywordCol = '';
  }
  sort(sort: { key: string; value: string }): void {
    this.displayData.SortKey = sort.key;
    this.displayData.SortValue = sort.value;
    this.LoadData();
  }
  clickThem() {
    // call modal
    const modal = this.modalService.create({
      nzTitle: 'Nh??m quy???n > Th??m',
      nzContent: AddEditRoleComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '400',
      nzWrapClassName: "vertical-center-modal",
      nzBodyStyle: { 'padding': '1px' },
      nzComponentParams: {
        isAddNew: true
      },
      nzFooter: [
        null
      ]
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.LoadData();
      }
    });
  }
  clickSua(data: any) {
    // call modal
    if (data.roleName === 'ADMIN') {
      return;
    }
    this.rolesv.GetById(data.roleId).subscribe((rs: any) => {
      const modal = this.modalService.create({
        nzTitle: 'Nh??m quy???n > S???a',
        nzContent: AddEditRoleComponent,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: '400',
        nzWrapClassName: "vertical-center-modal",
        nzBodyStyle: { 'padding': '1px' },
        nzComponentParams: {
          isAddNew: false,
          data: rs
        },
        nzFooter: [
          null
        ]
      });
      modal.afterClose.subscribe((rs: any) => {
        if (rs) {
          this.LoadData();
        }
      });
    })
  }
  clickXoa(data: any) {
    this.modalService.confirm({
      nzTitle: 'B???n c?? ch???c ch???n mu???n x??a kh??ng?',
      nzContent: '<b style="color: red;">H??y c??n nh???c th???t k??? tr?????c khi x??a</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.rolesv.Delete(data.roleId).subscribe((rs: any) => {
          if (rs === -1) {
            this.message.error('D??? li???u ??ang ???????c s??? d???ng, kh??ng th??? x??a');
            return;
          }
          if (rs > 0) {
            this.message.success('X??a th??nh c??ng');
            this.LoadData();
          } else {
            this.message.error('L???i x??a d??? li???u');
          }
        }, _ => {
          this.message.error('Error delete');
          console.log('Error delete');
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  clickPhanQuyen(data: any) {
    const modal = this.modalService.create({
      nzTitle: 'Ph??n quy???n',
      nzContent: RolePermissionComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '800',
      nzWrapClassName: "vertical-center-modal",
      nzBodyStyle: { 'padding': '1px' },
      nzComponentParams: {
        data: data
      },
      nzFooter: [
        null
      ]
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.LoadData();
      }
    });
  }
  clickReset() {
    this.modalService.confirm({
      nzTitle: 'B???n c?? ch???c ch???n mu???n ?????t v??? ch??? ????? m???c ?????nh kh??ng?',
      nzContent: '<b style="color: red;">H??y c??n nh???c th???t k??? tr?????c khi ?????t l???i, to??n b??? quy???n trong nh??m s??? ????a v??? tr???ng th??i tr???ng.</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.loading = true;
        this.rolesv.Reset().subscribe((rs: any) => {
          this.loading = false;
          if (rs) {
            this.message.success('Reset th??nh c??ng');
            this.LoadData();
          } else {
            this.message.error('L???i reset');
          }
        }, _ => {
          this.loading = false;
          this.message.error('Error reset');
        });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
