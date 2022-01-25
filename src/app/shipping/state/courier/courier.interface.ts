export interface CourierInterface {
  businessId: string;
  businessName: string;
  businessLogo: string;
  amount: number;
  taxAmount: number;
}
export interface CourierParamsInterface{
  ProductId:string;
  ServiceTypeId?:any;
  PackageTypeId?:any;
  PostcodeFrom?:any;
  CountryFrom?:any;
  PostcodeTo?:any;
  CountryTo?:any;
  Weight?:any;
}
