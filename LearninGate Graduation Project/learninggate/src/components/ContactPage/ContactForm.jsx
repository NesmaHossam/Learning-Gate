import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-gray-700 text-gray-300 rounded-xl p-7 lg:p-14 flex flex-col gap-3 bg-blue-900">
      <h1 className="text-4xl leading-10 font-semibold text-yellow-100">
        Got an Idea? We&apos;ve got the skills. Let&apos;s team up!!
      </h1>
      <p className="text-gray-400">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
