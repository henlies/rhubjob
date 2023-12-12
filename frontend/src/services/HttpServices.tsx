const apiUrl = "http://localhost:8080";
const getRequestOptions = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};
// const patchRequestOptions = {
//     method: "PATCH",
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//     },
// };
const deleteRequestOptions = {
    method: "DELETE",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};

async function GetUserList() {
    let res = await fetch(`${apiUrl}/users`, getRequestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });
    return res;
};

async function DeleteUser(id: number) {
    let res = await fetch(`${apiUrl}/user/${id}`, deleteRequestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });
    return res;
}

export {
    GetUserList,
    DeleteUser,
};