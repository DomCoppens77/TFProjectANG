export class APISHOP{
    statusCode : number;
    message : string;
    results : Shop[];
    resultCount : number;
    }

export class Shop
{
    id              : number;  
    name            : string;  
    address1        : string;  
    address2        : string;  
    zip             : string;  
    city            : string;  
    country         : string;  
    phone           : string;  
    email           : string;  
    webSite         : string;  
    localisationURL : string;  
    closed          : boolean; 

 }