import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/userservice.component';
import { matchdetail } from '../../services/matchdetail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'create-match-detail',
  templateUrl: './create-match-detail.component.html',
  styleUrls: ['./create-match-detail.component.css']
})
export class CreateMatchDetailComponent implements OnInit {

  @Output("callback") callback = new EventEmitter<object>();

  createMatchDetailForm: any;
  submitted: boolean = false;

  users: any;

  constructor(private _formBuilder: FormBuilder,
              private _userService: UserService,
              private _matchDetailService: matchdetail,
              private _toastr : ToastrService){}
  ngOnInit(): void {
    this.loadUserDropDown();
    this.createMatchDetailForm = this._formBuilder.group({
      matchDate:[null, Validators.required],
      amount: [null, Validators.required],
      payerId : [null, Validators.required],
      userId: [null, Validators.required]
    });
  }
  
  loadUserDropDown() : void{
    this._userService.userDropdown().subscribe(res =>{
      this.users = res;
    })
  }

  get getFormControl(){
    return this.createMatchDetailForm.controls;
  }

  onCreate() : void {
    this.submitted = true;
    if(this.createMatchDetailForm.invalid) return;

    this._matchDetailService.createMatchDetail(this.createMatchDetailForm.value).subscribe(res =>{
      this._toastr.success("Match Detail added successfully.")
      this.callback.emit();
    },err=>{
      this._toastr.success("Match Detail added failed.")
    });
  }

}
