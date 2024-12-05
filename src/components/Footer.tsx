import React from 'react';
import { Leaf, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-emerald-950 to-black text-white mt-auto w-full border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3 sm:mb-4">
              <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
              <span className="text-lg sm:text-xl font-bold">Asé Juices</span>
            </div>
            <p className="text-sm sm:text-base text-emerald-300 max-w-xs mx-auto sm:mx-0">
              Nourishing bodies and minds with nature's finest cold-pressed juices and detox teas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="/products" 
                  className="text-sm sm:text-base text-emerald-300 hover:text-emerald-200 transition inline-block py-1"
                >
                  Products
                </a>
              </li>
              <li>
                <a 
                  href="/benefits" 
                  className="text-sm sm:text-base text-emerald-300 hover:text-emerald-200 transition inline-block py-1"
                >
                  Benefits
                </a>
              </li>
              <li>
                <a 
                  href="/process" 
                  className="text-sm sm:text-base text-emerald-300 hover:text-emerald-200 transition inline-block py-1"
                >
                  Our Process
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm sm:text-base text-emerald-300">
              <li className="py-1">
                <a 
                  href="mailto:hello@asejuices.com" 
                  className="hover:text-emerald-200 transition"
                >
                  hello@asejuices.com
                </a>
              </li>
              <li className="py-1">
                <a 
                  href="tel:310-365-1617" 
                  className="hover:text-emerald-200 transition"
                >
                  310-365-1617
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a 
                href="https://www.instagram.com/ase_juices/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 hover:text-emerald-300 transition p-2 -m-2"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-900/30 mt-8 pt-8 text-center">
          <p className="text-sm sm:text-base text-emerald-300">
            &copy; {new Date().getFullYear()} Asé Juices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
