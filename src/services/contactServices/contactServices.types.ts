export type AddContactData = {
  fullName: string;
  phoneNo: string;
  relation: string;
  image: string;
  email: string;
  uid: string;
  id: string;
};
export type ContactDataResponse = {
  email: string;
  fullName: string;
  id: string;
  image: string | null;
  phoneNo: string;
  relation: string;
  uid: string;
};
