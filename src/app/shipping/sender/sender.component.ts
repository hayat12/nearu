import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { ServiceService } from '../services/service.service';
import { SettingHeader } from '../setting-header';
import { senderInfo } from '../state/sender/sender';
import { CountrySelectList } from '../state/shipping.interface';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent extends SettingHeader implements OnInit {
  countries:CountrySelectList[] = [];
  constructor(
    private router:Router,
    private activateRouter:ActivatedRoute,
    private fb:FormBuilder,
    private _service: ServiceService
    ) { super(); }

    ngOnInit(): void {
      this.createForm();
      this.getCountries();
      this.loadLocalData();
  }

  loadLocalData(){
    const sender = this.getSender();
    if(!this.isEmpty(sender)){
      this.form.patchValue(
        {
          ...sender
        }
      );
    }
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


  createForm(){
    this.form = this.fb.group(
      {
        shipperName: ["", [Validators.required]],
        shipperContact: [null, [Validators.required]],
        shipperPhoneCode: ["60", [Validators.required]],
        shipperEmail: [null],
        shipperAddress1: [null, [Validators.required]],
        shipperAddress2: [null],
        shipperCity: [null, [Validators.required]],
        shipperPostcode: [null, [Validators.required]],
        shipperState: [null, [Validators.required]],
        shipperCountryCode: ["MY", [Validators.required]],
      }
    );
  }

  toReceiver(){
    if(this.form.invalid){
      return this.form.markAllAsTouched();
    }
    const data = senderInfo(this.form.getRawValue());
    this.setSender(data);
    if (this.router.url.includes("sender")) {
      this.router.navigate(['../receiver'], { relativeTo: this.activateRouter });
    } else {
      this.router.navigate(['./receiver'], { relativeTo: this.activateRouter });
    }
  }
}
