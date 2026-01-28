import React from "react";
import Image from "next/image";

const Icon: React.FC = () => {
  return (
    <div className="icon">
      <Image
        src="/images/logo.png"
        alt="Cisco Chemical Icon"
        width={30}
        height={30}
        style={{
          maxHeight: "30px",
          width: "auto",
        }}
      />
    </div>
  );
};

export default Icon;
