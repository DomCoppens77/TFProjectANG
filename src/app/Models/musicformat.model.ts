export class APIMUSICFRMT {
    statusCode : number;
    message : string;
    results : MusicFormat[];
    resultCount : number;
}

export class MusicFormat
{
    id              : number;
    name            : string;
}
export class APIMUSICFRMTCNT{
    statusCode : number;
    message : string;
    results : number;
    resultCount : number;
    }