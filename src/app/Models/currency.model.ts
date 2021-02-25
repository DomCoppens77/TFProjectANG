export class APICURR {
    statusCode : number;
    message : string;
    results : Currency[];
    resultCount : number;
}
export class Currency
{
    curr            : string;
    desc            : string;
}

export class APICURRCNT{
    statusCode : number;
    message : string;
    results : number;
    resultCount : number;
    }