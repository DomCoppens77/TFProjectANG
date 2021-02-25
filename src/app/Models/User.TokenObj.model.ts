

export class APITOKEN 
{
    statusCode : number;
    message : string;
    results : TokenObj;
    resultCount : number;
}

export class TokenObj 
{
    id : number;
    expirationDateTime : Date;
    bearerJWT : string;
}