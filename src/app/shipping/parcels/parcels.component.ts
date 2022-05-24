import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { SettingHeader } from '../setting-header';
import { sendParcelData } from '../state/parcel/parcels';
import { CartInterface, ConfirmationModalInterface } from '../state/parcel/parcels.interface';
import { SenderInterface } from '../state/sender/sender.interface';
import { ActionsTypes } from '../state/shipping.enum';

declare var $:any;
@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.css']
})
export class ParcelsComponent extends SettingHeader implements OnInit {
  carts:CartInterface[] = [];
  selectedItem:any;
  modal:ConfirmationModalInterface;
  isLoading:boolean = false;
  error = {
    error: false,
    message: ""
  }
  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
    private _service:ServiceService,
  ) { super() }

  ngOnInit(): void {
    this.carts = this.getCart();
    // if(this.carts.length < 1){
    //   this.createNew();
    // }
  }

  checkOut(){
    this.modal = {
      title: "Check Out",
      message: "Confirm creation of parcels?",
      action: ActionsTypes.CHECK_OUT,
      confirm: "Check Out",
      close: "Close"
    };
    $('#confirmModal').modal('show');
  }

  createNew(){
    if(Object.keys(this.getSender()).length < 1){
      this.router.navigate(['../sender'], {relativeTo: this.activateRouter});
    }else{
      this.router.navigate(['../receiver'], {relativeTo: this.activateRouter});
    }
  }

  deleteItem(i:any){
    this.modal = {
      title: "Delete",
      message: "Are you sure, you want to delete ?",
      action: ActionsTypes.DELETE,
      confirm: "Delete",
      close: "Close"
    };
    this.selectedItem = i;
    $('#confirmModal').modal('show');
  }

  confirm(){
    $('#confirmModal').modal('hide');
    if(this.modal.action==ActionsTypes.DELETE){
      this.carts.splice(this.selectedItem, 1);
      this.updateCart(this.carts);
    }
    if(this.modal.action==ActionsTypes.CHECK_OUT){
      const x = sendParcelData(this.getCart());
      this.confirmSendParcel(x);
    }
  }

  confirmSendParcel(data:SenderInterface[]){

    this.error.error = false;
    this.isLoading = true;
    this._service.post_sendParcel(data)
    .pipe(
      tap((res)=>this.resetLoacalStorage()),
      tap((res)=>this.router.navigate(['../completed'], {relativeTo: this.activateRouter})),
      tap(()=>this.isLoading = false),
      catchError((e)=>{
        this.isLoading = false;
        let message = "An internal error occurred during your request!";
        if(!this.isEmpty(e.error)){
          if (!this.isEmpty(e.error.error)){
            message = e.error.error.message
          }
        }
        this.error = {
          error: true,
          message: message
        };
        console.log(e.error.error.message);
          return EMPTY;
      })
    )
    .subscribe();
  }
}
