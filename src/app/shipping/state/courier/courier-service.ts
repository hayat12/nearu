import { CourierInterface } from "./courier.interface";

export function courierServiceData(courier:CourierInterface){
  return {
    ...courier
  } as CourierInterface;
}
