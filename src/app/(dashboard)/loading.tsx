import { Loader } from "lucide-react";
import React from "react";

const Dashboardloading = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default Dashboardloading;
