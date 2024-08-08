export interface IRowData {
    id: number;
    rowName: string;
    total: number;
    salary: number;
    mimExploitation: number;
    machineOperatorSalary: number;
    materials: number;
    mainCosts: number;
    supportCosts: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
}

export interface ICreateRowData {
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    parentId: number | null;
    rowName: string;
    salary: number;
    supportCosts: number;
}

export interface ICreateRowResponse {
    current: IRowData;
    changed: IRowData[];
}

export interface IUpdateRowData {
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    rowName: string;
    salary: number;
    supportCosts: number;
}

export interface IUpdateRowRequest {
    parentId: number;
    rowId: number;
    data: IUpdateRowData
}

export interface IUpdateRowResponse extends ICreateRowResponse {}

export interface IDeleteRowRequest extends Omit<IUpdateRowRequest, "data" | "parentId"> {}
export interface IDeleteRowResponse extends Omit<IUpdateRowRequest, "current"> {
    current: null
}

export interface IRowTreeData {
    id: number;
    rowName: string;
    total: number;
    salary: number;
    mimExploitation: number;
    machineOperatorSalary: number;
    materials: number;
    mainCosts: number;
    supportCosts: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
    child: IRowTreeData[];
}