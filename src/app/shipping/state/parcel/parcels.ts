import { CartInterface, ParcelDetailsInterface, SendParcel } from "./parcels.interface";

export function parcelDetails(parcelDetails: ParcelDetailsInterface) {
  return {
    ...parcelDetails
  } as ParcelDetailsInterface;
}

export function sendParcelData(carts: CartInterface[]): SendParcel[] {
  return carts.map((o) => {
    return {
      orderReference: o.parcel_details.orderReference,
      width: o.parcel_details.width,
      length: o.parcel_details.length,
      height: o.parcel_details.height,
      weight: o.parcel_details.weight,

      shipperName: o.sender.shipperName,
      shipperContact: o.sender.shipperContact,
      shipperEmail: o.sender.shipperEmail,
      shipperAddress1: o.sender.shipperAddress1,
      shipperAddress2: o.sender.shipperAddress2,
      shipperCity: o.sender.shipperCity,
      shipperPostcode: o.sender.shipperPostcode,
      shipperState: o.sender.shipperState,
      shipperCountryCode: o.sender.shipperCountryCode,

      receiverName: o.receiver.receiverName,
      receiverContact: o.receiver.receiverContact,
      receiverEmail: o.receiver.receiverEmail,
      receiverAddress1: o.receiver.receiverAddress1,
      receiverAddress2: o.receiver.receiverAddress2,
      receiverCity: o.receiver.receiverCity,
      receiverPostcode: o.receiver.receiverCountryCode,
      receiverState: o.receiver.receiverState,
      receiverCountryCode: o.receiver.receiverCountryCode,

      pickupHubId: "",
      courierId: o.courier.businessId,
      lineItems:[
        {
          productId: "PAR",
          unitAmount: 0,
          unitTaxAmount: 0,
          quantity: 1
        }
      ],
      chargeLines:[
        {
          id: "",
          name: "",
          description: "",
          sku: "",
          weight: 0,
          quantity: 1,
          unitPrice: 0,
          currency: "MYR",
        }
      ]
    };
  });
}
