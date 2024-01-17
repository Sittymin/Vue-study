export default function pressLike(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem("localToken");
        if (!token) {
            alert("没有登录");
            reject(false);
        } else {
            fetch(`http://172.30.179.248:10001/prod-api/press/press/like/${id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    "Authorization": 'Bearer ' + token
                }
            })
            .then((res) => {
                if (res.status !== 200) {
                    console.log("当前状态码为：" + res.status);
                    reject(false);
                }
                return res.json()
            })
            .then((data) => {
                console.log(data);
                resolve(true);
            })
            .catch((error) => {
                console.error(error);
                reject(false);
            });
        }
    });
}
