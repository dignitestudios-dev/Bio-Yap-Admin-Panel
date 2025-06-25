import React from "react";

const SkillsAndInterestBadge: React.FC<{ children: string }> = ({
  children,
}) => {
  return <div className="text-[#181818CC] bg-[#F3F3F3] rounded-full py-1 px-3 w-fit text-sm">{children}</div>;
};

export default SkillsAndInterestBadge;
