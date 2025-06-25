import React from "react";
import SkillsAndInterestBadge from "./SkillsAndInterestBadge";
import { UserDetailsInterface } from "@/lib/types";
import { utils } from "@/lib/utils";

const BasicInfo = ({ user }: { user: UserDetailsInterface | null }) => {
  return (
    <>
      <div className="px-4 py-5 separator">
        <h2 className="text-2xl font-general-semibold">Basic Details</h2>
      </div>

      <div className="m-4 pb-4 separator">
        <h3 className="sub-text mb-2">Education</h3>
        <ul className="list-disc ps-6 flex flex-col gap-2">
          {user?.education?.map((education, index) => (
            <li key={index}>
              <p className="sub-text">
                {education?.institute},{" "}
                {education?.attendingCurrently ? (
                  <span className="text-green-500">Attending</span>
                ) : (
                  <span>{utils.getYear(education?.to)}</span>
                )}
              </p>
              <p className="font-general-medium">
                {education?.levelOfeducation}, {education?.studied}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="m-4 pb-4 separator">
        <h3 className="sub-text mb-2">Work Experience</h3>
        <ul className="list-disc ps-6 flex flex-col gap-2">
          {user?.workExperience?.map((workExperience, index) => (
            <li key={index}>
              <p className="sub-text">
                {utils.getYear(workExperience?.from)} -{" "}
                {workExperience?.currentlyWorking
                  ? "Present"
                  : utils.getYear(workExperience?.to)}
              </p>
              <p className="font-general-medium">{workExperience?.jobTitle}</p>
              <p className="sub-text">{workExperience?.companyName}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="m-4 pb-4 separator">
        <h3 className="sub-text mb-2">Skills</h3>

        <div className="flex items-center gap-2">
          {user?.skills?.map((skill, index) => (
            <SkillsAndInterestBadge key={index}>{skill}</SkillsAndInterestBadge>
          ))}
        </div>
      </div>

      <div className="m-4 pb-4">
        <h3 className="sub-text mb-2">Interest</h3>

        <div className="flex items-center gap-2">
          {user?.interests?.map((interest, index) => (
            <SkillsAndInterestBadge key={index}>
              {interest}
            </SkillsAndInterestBadge>
          ))}
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
