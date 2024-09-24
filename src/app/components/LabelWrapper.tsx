"use client";

import React from "react";

type LabelWrapperProps = {
  labelText: string;
  children: React.ReactNode;
};

export const LabelWrapper = ({ labelText, children }: LabelWrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="paragraph-bold">{labelText}</label>
      {children}
    </div>
  );
};
