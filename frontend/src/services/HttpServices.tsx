import { SigninInterface } from "../models/Signin";
import { UserSigninJobInterface, UserSigninUseInterface } from "../models/UserSignin";
import { UserInterface } from "../models/User";
import {
    PostEInterface,
    // PostaInterface, 
    PostsInterface
} from "../models/Post";

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
            localStorage.setItem("active", res.data.active);
            localStorage.setItem("status", res.data.status);
            localStorage.setItem("pic", res.data.pic);
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

async function UpdatePost(data: PostEInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

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
}

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

async function DeleteServiceUser(user?: string) {
    let res = await fetch(`${apiUrl}/serviceuser/${user}`, deleteRequestOptions)
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

async function DeleteServiceProvider(user?: string) {
    let res = await fetch(`${apiUrl}/serviceprovider/${user}`, deleteRequestOptions)
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

async function ActiveServiceUser(user?: string) {
    let res = await fetch(`${apiUrl}/useractive/${user}`, deleteRequestOptions)
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

async function ActiveServiceProvider(user?: string) {
    let res = await fetch(`${apiUrl}/provideractive/${user}`, deleteRequestOptions)
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

async function GetPostShow() {
    let res = await fetch(`${apiUrl}/posts`, getRequestOptions)
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

async function GetPostShowIDstatus1(id?: number) {
    let res = await fetch(`${apiUrl}/poststatus1/${id}`, getRequestOptions)
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

async function GetPostShowIDstatus2(id?: number) {
    let res = await fetch(`${apiUrl}/poststatus2/${id}`, getRequestOptions)
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

async function GetPostShowIDstatus3(id?: number) {
    let res = await fetch(`${apiUrl}/poststatus3/${id}`, getRequestOptions)
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

async function GetPostShowIDstatus4(id?: number) {
    let res = await fetch(`${apiUrl}/poststatus4/${id}`, getRequestOptions)
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

async function GetPostShowIDstatus5(id?: number) {
    let res = await fetch(`${apiUrl}/poststatus5/${id}`, getRequestOptions)
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

async function GetType() {
    let res = await fetch(`${apiUrl}/types`, getRequestOptions)
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

async function GetPostbyId(id?: number) {
    let res = await fetch(`${apiUrl}/getpost/${id}`, getRequestOptions)
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

async function GetPostStartId(id: string | null) {
    let res = await fetch(`${apiUrl}/poststart/${id}`, getRequestOptions)
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

async function GetPostIdTrack(id: string | null) {
    let res = await fetch(`${apiUrl}/posttrack/${id}`, getRequestOptions)
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

async function GetPostIdStatus(id: string | null) {
    let res = await fetch(`${apiUrl}/poststatus/${id}`, getRequestOptions)
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

// async function CheckPost(data: PostaInterface) {
//     const requestOptions = {
//         method: "PATCH",
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     }

//     let res = await fetch(`${apiUrl}/postchk`, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//             if (res.data) {
//                 return res.data;
//             } else {
//                 return false;
//             }
//         });
//     return res;
// }

async function DeletePost(id?: number) {
    let res = await fetch(`${apiUrl}/post/${id}`, deleteRequestOptions)
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

async function AcceptPost(id?: number) {
    let res = await fetch(`${apiUrl}/acceptpost/${id}`, deleteRequestOptions)
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

async function NonAcceptPost(id?: number) {
    let res = await fetch(`${apiUrl}/nonacceptpost/${id}`, deleteRequestOptions)
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

// async function CanclePost(id?: number) {
//     let res = await fetch(`${apiUrl}/canclepost/${id}`, deleteRequestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//             if (res.data) {
//                 return res.data;
//             } else {
//                 return false;
//             }
//         });
//     return res;
// };

async function CanclePost(data: PostEInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/canclepost`, requestOptions)
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

async function ShowChart() {
    let res = await fetch(`${apiUrl}/postchart`, getRequestOptions)
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
    UpdatePost,
    GetUserListActive,
    GetUserListNonActive,
    GetAdminUID,
    ApproveUser,
    DeleteServiceProvider,
    DeleteServiceUser,
    ActiveServiceUser,
    ActiveServiceProvider,
    GetRole,
    GetPostShow,
    GetPostShowIDstatus1,
    GetPostShowIDstatus2,
    GetPostShowIDstatus3,
    GetPostShowIDstatus4,
    GetPostShowIDstatus5,
    GetType,
    GetPostbyId,
    GetPostStart,
    GetPostStartId,
    GetPostIdTrack,
    GetPostIdStatus,
    // CheckPost,
    DeletePost,
    AcceptPost,
    NonAcceptPost,
    CanclePost,
    ShowChart,
};