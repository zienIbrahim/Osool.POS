export {};

export interface POSClasses {
    classificationID: number
    classID: number
    classNo: string
    classTypeID: number
    classNameA: string
    classNameE: string
    aCost: number
    purchasePrice: number
    defaultStoreID: number
    expDate: boolean
    patchNoSN: boolean
    showInPOS: boolean
    vatid: number
    vatCalcType: number
    classUnitID: number
    unitName: string
    unitNameE: string
    tin: number
    barCode: string
    classUnitPrice: number
    aCostX: number
    lastPrice: number
    vatRate: number
    classImage: string
}
export interface POSClassesResponse{
data:POSClasses[]
}
export interface POSItemButtons {
    classID: number
    classNO: string
    classificationID: number
    classNameA: string
    classNameE: string
    vatid: number
    vatCalcType: number
    classTypeID: number
    classUnitID: number
    unitName: string
    unitNameE: string
    classUnitPrice: number
    lastPrice: number
    aCostX: number
    classImage: any
}
export interface POSCategoryButtons {
    classificationID: number
    classID: number
    classifNo: string
    classifNameA: string
    classifNameE: string

}
export interface Address   {
	countryCode: string;
	cityName:string ;
	provinceState:string;
	citySubdivisionName:string;
	street:string;
	additionalStreet:string;
	buildingNumber:string;
	postalCode:string;
	additionalNumber:string; 
 }
 export interface UserData {
    userID: Number;
    userName: string;
    password: string;
    defaultBranchID: Number;
    defaultCasherID: Number;
    defaultStorID: Number;
    userType: Number;
    statues: boolean;
    userDataOnly: boolean;
    saleLessCost: boolean;
    langID: Number;
    defaultCenterCost: Number;
    showAllBranch: boolean;
    showAllCC: boolean;
    showAllStor: boolean;
    ivcePriceEdit: boolean;
    changeDate: boolean;
    doDiscount: boolean;
    defaultBank: Number;
    showClassCost: boolean;
    showInvceCost: boolean;
    saleLessThanInvceCost: boolean;
    saleLessThanLastPrice: boolean;
    saleLessThanInvceLastPrice: boolean;
    saleOverCreditLimit: boolean;
    makeBackupRestore: boolean;
    showInvceLastPrice: boolean;
    showItemLastPrice: boolean;
    companyID: Number;
    showAllCompany: boolean;
    userPrevilige: userPrevilige[];
}
export interface Branch {
    branchID: number;
    branchName: string;
    branchNameEng: string;
    branchAddress: string;
    branchTel1: string;
    branchTel2: string;
    notes: string;
    negativePay: boolean;
    tableCount: number;
    showTablePOS: boolean;
    tableNameA: string;
    tableNameE: string;
    showInOut: boolean;
    showDiscountPOS: boolean;
    custDisplay: number;
    sallerComponant: number;
    catBtnHeight: number;
    catBtnWidth: number;
    showTicketNo: boolean;
    showLogo: boolean;
    posFooterNotes: string;
    showPayCreditInPOS: boolean;
    custRequre: boolean;
    itemPrintArEng: boolean;
    posButton: number;
    posPrintCount: number;
    posrPrintCount: number;
    printAdditionalIfLocal: boolean;
    posAdditionalPrintPrice: boolean;
    companyID: number;
    branchCR:string;
    PosPrinter:string;
    countryCode: string;
    cityName: string;
    provinceState: string;
    citySubdivisionName: string;
    street: string;
    additionalStreet: string;
    buildingNumber: string;
    postalCode: string;
    additionalNumber: string;
    scaleSettings: BranchScale;
}

export interface BranchScale {
    barcodePrefix: string;
    barcodeStart: number;
    barcodeLength: number;
    weightStart: number;
    weightLength: number;
    priceStart: number;
    priceLength: number;
    branchID: number;
}
export interface userPrevilige {
    numberID: Number;
    formName: string;
    showForm: boolean;
    addNew: boolean;
    save: boolean;
    edit: boolean;
    search: boolean;
    print: boolean;
    deleteRow: boolean;
    userID: Number;
}
