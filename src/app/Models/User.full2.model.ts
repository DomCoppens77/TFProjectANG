export class APIUSER 
{
    statusCode : number;
    message : string;
    results : User[];
    resultCount : number;
}

export class User
{
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    passwd : string;
    secretAnswer : string;
    active : boolean;
    status : number;
    connectionCount : number;
    connectionLast : Date;
    avatar : string;
}