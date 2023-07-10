import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { matchdetail } from '../../services/matchdetail.service';
import { PaymentDetailService } from '../../services/paymentdetailservice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {

  @Output("callback") callback = new EventEmitter<object>();
@Input("match-detail") matchDetail : any;
  
 //for ag-grid 
 paymentDetails: any;
 paymentDetailColDef: any;
 domLayout : any;
 gridApi: any;
 gridColumnApi: any;
 quickSearchValue: any;

 constructor(private _paymentService: PaymentDetailService,
            private _toastr: ToastrService) {
  this.domLayout = "autoHeight";
}
ngOnInit(): void {
  this.loadPaymentDetails();
  this.paymentDetailColDef = [
    { headerName: "S.N", valueGetter: 'node.rowIndex+1', width: 40, resizable: true },
    { headerName: "Amount", field: 'amount', sortable: true, resizable: true, width: 100 },
    { headerName: "Payment Status", field: 'paymentStatusInString', sortable: true, resizable: true, width: 100},
    { headerName: "Name", field: 'username', sortable: true, resizable: true, width: 100},
    { headerName: "Actions", field: 'action', cellRenderer: this.actions(),pinned: 'right', resizable: true, width: 100},
  ];
}

loadPaymentDetails() : void{
  this._paymentService.getPaymentDetails(this.matchDetail.id).subscribe(res =>{
    this.paymentDetails = res;
  })
}


public actions() {
  return function(params :  any){
    return `
    <button type="button" data-action-type="Paid" class="btn ag-btn"> <i data-action-type="Paid" class="fas fa-eye"></i> </button > &nbsp; &nbsp;`
  }
     
}

onRowClicked(e: any){
  if (e.event.target) {
    let data = e.data;
    let actionType = e.event.target.getAttribute("data-action-type");

    switch (actionType) {
      case "Paid": {
        this.setAsPaid(data.userId, data.matchId);
        break;
      }
    }
  }
}

onFilterChanged(e: any){
  e.api.refreshCells();
}

onQuickFilterChanged() {
  this.gridApi.setQuickFilter(this.quickSearchValue);
  
}
onModelUpdated(){
  setTimeout(() => { this.gridColumnApi.autoSizeAllColumns() });
}


onGridReady(params : any){
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
}

setAsPaid(userId: string, matchId: string) : void{
  this._paymentService.setAsPaid(userId, matchId).subscribe(res =>{
    this._toastr.success('Paid successfully.')
    this.loadPaymentDetails();
  },err=>{
    this._toastr.success('Paid failed.')
  })
}


}
