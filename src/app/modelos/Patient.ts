export interface Patient {
  apiIndex: number,
  name: string,
  pictureUrl: string,
  email: string,
  gender: string,
  dob: {date: Date, age: number},
  phone: string,
  country: string,
  address: string,
  id: string,
  url: string
}