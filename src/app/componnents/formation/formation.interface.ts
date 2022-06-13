

export interface IAvailableInstructors {
  id:string,
  user : {
    firstName:string,
    lastName:string
  }

}

export interface IGetAvailableInstructorsResponse {
  data :IAvailableInstructors[],
  page:string,
  total:string
}
