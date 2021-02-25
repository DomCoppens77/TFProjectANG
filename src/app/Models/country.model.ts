export class APICTRY{
    statusCode : number;
    message : string;
    results : Country[];
    resultCount : number;
    }

export class Country
{
    iso   : string;
    ctry  : string;
    isEU  : boolean;
}

export class APICTRYCNT{
    statusCode : number;
    message : string;
    results : number;
    resultCount : number;
    }