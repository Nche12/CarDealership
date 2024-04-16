export interface IInventory {
  id: number;
  carModelId: number;
  carModel: ICarModel;
  colour: string;
  mileage: number;
  comments: string;
  advertisingPlatformId: number;
  advertisingPlatform: IAdPlatform;
  broughtDate: Date;
  soldDate: Date;
  transferedDate: Date;
  returnedDate: Date;
  resoldDate: Date;
  soldAmount: number;
  clientId: number;
  clientAmount: number;
  commissionAmount: number;
  userId: number;
  user: IUser;
  isSold: boolean;
}

export interface IUser {
  id: number
  name: string
  surname: string
  email: string
  password: string
  phone: string
  userRoleId: number
  userRole: any
}

export interface IApiData {
  data: any[];
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ICarInventory {
  carModelId: number
  colour: string
  mileage: number
  comments: string
  advertisingPlatformId: number
  broughtDate: string
  soldDate: string
  transferedDate: string
  returnedDate: string
  resoldDate: string
  soldAmount: number
  clientId: number
  clientAmount: number
  commissionAmount: number
  userId: number
  isSold: boolean
}

export interface IEditCarInventory extends ICarInventory {
  id: number
}

export interface ICarModel {
  id: number
  name: string
  carMakeId: number
  carMake: CarMake
}

export interface CarMake {
  id: number
  name: string
}

export interface IClient {
  id: number
  name: string
  surname: string
  idNumber: string
  pnoneNumber: string
  email: string
  advertisingPlatformId: number
}

export interface IAdPlatform {
  id: number
  name: string
  paymentAmount: number
  frequencyId: number
  frequency: IFrequency
}

export interface IFrequency {
  id: number
  name: string
}

export interface IColour {
  id: number
  name: string
}
