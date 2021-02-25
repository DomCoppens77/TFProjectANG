export class APIMUSIC {
    statusCode : number;
    message : string;
    results : APIMUSICDTO = new APIMUSICDTO();
    resultCount : number;
}

export class APIMUSIC2 {
    statusCode : number;
    message : string;
    results : Music[];
    resultCount : number;
}

export class APIMUSICDTO {
    totalRecords: number;
    currentPage: number;                          
    jump : number;
    musics: Music[];
}

export class Music
{
    id           : number;
    band         : string;
    title        : string;
    year         : number;
    tracks       : string;   
    nbCDs        : number;   
    nbDvds       : number;   
    nbLps        : number;   
    mTypeId      : number;    
    typeStr      : string;   
    formatId     : number;   
    formatStr    : string;   
    serialNbr    : string;   
    ctry         : string;   

    price      : number;
    curr       : string;
    shopId     : number;
    shopName   : string; /**/
    date       : Date;
    typeId     : number;  /**/
    signed     : boolean;
    signedBy   : string;  
    ean        : string;  
    eaN_EXT    : string;  
    comment1   : string;  
    comment2   : string;  
    onwed      : boolean;
}

export class MusicAdd
{
    id           : number;
    band         : string;
    title        : string;
    year         : number;
    tracks       : string;   
    nbCDs        : number;   
    nbDvds       : number;   
    nbLps        : number;   
    mTypeId      : number;    
    formatId     : number;   
    serialNbr    : string;   
    ctry         : string;   

    price      : number;
    curr       : string;
    shopId     : number;
    date       : Date;
    signed     : boolean;
    signedBy   : string;  
    ean        : string;  
    eaN_EXT    : string;  
    comment1   : string;  
    comment2   : string;  
    onwed      : boolean;
}


export class APIBANDLST {
    statusCode : number;
    message : string;
    results : string[];
    resultCount : number;
}