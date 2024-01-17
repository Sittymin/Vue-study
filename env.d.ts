/// <reference types="vite/client" />
export interface ApiResponse {
    total: number;
    rows: Row[];
    code: number;
    msg: string;
}

interface Row {
    searchValue: null | string;
    createBy: string;
    createTime: string;
    updateBy: null | string;
    updateTime: null | string;
    remark: null | string;
    params: Record<string, unknown>;
    id: number;
    appType: string;
    status: string;
    sort: number;
    advTitle: string;
    advImg: string;
    servModule: string;
    targetId: null | number;
    type: string;
}