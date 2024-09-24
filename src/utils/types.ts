import { UseFormRegister, UseFormReturn } from "react-hook-form";

export type Categories = {
  id: number;
  name: string;
};

export type FirstSubCategories = {
  id: number;
  name: string;
  categoryId: number | null;
};

export type SecondSubCategories = {
  id: number;
  name: string;
  firstSubCategoryId: number | null;
};

export type Project = {
  id: number;
  title: string;
};

export type Product = {
  category: string;
  firstSubCategory: string;
  secondSubCategory: string | null;
  name: string;
  manufacturer: string | null;
  productNumber: string | null;
  yearOfMake: number | null;
  yearOfPurchase: number | null;
  aestheticCondition: number | null;
  functionalCondition: number | null;
  imageUrls: string[];
  internalId: string | null;
  description: string | null;
  hinge: string | null;
  noiseReduction: number | null;
  securityGrade: string | null;
  fireGrade: string | null;
  glassModel: string | null;
  glassType: string | null;
  glassThickness: number | null;
  moduleMeasurements: string | null;
  climate: string | null;
  color: string | null;
  frameThickness: number | null;
  material: string | null;
  finish: string | null;
  unitOfMeasurement: string | null;
  width: number | null;
  length: number | null;
  height: number | null;
  depth: number | null;
  diameter: number | null;
  thickness: number | null;
  unitOfWeight: string | null;
  weight: number | null;
  GTIN: string | null;
  eNR: string | null;
  RSK: string | null;
  Bk04: string | null;
  BSAB: string | null;
  fileUrls: string[];
  originalPrice: number | null;
  externalPrice: number | null;
  internalPrice: number | null;
  buyerCanSetPrice: boolean | null;
  canBePickedUp: boolean | null;
  adress: string | null;
  postalCode: string | null;
  city: string | null;
  canBeSentByFreight: boolean | null;
  comment: string | null;
  contactPerson: string | null;
  projectId: number | null;
  ProductVariant: ProductVariant[];
};

export type ProductVariant = {
  id: number;
  amount: number | null;
  status: string | null;
  marketPlace: string | null;
  dateAvailable: Date | null;
  earliestDeliveryDate: Date | null;
  demountability: string | null;
  demountabilityComment: string | null;
  accessability: string | null;
  accessabilityComment: string | null;
  location1: string | null;
  location2: string | null;
  location3: string | null;
  location4: string | null;
  decisionDesignation1: string | null;
  decisionDesignation2: string | null;
  decisionDesignation3: string | null;
  decisionDesignation4: string | null;
  qrCodeUrl: string | null;
};

// form page types:
export type ViewState =
  | "GeneralInformation"
  | "LocationStatusAmount"
  | "ProductProperties"
  | "Marketplace";

export type FormPageProps = {
  register: UseFormRegister<Product>;
  setViewState: (value: ViewState) => void;
  getValues?: UseFormReturn<Product>["getValues"];
};
