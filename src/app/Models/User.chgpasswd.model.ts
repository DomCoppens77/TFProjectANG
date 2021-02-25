export class Login {
    email : string;
    oldPasswd : string;
    passwd : string;
}

// BASE64
// console.log(btoa("password")); // cGFzc3dvcmQ=
// console.log(atob("cGFzc3dvcmQ=")); // password