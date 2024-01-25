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
