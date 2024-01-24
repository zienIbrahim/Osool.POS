export interface AuthenticateResponse {
    id: string;
    username: string;
    refreshToken: string;
    token: string;
    tenantId: string;
    IsHaveMultiTenant: boolean;
    subscriptionRemainingDays:number;
    permisions:UserPermisions;
}
export interface Login {
    username? :string;
    password? :string;
    rememberMe? :string;
    returnUrl?:string
}
export interface UserFilePro {
    numberID: number;
    formName: string;
    showForm: boolean;
    addNew: boolean;
    save: boolean;
    edit: boolean;
    search: boolean;
    print: boolean;
    deleteRow: boolean;
    userID: number;
}

export interface UserPermisions {
    defaultBranchID: number;
    defaultCasherID: number;
    defaultStorID: number;
    userType: number;
    statues: boolean;
    userDataOnly: boolean;
    saleLessCost: boolean;
    langID: number;
    defaultCenterCost: number;
    showAllBranch: boolean;
    showAllCC: boolean;
    showAllStor: boolean;
    ivcePriceEdit: boolean;
    changeDate: boolean;
    doDiscount: boolean;
    defaultBank: number;
    showClassCost: boolean;
    showInvceCost: boolean;
    saleLessThanInvceCost: boolean;
    saleLessThanLastPrice: boolean;
    saleLessThanInvceLastPrice: boolean;
    saleOverCreditLimit: boolean;
    makeBackupRestore: boolean;
    showInvceLastPrice: boolean;
    showItemLastPrice: boolean;
    companyID: number;
    showAllCompany: boolean;
}