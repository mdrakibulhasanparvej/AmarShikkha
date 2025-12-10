import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className=" rounded-lg overflow-hidden  transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 text-left flex items-center justify-between  transition-colors"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <HiChevronDown
          className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className=" py-2  text-gray-700 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
