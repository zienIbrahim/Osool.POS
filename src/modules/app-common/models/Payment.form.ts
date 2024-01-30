import { Address } from "src/modules/point-of-sale/models";

export interface PaymentFrom {
    CustID: number,
    PaidAmount: number,
    BuyTypeID: number,
    CustName: string,
    CustMobile: string,
    CustTaxNumber: string,
    CustAddress: string,
    CustomerCR: string,
    Notes: string,
    customerAddress: Address,
    payCash : number,
    payBank : number,
    payCredit : number,
    ChangeCash : number,
    PaymentSuccess:boolean
}
export class CustomersList {
    idLevel4?: number;
    nameA?: string;
    nameE?: string;
    taxNumber?: string;
    custID?: number;
}
export interface GetClassQuantitiesByClassID {
    classID?: number;
    storID?: number;
}
