export interface IUsers {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber:string;
    cin:string;
    password:string;
  }

  export interface IGetResponse {
  data : IUsers[],
    total : number,
    page : number ,
    numberOfPages :number
  }
