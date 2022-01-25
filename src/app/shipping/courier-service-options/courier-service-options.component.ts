import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { SettingHeader } from '../setting-header';
import { courierServiceData } from '../state/courier/courier-service';
import { CourierInterface, CourierParamsInterface } from '../state/courier/courier.interface';

@Component({
  selector: 'app-courier-service-options',
  templateUrl: './courier-service-options.component.html',
  styleUrls: ['./courier-service-options.component.css']
})
export class CourierServiceOptionsComponent extends SettingHeader implements OnInit, OnDestroy {
  _selectedCourier: any = "";

  courierServiceList:CourierInterface[] = [];
  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    private fb: FormBuilder,
    private _service:ServiceService
  ) { super() }

  ngOnInit(): void {
    if(Object.keys(this.getParcelDetails()).length < 1){
      this.router.navigate(['../parcel-details'], {relativeTo:this.activateRouter});
    }
    this.createFrom();
    this.loadCourierServices();
    this.loadCourierData();
  }

  loadCourierServices(){
    var _params:CourierParamsInterface = {
      ProductId:"H2D",
      ServiceTypeId:"EXP",
      PackageTypeId:"PAR",
      PostcodeFrom:this.getSender().shipperPostcode,
      CountryFrom:this.getSender().shipperCountryCode,
      PostcodeTo:this.getReceiver().receiverPostcode,
      CountryTo:this.getReceiver().receiverCountryCode,
      Weight: this.getParcelDetails().weight
    };
    this._service.get_CourierServicesOption(_params)
    .pipe(
      tap((resp)=>this.courierServiceList = resp),
      tap((res)=>{
        if(res && res.length > 0){
          const courier = this.getCourierDetails();
          if(this.isEmpty(courier.businessId)){
            this.selectedCourier(res[0]);
          }
        }
      }),
    )
    .subscribe();
  }

  loadCourierData(){
    const courier = this.getCourierDetails();
    if(this.isEmpty(courier.businessId)){
      this.form.patchValue(
        {
          ...courier
        }
      );
      this._selectedCourier = courier.businessId;
    }else{
      this.selectedCourier(courier);
    }
  }

  createFrom() {
    this.form = this.fb.group(
      {
        "businessId": [null, [Validators.required]],
        "businessName": [null, [Validators.required]],
        "businessLogo": [null],
        "amount": [null ],
        "taxAmount": [null ]
      }
    );
  }

  toParceDetails() {
    const courier = courierServiceData(this.form.getRawValue());
    if(!this.isEmpty(courier.businessId)){
      this.setCourierDetails(courier);
    }
    this.router.navigate(['../parcel-details'], { relativeTo: this.activateRouter });
  }

  async confrim(){
    if (this.isEmpty(this._selectedCourier)) {
      return;
    }
    const courier = courierServiceData(this.form.getRawValue());
    await this.setCourierDetails(courier);
    await this.setCart();
    this.router.navigate(['../parcels'], { relativeTo: this.activateRouter });
  }

  selectedCourier(courier: CourierInterface) {
    this._selectedCourier = courier.businessId;
    this.form.patchValue(
      {
        ...courier
      }
    )
  }

  ngOnDestroy(): void {
      this.form.reset();
      this._selectedCourier = null;
      this.courierServiceList = [];
  }
}
