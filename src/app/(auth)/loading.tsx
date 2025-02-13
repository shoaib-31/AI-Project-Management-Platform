"use client";
import { Loader } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <Loader className="size-6 animate-spin" />
    </div>
  );
};

export default LoadingPage;
