import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { ServiceService } from '../services/service.service';
import { SettingHeader } from '../setting-header';
import { receiverInfo } from '../state/receiver/receiver';
import { CountrySelectList, PhoneCodeSelectListInterface, SelectListInterface } from '../state/shipping.interface';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent extends SettingHeader implements OnInit, OnDestroy {
  countries:CountrySelectList[] = [];
  phoneCodeList:PhoneCodeSelectListInterface[] = [];
  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
    private fb:FormBuilder,
    private _service:ServiceService
  ) { super()}

  ngOnInit(): void {
    if(Object.keys(this.getSender()).length < 1){
      this.router.navigate(['../sender'], {relativeTo:this.activateRouter});
    }
    this.createForm();
    this.getCountries();
    this.loadLocalData();
}


getCountries(){
  var ctrz = this.getCountriesFromLocal();
  if(!!ctrz && ctrz.length > 0){
    this.countries = ctrz;
  }else{
  this._service.get_countries()
    .pipe(
      tap((res) => this.setCountries(res)),
      tap((res) => this.countries = res)
    )
    .subscribe();
  }
}

loadLocalData(){
  const receiver = this.getReceiver();
  if(!this.isEmpty(receiver)){
    this.form.patchValue(
      {
        ...receiver
      }
    );
  }
}

createForm(){
  this.form = this.fb.group(
    {
      receiverName: [null, [Validators.required]],
      receiverContact: [null, [Validators.required]],
      receiverPhoneCode: ["60", [Validators.required]],
      receiverEmail: [null],
      receiverAddress1: [null, [Validators.required]],
      receiverAddress2: [null],
      receiverCity: [null, [Validators.required]],
      receiverPostcode: [null, [Validators.required]],
      receiverState: [null, [Validators.required]],
      receiverCountryCode: ["MY", [Validators.required]],
    }
  );
}

  toParceDetials(){
    if(this.form.invalid){
      return this.form.markAllAsTouched();
    }
    this.setreceiver(receiverInfo(this.form.getRawValue()));
    this.router.navigate(['../parcel-details'], {relativeTo:this.activateRouter});
  }

  toSender(){
    this.setreceiver(receiverInfo(this.form.getRawValue()));
    this.router.navigate(['../sender'], {relativeTo:this.activateRouter});
  }

  ngOnDestroy(): void {
      this.form.reset();
  }
}
