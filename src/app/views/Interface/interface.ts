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
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  userRoleId: number;
  userRole: any;
}

export interface IApiData {
  data: any[];
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ICarInventory {
  carModelId: number;
  colour: string;
  mileage: number;
  comments: string;
  advertisingPlatformId: number;
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
  isSold: boolean;
}

export interface IEditCarInventory extends ICarInventory {
  id: number;
}

export interface ICarModel extends IAddCarModel {
  id: number;
  carMake: ICarMake;
}

export interface IAddCarModel {
  name: string;
  carMakeId: number;
}

export interface IEditCarModel extends IAddCarModel {
  id: number;
}

export interface ICarMake extends IAddCarMake {
  id: number;
}

export interface IAddCarMake {
  name: string;
}

export interface IAddClient {
  name: string;
  surname: string;
  idNumber: string;
  pnoneNumber: string;
  email: string;
  advertisingPlatformId: number;
}

export interface IClient extends IAddClient {
  id: number;
}

export interface IAdPlatform extends IAddAdPlatform {
  id: number;
  frequency: IFrequency;
}

export interface IAddAdPlatform {
  name: string;
  paymentAmount: number;
  frequencyId: number;
}

export interface IFrequency {
  id: number;
  name: string;
}

export interface IColour extends IAddColour {
  id: number;
}

export interface IAddColour {
  name: string;
}

export interface IFrequency extends IAddFrequency {
  id: number;
}

export interface IAddFrequency {
  name: string;
}
