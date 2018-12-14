export interface IBloodBankModel {
  Location: {
    text: string;
    value: string;
  };
  _id: string;
  Country: string;
  City: string;
  State: string;
  BloodBankId: string;
  "O+": string;
  "O-": string;
  "A-": string;
  "A+": string;
  "B-": string;
  "B+": string;
  "AB-": string;
  "AB+": string;
  Date: string;
}
