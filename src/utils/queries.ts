"use server";
import prisma from "@/utils/prisma";
import { Product } from "./types";

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const getFirstSubCat = async () => {
  const firstSubCategories = await prisma.firstSubCategory.findMany();
  return firstSubCategories;
};

export const getSecondSubCat = async () => {
  const secondSubCategories = await prisma.secondSubCategory.findMany();
  return secondSubCategories;
};

export const getProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      ProductVariant: true,
    },
  });
  return products;
};

export const postProduct = async (formData: Product) => {
  console.log(formData);

  await prisma.product.create({
    data: {
      category: formData.category as string,
      firstSubCategory: formData.firstSubCategory as string,
      secondSubCategory: formData.secondSubCategory as string,
      name: formData.name as string,
      manufacturer: formData.manufacturer as string | null,
      productNumber: formData.productNumber as string | null,
      yearOfMake: formData.yearOfMake as number | null,
      yearOfPurchase: formData.yearOfPurchase as number | null,
      aestheticCondition: formData.aestheticCondition as number | null,
      functionalCondition: formData.functionalCondition as number | null,
      imageUrls: formData.imageUrls as string[],
      internalId: formData.internalId as string | null,
      description: formData.description as string | null,
      hinge: formData.hinge as string | null,
      noiseReduction: formData.noiseReduction as number | null,
      securityGrade: formData.securityGrade as string | null,
      fireGrade: formData.fireGrade as string | null,
      glassModel: formData.glassModel as string | null,
      glassType: formData.glassType as string | null,
      glassThickness: formData.glassThickness as number | null,
      moduleMeasurements: formData.moduleMeasurements as string | null,
      climate: formData.climate as string | null,
      color: formData.color as string | null,
      frameThickness: formData.frameThickness as number | null,
      material: formData.material as string | null,
      finish: formData.finish as string | null,
      unitOfMeasurement: formData.unitOfMeasurement as string | null,
      width: formData.width as number | null,
      length: formData.length as number | null,
      height: formData.height as number | null,
      depth: formData.depth as number | null,
      diameter: formData.diameter as number | null,
      thickness: formData.thickness as number | null,
      unitOfWeight: formData.unitOfWeight as string | null,
      weight: formData.weight as number | null,
      GTIN: formData.GTIN as string | null,
      eNR: formData.eNR as string | null,
      RSK: formData.RSK as string | null,
      Bk04: formData.Bk04 as string | null,
      BSAB: formData.BSAB as string | null,
      fileUrls: formData.fileUrls as string[],
      originalPrice: formData.originalPrice as number | null,
      externalPrice: formData.externalPrice as number | null,
      internalPrice: formData.internalPrice as number | null,
      buyerCanSetPrice: formData.buyerCanSetPrice as boolean | null,
      canBePickedUp: formData.canBePickedUp as boolean | null,
      adress: formData.adress as string | null,
      postalCode: formData.postalCode as string | null,
      city: formData.city as string | null,
      canBeSentByFreight: formData.canBeSentByFreight as boolean | null,
      comment: formData.comment as string | null,
      contactPerson: formData.contactPerson as string | null,
      projectId: formData.projectId as number | null,
      ProductVariant: {
        create: formData.ProductVariant?.map((variant: any) => ({
          amount: variant.amount as number | null,
          status: variant.status as string | null,
          marketPlace: variant.marketPlace as string | null,
          dateAvailable: variant.dateAvailable as Date | null,
          earliestDeliveryDate: variant.earliestDeliveryDate as Date | null,
          demountability: variant.demountability as string | null,
          demountabilityComment: variant.demountabilityComment as string | null,
          accessability: variant.accessability as string | null,
          accessabilityComment: variant.accessabilityComment as string | null,
          location1: variant.location1 as string | null,
          location2: variant.location2 as string | null,
          location3: variant.location3 as string | null,
          location4: variant.location4 as string | null,
          decisionDesignation1: variant.decisionDesignation1 as string | null,
          decisionDesignation2: variant.decisionDesignation2 as string | null,
          decisionDesignation3: variant.decisionDesignation3 as string | null,
          decisionDesignation4: variant.decisionDesignation4 as string | null,
          qrCodeUrl: variant.qrCodeUrl as string | null,
        })),
      },
    },
  });
};
