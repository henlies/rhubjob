import { PostsInterface } from "../models/Post";
import { SigninInterface } from "../models/Signin";
import { UserInterface } from "../models/User";
import { UserSigninJobInterface, UserSigninUseInterface } from "../models/UserSignin";

const apiUrl = "http://localhost:8080";
const getRequestOptions = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};
const deleteRequestOptions = {
    method: "DELETE",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};

async function GetSignin(data: SigninInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    try {
        let response = await fetch(`${apiUrl}/signin`, requestOptions);
        let res = await response.json();
        if (res.data) {
            if (res.data.active === 0 || res.data.status === 0) {
                return false;
            }
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("per", res.data.per);
            localStorage.setItem("status", res.data.status);
            localStorage.setItem("active", res.data.active);
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

async function CreateUser(data: UserInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/user`, requestOptions)
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

async function CreateUserSigninUse(data: UserSigninUseInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/usersigninuse`, requestOptions)
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

async function CreateUserSigninJob(data: UserSigninJobInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/usersigninjob`, requestOptions)
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

async function CreatePost(data: PostsInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/post`, requestOptions)
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

async function GetUserListActive() {
    let res = await fetch(`${apiUrl}/usersactive`, getRequestOptions)
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

async function GetUserListNonActive() {
    let res = await fetch(`${apiUrl}/usersnonactive`, getRequestOptions)
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

async function GetUserUID(id: string | null) {
    let res = await fetch(`${apiUrl}/user/${id}`, getRequestOptions)
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

async function GetAdminUID(id: string | null) {
    let res = await fetch(`${apiUrl}/admin/${id}`, getRequestOptions)
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

async function ApproveUser(id?: number) {
    let res = await fetch(`${apiUrl}/userapprove/${id}`, deleteRequestOptions)
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

async function DeleteUser(id?: number) {
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
};

async function ActiveUser(id?: number) {
    let res = await fetch(`${apiUrl}/useractive/${id}`, deleteRequestOptions)
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

async function GetRole() {
    let res = await fetch(`${apiUrl}/roles`, getRequestOptions)
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

async function GetUser(id: string | null) {
    let res = await fetch(`${apiUrl}/user/${id}`, getRequestOptions)
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

async function GetPostStart() {
    let res = await fetch(`${apiUrl}/poststart`, getRequestOptions)
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

export {
    GetSignin,
    CreateUser,
    CreateUserSigninUse,
    CreateUserSigninJob,
    CreatePost,
    GetUserListActive,
    GetUserListNonActive,
    GetUserUID,
    GetAdminUID,
    ApproveUser,
    DeleteUser,
    ActiveUser,
    GetRole,
    GetUser,
    GetPostStart,
};