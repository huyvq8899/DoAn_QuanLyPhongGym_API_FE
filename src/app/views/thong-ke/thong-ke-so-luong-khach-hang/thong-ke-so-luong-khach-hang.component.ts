import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { forkJoin } from "rxjs";
import { EnvService } from "src/app/env.service";
import { PagingParams } from "src/app/models/PagingParams";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: "app-thong-ke-so-luong-khach-hang",
  templateUrl: "./thong-ke-so-luong-khach-hang.component.html",
  styleUrls: ["./thong-ke-so-luong-khach-hang.component.scss"],
})
export class ThongKeSoLuongKhachHangComponent implements OnInit {
  loadingExportExcel: boolean;
  getDateTime: any;
  displayData: PagingParams = {
    fromDate: "",
    toDate: "",
  };
  listData: any[] = [];
  listOfData: any[] = [];
  loading = false;
  total=0;    
  private value;     
  currentUser: any = JSON.parse(localStorage.getItem("currentUser"));
  constructor(
    private modalService: NzModalService,
    private env: EnvService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }
  ngOnInit() {
    //this.LoadData();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.getDateTime = [
      moment().startOf("months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
    this.LoadData();
  }
  LoadData() {
    this.loading = true;
    this.displayData.userId = localStorage.getItem("userId");
    this.userService
      .GetBySoLuong(this.displayData)
      .subscribe((data: any) => {
        this.listData = data.items;
        this.listOfData = data;
        console.log(data);
        //this.displayData.PageNumber = data.currentPage;
        this.findsum(data);
        this.loading = false;
        // delete all

      });
  }
  findsum(data){   
    this.total=0;   
    this.value=data    
    for(let j=0;j<data.length;j++){   
         this.total+= this.value[j].soLuongKhachHang    
    }  
    console.log(this.total);
  }
  ConvertDateTime(str: string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  filterTable() {
    this.LoadData();
  }
  exportExcel() {
    const dateOb = new Date();
    const day = ("0" + dateOb.getDate()).slice(-2);
    const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
    const year = dateOb.getFullYear();
    const hours = ("0" + dateOb.getHours()).slice(-2);
    const minute = ("0" + (dateOb.getMinutes() + 1)).slice(-2);
    const sec = ("0" + (dateOb.getSeconds() + 1)).slice(-2);

    this.loadingExportExcel = true;
    this.userService.ExportExcelBaoCao(this.displayData).subscribe(
      (res: any) => {
        this.loadingExportExcel = false;
        const element = document.createElement("a");
        element.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.base64String}`;
        element.download = `Thong_ke_so_luong_khach_hang_da_them_${year}-${month}-${day}${hours}${minute}${sec}.xlsx`;
        element.click();
      },
      (err) => {
        console.log(err);
        this.loadingExportExcel = false;
      }
    );
  }

}
