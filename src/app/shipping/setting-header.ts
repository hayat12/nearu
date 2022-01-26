import { HostListener } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { CourierInterface } from "./state/courier/courier.interface";
import { CartInterface, ParcelDetailsInterface } from "./state/parcel/parcels.interface";
import { ReceiverInterface } from "./state/receiver/receiver.interface";
import { SenderInterface } from './state/sender/sender.interface';
import { EnumScreen } from "./state/shipping.enum";
import { CountrySelectList } from "./state/shipping.interface";

export class SettingHeader {
  form: FormGroup;
  readonly baseUrl: string = environment.baseUrl;
  readonly logoBaseUrl: string = environment.logoBaseUrl;
  readonly defaultIconLogo: string = 'assets/images/logo_default.png';

  get invalidForm(): boolean {
    return this.form.invalid;
  }

  invalidInput(inputName: string): boolean {
    return (this.form.get(inputName)?.touched && this.form.get(inputName)?.invalid) ? true : false;
  }

  /**
   * @param sender
   * Add sender to localStorage
   */
  setSender(sender: SenderInterface) {
    localStorage.setItem(EnumScreen.SENDER, JSON.stringify(sender));
  }

  /**
   * get sender from localStorage
   */
  getSender() {
    const sender: any = localStorage.getItem(EnumScreen.SENDER);
    const x: SenderInterface = JSON.parse(sender);
    return { ...x } as SenderInterface;
  }

  /**
   * @param receiver
   * Add receiver to localStorage
   */
  setreceiver(receiver: ReceiverInterface) {
    localStorage.setItem(EnumScreen.RECEIVER, JSON.stringify(receiver));
  }

  /**
   * get receiver from localStorage
   */
  getReceiver() {
    const receiver: any = localStorage.getItem(EnumScreen.RECEIVER);
    const x: ReceiverInterface = JSON.parse(receiver);
    return { ...x } as ReceiverInterface;
  }

  /**
   * @param parcel_details
   * Add parcel_details to localStorage
   */
  setParcelDetails(parcel_details: ParcelDetailsInterface) {
    localStorage.setItem(EnumScreen.PARCEL_DETAILS, JSON.stringify(parcel_details));
  }

  /**
   * get parcel_details from localStorage
   */
  getParcelDetails() {
    const parcel_details: any = localStorage.getItem(EnumScreen.PARCEL_DETAILS);
    const x: ParcelDetailsInterface = JSON.parse(parcel_details);
    return { ...x } as ParcelDetailsInterface;
  }

  /**
   * @param courier
   * Add courier to localStorage
   */
  setCourierDetails(courier: CourierInterface) {
    localStorage.setItem(EnumScreen.COURIER_SERVICE_OPTIONS, JSON.stringify(courier));
  }

  /**
   * get courier from localStorage
   */
  getCourierDetails() {
    const courier: any = localStorage.getItem(EnumScreen.COURIER_SERVICE_OPTIONS);
    const x: CourierInterface = JSON.parse(courier);
    return { ...x } as CourierInterface;
  }


  /**
 * @param courier
 * Add Cart to localStorage
 */
  async setCart() {
    const _cart: CartInterface = {
      sender: this.getSender(),
      receiver: this.getReceiver(),
      courier: this.getCourierDetails(),
      parcel_details: this.getParcelDetails()
    }
    let _carts: CartInterface[] = [];
    _carts = this.getCart();
    _carts.push(_cart);
    // _carts = [
    //    _cart,
    //    ...this.getCart()
    //  ];
    await localStorage.setItem(EnumScreen.CART, JSON.stringify(_carts));
    await this.clearInfo();
  }

  /**
   * get Cart from localStorage
   */
  getCart() {
    const courier: any = localStorage.getItem(EnumScreen.CART);
    const x: CartInterface[] = JSON.parse(courier);
    return this.isEmpty(x) ? [] : x as CartInterface[];
  }

  /**
   * get Cart from localStorage
   */
  updateCart(cart: CartInterface[]) {
    localStorage.setItem(EnumScreen.CART, JSON.stringify(cart));
  }

  /**
   * after confirm clear the exsiting info
   * just keep the order...
   */

  clearInfo() {
    // localStorage.removeItem(EnumScreen.SENDER);
    localStorage.removeItem(EnumScreen.RECEIVER);
    localStorage.removeItem(EnumScreen.COURIER_SERVICE_OPTIONS);
    localStorage.removeItem(EnumScreen.PARCEL_DETAILS);
  }

  resetLoacalStorage() {
    localStorage.clear();
  }

  businessLogo(logo: string): string {
    return this.isEmpty(logo) ? this.defaultIconLogo : `${this.logoBaseUrl}/${logo}`;
  }


  /**
* store list of countries
*/
  setCountries(countries: CountrySelectList[]) {
    localStorage.setItem(EnumScreen.COUNTRIES, JSON.stringify(countries));
  }

  getCountriesFromLocal(): CountrySelectList[] {
    let counries: any = localStorage.getItem(EnumScreen.COUNTRIES);
    return JSON.parse(counries) as CountrySelectList[];
  }

  /**
   * Helper ...
   */
  isEmpty(value: any): boolean {
    if (value == null) return true;
    if (value == "") return true;
    if (value == undefined) return true;
    if (value == {}) return true;
    return false;
  }
}
