export class APICURRX {
    statusCode : number;
    message : string;
    results : CurrX[];
    resultCount : number;
}

export class CurrX
{
    id       : number;
    currFrom : string;
    currTo   : string;
    dateFrom : Date;
    dateTo   : Date;
    rate     : number;
}

export class APICURRXCNT {
    statusCode : number;
    message : string;
    results : number;
    resultCount : number;
}