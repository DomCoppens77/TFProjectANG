export class APIGENMOD {
    statusCode : number;
    message : string;
    results : GenMod[];
    resultCount : number;
}

export class GenMod
{
    id   : number;
    name  : string;
}

export class APIGENYTP {
    statusCode : number;
    message : string;
    results : GenYP[];
    resultCount : number;
}

export class GenYP
{
    year   : number;
    typeId : number;
    genTypeName : string;
    price  : number;
}

export class APIOBJECT {
    statusCode : number;
    message : string;
    results : ObjectDTO = new ObjectDTO();
    resultCount : number;
}

export class ObjectDTO
{
    totalRecords: number;
    currentPage: number;                          
    jump : number;
    objs: ObjDom[];

}

export class ObjDom
{
    id : number;
    pricE_EUR :number;
    typeId : number;
    genTypeName: string;
    ean: string;
    eaN_EXT: string;
    shopId : number;
    shopName: string;
    objtext: string;
}