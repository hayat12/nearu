import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ServiceService } from './shipping/services/service.service';
import { EnumScreen } from './shipping/state/shipping.enum';
import { CountrySelectList } from './shipping/state/shipping.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'nearu';
  constructor(private router:Router, private _service: ServiceService){
  }
  ngOnInit(): void {
    const cart:any = localStorage.getItem(EnumScreen.CART);
    if(!!cart && Object.keys(JSON.parse(cart)).length > 0){
      this.router.navigate(['nearu/parcels']);
    }
  }

  getCountries(){
    var ctrz = this.getCountriesFromLocal();
    if(!!!ctrz || ctrz.length < 1){
    }else{
    this._service.get_countries()
      .pipe(
        tap((res) => this.setCountries(res)),
      )
      .subscribe();
    }
  }

  private getCountriesFromLocal(): CountrySelectList[] {
    let counries: any = localStorage.getItem(EnumScreen.COUNTRIES);
    return JSON.parse(counries) as CountrySelectList[];
  }

 private setCountries(countries: CountrySelectList[]) {
    localStorage.setItem(EnumScreen.COUNTRIES, JSON.stringify(countries));
  }
}
