export interface ICourses {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description:string;
  address:string;
  capacity:string;
  price:string;
  mainImage:string;
  preview:string;
}

export interface IGetCoursesResponse {
  data : ICourses[],
  total : number,
  page : number ,
  numberOfPages :number
}
