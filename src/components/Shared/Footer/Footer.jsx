import { quickLinks, socialLinks } from "./footerLinks";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Grameen Shikkha Info */}
        <div>
          <h3 className="text-white text-xl font-bold mb-2">Grameen Shikkha</h3>
          <p className="text-sm italic mb-4">Grameen Education</p>
          <p className="text-sm">Head Office</p>
          <p className="text-sm">Telecom Bhaban (Level - 4)</p>
          <p className="text-sm">Zoo Road, Mirpur-1, Dhaka-1216</p>
          <p className="text-sm mt-2">Bangladesh</p>
        </div>

        {/* Programs */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Programs</h4>
          <ul className="space-y-1 text-sm">
            <li>Scholarship Management Program</li>
            <li>Non-formal Education for Slum Children</li>
            <li>Vocational Training Program</li>
            <li>Early Childhood Development (ECD) Program</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-white transition">
                  {link}
                </a>
              </li>
            ))}
            <li>
              <a href="#" className="hover:text-white transition">
                Donors and Partners
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                SMP Donation Form
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Sponsor Feedback
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Find Us</h4>
          <div className="flex gap-4 mb-4">
            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF className="text-white" />
            </a>
            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-blue-400 transition"
            >
              <FaTwitter className="text-white" />
            </a>
            <a
              href="#"
              className="bg-gray-700 p-2 rounded-full hover:bg-blue-800 transition"
            >
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
          <p className="text-sm">Phone: +88 02 44 80 20 81</p>
          <p className="text-sm">
            Email:{" "}
            <a href="mailto:gc@grameen.org" className="underline">
              gc@grameen.org
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        ©2017 Grameen Shikkha — Designed & Developed by Md Rakibul Hasan Parvej
      </div>
    </footer>
  );
}
