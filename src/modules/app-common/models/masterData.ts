export interface Setting {
    iD?: number;
    calender?: number;
    autoNoClass?: boolean;
    priceEdit?: boolean;
    orderLimit?: boolean;
    maincurrency?: string;
    subcurrency?: string;
    classSrchType?: number;
    classifNoAuto?: boolean;
    bGType?: number;
    autoCalcCost?: boolean;
    maincurrencyEng?: string;
    subcurrencyEng?: string;
    autoBackupPath?: string;
    vendorIsCust?: boolean;
    autoEmpDocAlert?: boolean;
    autoEstDocAlert?: boolean;
    empDocDays?: number;
    estDocDays?: number;
    defaultStoreType?: number;
    defaultPayType?: number;
    checkUpdate?: boolean;
    branchesSalePrice?: number;
    branchesCost?: number;
}
export interface CompanyInfo {
    companyID: number;
    line1Arabic: string,
    line2Arabic: string,
    line3Arabic: string,
    line1Ena: string,
    line2Ena: string,
    line3Ena: string,
    pic: string,
    taxNumber: string,
    companyCR: string
}
export interface PrintSetting {
    topMarign?: number;
    bottomMarign?: number;
    printCompanyTitle?: boolean;
}
