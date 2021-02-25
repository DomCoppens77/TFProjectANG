export class APIMUSICTYPE {
    statusCode : number;
    message : string;
    results : MusicType[];
    resultCount : number;
}
export class MusicType
{
    id              : number;
    name            : string;
}

export class APICAPIMUSICTYPECNT{
    statusCode : number;
    message : string;
    results : number;
    resultCount : number;
    }