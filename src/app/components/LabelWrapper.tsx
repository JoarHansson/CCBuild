"use client";

import React from "react";

type LabelWrapperProps = {
  labelText: string;
  children: React.ReactNode;
};

export const LabelWrapper = ({ labelText, children }: LabelWrapperProps) => {
  return (
    <div className="flex flex-col">
      <label>{labelText}</label>
      {children}
    </div>
  );
};

