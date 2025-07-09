"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

type Badge = {
  _id: string;
  name: string;
  description: string;
  icon: string; // icon as a URL string
};

const BadgeManagement = () => {
  const badges: Badge[] = [
    {
      _id: "67f00f843ed8875457686f84",
      name: "Problem Solver",
      description:
        "Given to members who help others tackle professional challenges. No problem is too big when you're around.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785859753-problem%20solver.svg",
    },
    {
      _id: "67f00f353ed8875457686f7b",
      name: "Mentorship Maven",
      description:
        "Recognizes members who mentor others and provide guidance. Empowering others to reach their full potential.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785779445-mentorship%20maven.svg",
    },
    {
      _id: "67f00f9f3ed8875457686f87",
      name: "Industry Influencer",
      description:
        "For members with a high engagement rate on posts or content. Your voice is shaping the conversation in biopharma.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785887163-industry%20influencer.svg",
    },
    {
      _id: "67f00fce3ed8875457686f8d",
      name: "Trailblazer",
      description:
        "Awarded to members who lead the charge on new initiatives. Pioneering new paths in biopharma.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785934254-trialblazer.svg",
    },
    {
      _id: "67f00f033ed8875457686f78",
      name: "Knowledge Dropper",
      description:
        "Given to members who consistently share valuable industry insights or news. Your expertise lights the way for others.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785730294-knowledge%20Dropper.svg",
    },
    {
      _id: "67f00fe03ed8875457686f90",
      name: "Event Organizer",
      description:
        "For members who host meetups, webinars, or other events. Bringing the biopharma community closer together.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785951978-event%20organizer.svg",
    },
    {
      _id: "67f00f583ed8875457686f7e",
      name: "Innovation Advocate",
      description:
        "For members who share forward-thinking ideas or solutions. Your ideas inspire us all to think differently.",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785815071-innovation%20advocate.svg",
    },
    {
      _id: "67f010043ed8875457686f93",
      name: "Scientific Sage",
      description:
        "For sharing technical or scientific expertise. Your knowledge deepens our understanding.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785987000-scientific%20sage.svg",
    },
    {
      _id: "67f010813ed8875457686f9c",
      name: "Super Supporter",
      description:
        "For regularly encouraging or uplifting other members. Your positivity is contagious.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743786112746-super%20supporter.svg",
    },
    {
      _id: "67f00fb93ed8875457686f8a",
      name: "Team Player",
      description:
        "Recognizes members who collaborate in group discussions or projects. Together, we achieve more.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785913263-Team%20player.svg",
    },
    {
      _id: "67f010683ed8875457686f99",
      name: "Engagement Expert",
      description:
        "For consistently participating in discussions and polls. Your voice keeps the conversation alive.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743786087074-engagement%20expert.svg",
    },
    {
      _id: "67f0109b3ed8875457686f9f",
      name: "Networking Ninja",
      description:
        "Awarded to members who attend virtual or in-person BioYap events. Turning handshakes into partnerships.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743786138892-networking%20ninja.svg",
    },
    {
      _id: "67f00f6c3ed8875457686f81",
      name: "Rising Star",
      description:
        "Awarded to early-career professionals who are actively building their network. The future of biopharma looks bright with you in it.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743785835449-rising%20star.svg",
    },
    {
      _id: "67f010263ed8875457686f96",
      name: "Career Builder",
      description:
        "Awarded to members who help others with career advice or referrals. Helping others climb the ladder of success.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1743786020085-career%20builder.svg",
    },
    {
      _id: "685b0d93861ed2a1ca3bbeb1",
      name: "Founding Member Badge",
      description:
        "Awarded to early adopters who joined during the platform’s inception. Your support laid the foundation for our community’s growth and success.\n",
      icon: "https://bioyapp.s3.us-east-2.amazonaws.com/1750797663338-founding_member_badge.svg",
    },
  ];

  const [searchValue, setSearchValue] = useState<string>("");

  const filteredBadges = badges.filter(
    (badge) =>
      badge.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="px-4 flex items-center justify-between">
        <h2 className="section-heading">Badges Management</h2>

        <div className="flex items-center gap-4">
          <div className="bg-white rounded-lg w-[250px] h-[50px] flex items-center gap-2 px-4">
            <Search />

            <input
              type="text"
              placeholder="Search"
              className="outline-none flex-1 h-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {filteredBadges.map((badge, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl flex flex-col gap-3 items-center justify-center"
          >
            <Image
              src={`/badges/${badge._id}.svg`}
              alt={badge.icon}
              width={77}
              height={77}
              priority
              unoptimized
            />
            <h3 className="text-center text-lg font-general-semibold">
              {badge.name}
            </h3>
            <p className="text-center text-sm text-desc">{badge.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BadgeManagement;
