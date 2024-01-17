export default function commentLike (id: number): Promise<boolean> {
    return new Promise((resolve, rejects) => {
        const token = localStorage.getItem("localToken");
        if (!token) {
            console.log("没有登录");
            rejects(false);
        } else {
            fetch(`http://172.30.179.248:10001/prod-api/press/pressComment/like/${id}`, {
                method: 'PUT',
                headers: {
                    contentType: "application/json",
                    Authorization: 'Bearer ' + token
                }
            })
            .then((res) => {
                if (res.status !== 200) {
                    console.log("当前状态码为：" + res.status);
                    rejects(false);
                }
                return resolve(true);
            })
            .catch((error) => {
                console.error(error);
                rejects(false);
            });
        }
    })
}