import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { matchdetail } from '../../services/matchdetail.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  //for ag-grid 
  matchDetails: any;
  matchDetailColDef: any;
  domLayout : any;
  gridApi: any;
  gridColumnApi: any;
  quickSearchValue: any;

  //for modal
  addMatchDetailModal : boolean = false;
  updateMatchDetailModal : boolean = false;
  paymentDetailModal: boolean = false;


  updateDetails : any;

  constructor(private _matchDetailService: matchdetail) {
    this.domLayout = "autoHeight";
  }
  ngOnInit(): void {
    this.loadMatchDetails();
    this.matchDetailColDef = [
      { headerName: "S.N", valueGetter: 'node.rowIndex+1', width: 40, resizable: true },
      { headerName: "Match Date", field: 'matchDateInString', sortable: true, resizable: true, width: 100 },
      { headerName: "Amount", field: 'amount', sortable: true, resizable: true, width: 100 },
      { headerName: "Paid By", field: 'payerName', sortable: true, resizable: true, width: 100},
      { headerName: "Actions", field: 'action', cellRenderer: this.actions(),pinned: 'right', resizable: true, width: 100},
    ];
  }


  public actions() {
    return function(params :  any){
      return `
      <button type="button" data-action-type="Edit" class="btn ag-btn"> <i data-action-type="Edit" class="fas fa-eye"></i> </button > &nbsp; &nbsp;`;
    }
       
  }
  loadMatchDetails() : void{
    this._matchDetailService.getMatchDetails().subscribe(res =>{
      this.matchDetails = res;
    },err=>{

    })
  }

  onRowClicked(e: any){
    if (e.event.target) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "Edit": {
          this.updateDetails = data;
          this.paymentDetailModal = true;
          break;
        }
        case "Remove":
          return;
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

  onAddMatchDetail() : void{
    this.addMatchDetailModal = true;
  }

  close() : void{
    this.addMatchDetailModal = false;
    this.updateMatchDetailModal = false;
    this.paymentDetailModal = false;
  }

  callback() : void{
    this.close();
    this.loadMatchDetails();
  }

}
