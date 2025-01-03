import React from "react";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat with Us",
    description: "Our friendly team is here to help.",
    details: "learninggate.scu@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit Us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call Us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-blue-900 p-4 lg:p-6 text-gray-200">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div
            className="flex flex-col gap-[2px] p-3 text-sm"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} className="text-yellow-100" />
              <h1 className="text-lg font-semibold text-yellow-100">
                {ele?.heading}
              </h1>
            </div>
            <p className="font-medium text-gray-300">{ele?.description}</p>
            <p className="font-semibold text-white">{ele?.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
