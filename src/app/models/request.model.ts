import { Property } from "./property.model";
import { RequestStatus } from "./requestStatus.model";

export class RequestModel{
    id?: number;
    closeDate?: Date;
    creationDate?: Date;   
    contractSource?: string;
    codeptorDocumentsSource?: string;
    advisorId?:number;
    propertyId?: number;
    requestTypeId?: number;
    requestStatusId?: number;
    customerId?: number;
    requestStatus?:RequestStatus;    
    property?:Property
    // reports: Report[];
}