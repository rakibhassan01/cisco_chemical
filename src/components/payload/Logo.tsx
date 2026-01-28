import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <Image
        src="/images/logo.png"
        alt="Cisco Chemical Logo"
        width={200}
        height={40}
        style={{
          maxHeight: "40px",
          width: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default Logo;
