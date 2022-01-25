import { CourierInterface } from "../courier/courier.interface";
import { ReceiverInterface } from "../receiver/receiver.interface";
import { SenderInterface } from "../sender/sender.interface";
import { ActionsTypes } from "../shipping.enum";

export interface ParcelDetailsInterface {
  width: number;
  length: number;
  height: number;
  weight: number;
  orderReference: string;
}
export interface CartInterface {
  sender: SenderInterface,
  receiver: ReceiverInterface,
  courier: CourierInterface,
  parcel_details: ParcelDetailsInterface

}

export interface ConfirmationModalInterface {
  title: string,
  message: string,
  confirm: string,
  close: string;
  action: ActionsTypes;
}


export interface SendParcel {
  orderReference: string;
  width: number;
  length: number;
  height: number;
  weight: number;
  shipperName: string;
  shipperContact: string;
  shipperEmail: string;
  shipperAddress1: string;
  shipperAddress2: string;
  shipperCity: string;
  shipperPostcode: string;
  shipperState: string;
  shipperCountryCode: string;
  receiverName: string;
  receiverContact: string;
  receiverEmail: string;
  receiverAddress1: string;
  receiverAddress2: string;
  receiverCity: string;
  receiverPostcode: string;
  receiverState: string;
  receiverCountryCode: string;
  pickupHubId?: string;
  courierId: string;
  chargeLines?: ChargeLine[];
}

export interface ChargeLine {
  productId?: string;
  unitAmount?: number;
  unitTaxAmount?: number;
  quantity?: number;
}
