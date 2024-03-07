import { SigninInterface } from "../models/Signin";
import { UserSigninJobInterface, UserSigninUseInterface } from "../models/UserSignin";
import { PostCInterface, PostEInterface } from "../models/Post";
import { PetInterface } from "../models/Pet";
import { AddressInterface } from "../models/Address";

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
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("per", res.data.per);
            localStorage.setItem("active", res.data.active);
            localStorage.setItem("status", res.data.status);
            localStorage.setItem("pic", res.data.pic);
            localStorage.setItem("petid", res.data.pet);
            localStorage.setItem("addressid", res.data.address);
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
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

async function CreatePost(data: PostCInterface) {
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

async function CreatePet(data: PetInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/pet`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                localStorage.setItem("petid", res.data.ID);
                return res.data;
            } else {
                return false;
            }
        });
    return res;
};

async function CreateAddress(data: AddressInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/address`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                localStorage.setItem("petid", res.data.ID);
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

async function UpdateServiceDetail(data: PostEInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/serviceuserdetail`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                localStorage.setItem("name", res.data.Firstname)
                localStorage.setItem("pic", res.data.Pic);
                return res.data;
            } else {
                return false;
            }
        });
    return res;
}

async function UpdatePet(data: PetInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/pet`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                localStorage.setItem("petid", res.data);
                return res.data;
            } else {
                return false;
            }
        });
    return res;
}

async function UpdateAddress(data: AddressInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/address`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                localStorage.setItem("addressid", res.data);
                return res.data;
            } else {
                return false;
            }
        });
    return res;
}

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

async function GetServiceUserByUID(id: string | null) {
    let res = await fetch(`${apiUrl}/serviceuser/${id}`, getRequestOptions)
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

async function GetPetID(id: string | null) {
    let res = await fetch(`${apiUrl}/pet/${id}`, getRequestOptions)
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

async function GetAddressID(id: string | null) {
    let res = await fetch(`${apiUrl}/address/${id}`, getRequestOptions)
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

async function GetServiceProviderByUID(id: string | null) {
    let res = await fetch(`${apiUrl}/serviceprovider/${id}`, getRequestOptions)
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

async function GetPrefix() {
    let res = await fetch(`${apiUrl}/prefixes`, getRequestOptions)
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

async function GetGender() {
    let res = await fetch(`${apiUrl}/genders`, getRequestOptions)
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

async function GetBlood() {
    let res = await fetch(`${apiUrl}/bloods`, getRequestOptions)
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

async function GetGene(id?: number) {
    let res = await fetch(`${apiUrl}/genes/${id}`, getRequestOptions)
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

async function GetProvicne() {
    let res = await fetch(`${apiUrl}/provinces`, getRequestOptions)
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

async function GetDistricts(id?: number) {
    let res = await fetch(`${apiUrl}/districts/${id}`, getRequestOptions)
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

async function GetZipcodeDID(id?: number) {
    let res = await fetch(`${apiUrl}/zipcode/${id}`, getRequestOptions)
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

async function GetPostbyPId(id?: number) {
    let res = await fetch(`${apiUrl}/getposttrack/${id}`, getRequestOptions)
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

async function FinishPost(id?: number) {
    let res = await fetch(`${apiUrl}/finishpost/${id}`, deleteRequestOptions)
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

export {
    GetSignin,
    CreateUserSigninUse,
    CreateUserSigninJob,
    CreatePost,
    CreatePet,
    CreateAddress,

    UpdatePost,
    UpdateServiceDetail,
    UpdatePet,
    UpdateAddress,
    CanclePost,

    GetUserListActive,
    GetUserListNonActive,
    GetServiceUserByUID,
    GetPetID,
    GetAddressID,
    GetServiceProviderByUID,
    GetPrefix,
    GetGender,
    GetBlood,
    GetType,
    GetGene,
    GetProvicne,
    GetDistricts,
    GetZipcodeDID,
    GetPostShowIDstatus1,
    GetPostShowIDstatus2,
    GetPostShowIDstatus3,
    GetPostShowIDstatus4,
    GetPostbyId,
    GetPostbyPId,

    ApproveUser,
    DeleteServiceUser,
    DeleteServiceProvider,
    ActiveServiceUser,
    ActiveServiceProvider,
    DeletePost,
    FinishPost,
    AcceptPost,
    NonAcceptPost,
};