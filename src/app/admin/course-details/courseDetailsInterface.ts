

export interface ICourseDetails {
  id: string,
  name: string,
  startDate: string,
  endDate: string,
  description:string,
  address:string,
  placesAvailable:string,
  capacity:string,
  price:string,
  createdAt:string,
  updatedAt:string,
  deletedAt:string,
  "mainImage":string,
  preview:string;
  "instructedBy": {
    "createdAt": string,
    "deletedAt": string,
    "updatedAt": string,
    resume:string,
    "id": string,
    "cv": string,
    "startDate": string,
    "endDate": string,
    "professionalImage" : string,

    "user": {
      "createdAt": string,
      "deletedAt": string,
      "updatedAt": string,
      "id": string,
      "firstName": string,
      "lastName": string,
      "cin": string,
      "email": string,
      "phoneNumber": string,
      "role": string,
    }
  },
  "plannedBy": {
    "Id": string,
    "userName": string
  }

}

export interface IEnrollment {
  id:string,
  state : string,
  penalization:string,
  extraInformations : {fullName:string,email:string} [],
}


export interface IPenalty {
  msg:string,
}
