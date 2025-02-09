import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-white/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Paytm Wallet</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Features</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Security</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Offers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">About Us</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Careers</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Blog</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Developer APIs</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Partner with Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-blue-400">Grievance Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div><svg
    height="50px"
    width="50px"
    version="1.1"
    id="_x36_"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <g>
      <g>
        <path
          style={{ fill: '#3A9BC8' }}
          d="M225.656,256.052L14.016,485.451l-6.442,7.052c-4.005-5.919-6.704-12.972-7.313-20.806
                C0.087,470.305,0,468.91,0,467.518V44.499c0-9.488,2.873-18.02,7.574-24.987L225.656,256.052z"
        />
        <path
          style={{ fill: '#9BCD83' }}
          d="M320.811,152.8l-95.155,103.253L7.574,19.512C19.936,1.405,45.183-6.342,66.6,6.02L320.811,152.8z"
        />
        <path
          style={{ fill: '#EEB84C' }}
          d="M455.056,257.27c-0.348,14.453-7.748,28.904-22.113,37.174l-112.132,64.771l-95.155-103.163
                L320.811,152.8l70.518,40.745l41.614,24.026C448.178,226.366,455.579,241.861,455.056,257.27z"
        />
        <path
          style={{ fill: '#B43F70' }}
          d="M7.591,492.492c12.368,18.116,37.599,25.838,58.976,13.496L320.775,359.22l-95.156-103.209
                L7.591,492.492z"
        />
      </g>
      <path
        style={{ opacity: 0.2, fill: '#FFFFFF' }}
        d="M454.067,246.447c-2.453-11.518-9.483-22.156-21.124-28.876l-41.614-24.026
            L320.811,152.8L66.6,6.02C45.183-6.342,19.936,1.405,7.574,19.512C2.873,26.479,0,35.011,0,44.499v243.72
            c36.681,3.114,74.226,4.746,112.451,4.746c47.984,0,94.85-2.644,140.318-7.505l-27.027-29.314l27.038,29.314
            C323.988,277.849,391.567,264.55,454.067,246.447z"
      />
    </g>
         </svg></div>
            <span className="text-lg font-semibold">Paytm</span>
          </div>
          <p className="text-gray-300 text-sm">© 2025 One97 Communications Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;