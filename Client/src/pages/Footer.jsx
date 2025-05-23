import React from "react";
import logo from "../assets/whitelogo.png";

// Static data for footer links
const SUPERLABS_INFO = [
  { title: "Corporate Information", url: "https://superlabs.co/corporate-information.php" },
  { title: "Careers", url: "https://superlabs.co/careers.php" },
  { title: "Open Roles", url: "https://docs.google.com/spreadsheets/d/1KC25nBveHRoF8tPLXIWsUipdD4RrmvEdkbOP0nJLOOQ/edit?usp=sharing" },
  { title: "Contact", url: "https://superlabs.co/contact-us.php" },
  { title: "CheckList", url: "https://superlabs.co/check-list.php" }
];

const EMPLOYEE_LINKS = [
  { title: "SuperComm", url: "https://comm.superlabs.co/" },
  { title: "SuperMail", url: "https://superlabs.co:2096/" },
  { title: "SuperMeet", url: "https://meet.google.com/uni-zeez-nzi" },
  { title: "SuperGit", url: "https://fork-n-code.superlabs.co/" },
  { title: "Uptime", url: "https://status.superlabs.co/dashboard" }
];

const VENDOR_INFO = [
  { title: "Partner with Us", url: "https://superlabs.co/supplier-connection.php" },
  { title: "Vendor Information", url: "https://superlabs.co/data-strategy.php#" },
  { title: "Vendor Guide", url: "https://superlabs.co/data-strategy.php#" }
];

function Footer() {
  const currentYear = new Date().getFullYear();

  const renderLinks = (links) => (
    <ul className="space-y-2">
      {links.map(({ title, url }) => (
        <li key={title}>
          <a 
            href={url} 
            target="blank" 
            className="cursor-pointer hover:text-red-600"
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <section className="bg-red-600 grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center md:py-5 lg:py-20">
        <div className="flex flex-col py-10 gap-10 justify-center items-center sm:px-5 md:px-20">
          <p className="sm:text-2xl md:text-4xl font-bold text-white text-center">
            What can we help you achieve?
          </p>
          <a
            href="https://superlabs.co/contact-us"
            target="blank"
            className="flex w-48 font-bold items-center justify-center px-4 py-3 text-base leading-6 whitespace-no-wrap bg-red-600 border-2 border-white rounded-full shadow-sm hover:bg-transparent text-white hover:text-black hover:bg-white focus:outline-none"
          >
            Let's Get To Work
          </a>
        </div>
        <div className="flex lg:border-l flex-col py-10 gap-10 justify-center items-center sm:px-5 md:px-20">
          <p className="md:border-t sm:border-t lg:border-t-0 sm:pt-16 lg:pt-0 sm:text-2xl md:text-4xl font-bold text-white text-center">
            Where will your career take you?
          </p>
          <a
            href="https://superlabs.co/careers"
            target="blank"
            className="flex w-48 font-bold items-center justify-center px-4 py-3 text-base leading-6 whitespace-no-wrap bg-red-600 border-2 border-white rounded-full shadow-sm hover:bg-transparent text-white hover:text-black hover:bg-white focus:outline-none"
          >
            Come Find Out Now
          </a>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 bg-black pb-10 lg:py-16 sm:px-5 md:px-40">
        <div className="flex justify-start items-center">
          <img src={logo} alt="logo" className="sm:h-[200px] md:h-[250px]" />
        </div>
        <div className="text-gray-400 grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3 place-content-center place-items-start">
          <div>
            <h3 className="py-3 font-bold text-lg text-white">SuperLabs Info</h3>
            {renderLinks(SUPERLABS_INFO)}
          </div>
          <div>
            <h3 className="py-3 font-bold text-lg text-white">Employees</h3>
            {renderLinks(EMPLOYEE_LINKS)}
          </div>
          <div>
            <h3 className="py-3 font-bold text-lg text-white">Vendor Info</h3>
            {renderLinks(VENDOR_INFO)}
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="flex border-t border-gray-900 sm:mx-5 md:mx-36 py-10">
          <p className="text-gray-400 text-center">
            © 2020 - {currentYear} SuperLabs. Acta Non Verba.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Footer;
