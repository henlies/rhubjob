import { SigninInterface } from "../models/Signin";
import { UserInterface } from "../models/User";
import { UserSigninInterface } from "../models/UserSignin";

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
            if (res.data.status === 0) {
                return false;
            }
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("per", res.data.per);
            localStorage.setItem("status", res.data.status);
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

async function CreateUserSignin(data: UserSigninInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/usersignin`, requestOptions)
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

export {
    GetSignin,
    CreateUser,
    CreateUserSignin,
    GetUserList,
    DeleteUser,
};