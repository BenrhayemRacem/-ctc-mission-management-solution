export interface IOrganism {
  id: string
  name:string,
  activity: string,
  taxRegistrationNumber: string,
  contactPersonPosition: string,
  nature: string,
  numberOfEmployees: string,
  subsidiary: string,
  trainingNeeds:string,
  contactPerson :{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    cin:string
  }
}

export interface IGetOrganismResponse {
  data : IOrganism[],
  total : number,
  page : number ,
  numberOfPages :number
}
