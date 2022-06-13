

export interface ProfileUpdateInterface {
  firstName:string,
  lastName:string,
  email:string,
  cin:string,
  phoneNumber:string,
  role:string,
  profileImage:string,
  id:string,
  instructor: {
    professionalImage:string,
    resume:string,
    cv:string,
    startDate:string,
    endDate:string,
    courses:singleCourse[]
  },
  enrolled:singleEnrollCourse[]



}

export interface singleCourse  {
  id:string,
  name:string,
  capacity:string,
  address:string,
  preview:string,
  description:string,
  placesAvailable:string,
  startDate:string,
  endDate:string,
  mainImage:string,
  price:string,

}

export interface singleEnrollCourse {
  id:string,
state : string,
  penalization:string,
  extraInformations : {fullName:string,email:string} [],
  course :singleCourse
}
