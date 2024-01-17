import type { ApiResponse } from '@/../env.d';
export default function AD(type: number, pageNum?: number, pageSize?: number): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
        const ADquery = new URLSearchParams();
        ADquery.append('type', type.toString());
        if (pageNum) {
            ADquery.append('pageNum', pageNum.toString());
        }
        if (pageSize) {
            ADquery.append('pageSize', pageSize.toString());
        }
        fetch(`http://172.30.179.248:10001/prod-api/api/rotation/list?${ADquery.toString()}`, {
            method: 'GET',
            headers: {
                'contentType': 'application/x-www-form-urlencoded'
            }
        })
        .then((res) => {
            if (res.status !== 200) {
                reject(new Error('Request failed with status ' + res.status));
            }
            return res.json();
        })
        .then((data: ApiResponse) => {
            console.log(data);
            resolve(data);
        })
        .catch((err) => {
            console.error(err);
            reject(err);
        });
    });
}
