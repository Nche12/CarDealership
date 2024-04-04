export interface IInventory {
  id: number;
  carModelId: number;
  carModel: string;
  colour: string;
  mileage: number;
  comments: string;
  advertisingPlatformId: number;
  advertisingPlatform: null;
  broughtDate: string;
  soldDate: string;
  transferedDate: string;
  returnedDate: string;
  resoldDate: string;
  soldAmount: number;
  clientId: number;
  clientAmount: number;
  commissionAmount: number;
  userId: number;
  user: string;
  isSold: boolean;
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