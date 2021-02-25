export class Login {
    email : string;
    passwd : string;
}

// BASE64
// console.log(btoa("password")); // cGFzc3dvcmQ=
// console.log(atob("cGFzc3dvcmQ=")); // password


export class resetpasswd{
    email : string;
    secretAnswer : string;
    passwd : string;
}