export interface IRequestModel {
  Location: {
    text: string;
    value: string;
  };
  BloodType: [string];
  Going: boolean;
  Donated: boolean;
  _id: string;
  IdDonnationId: string;
  IdDonnationName: string;
  IdDonnationType: string;
  Cause: string;
  BloodBankId: string;
  Date: string;
  DonnersNumber: number;
}
