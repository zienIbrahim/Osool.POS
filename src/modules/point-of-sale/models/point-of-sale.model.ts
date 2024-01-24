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

