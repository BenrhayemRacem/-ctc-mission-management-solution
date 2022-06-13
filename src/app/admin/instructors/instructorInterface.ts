export interface IInstructor {
  id: string
 cv:string,
  startDate: string,
  endDate: string,
  user :{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    cin:string
  }
}

export interface IGetInstructorResponse {
  data : IInstructor[],
  total : number,
  page : number ,
  numberOfPages :number
}
