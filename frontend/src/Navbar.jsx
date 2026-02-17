import React from "react";
import { Zap } from "lucide-react";
import { colors, gradients } from "./colors";

function Navbar() {
  return (
    <nav style={{ background: gradients.primary }} className="text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: colors.primary.light }}
          >
            <Zap className="w-6 h-6" style={{ color: colors.primary.dark }} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold">ObjectDetect AI</h1>
        </div>
        <div className="hidden md:flex gap-8">
          <a
            href="#"
            className="hover:opacity-80 transition-opacity font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:opacity-80 transition-opacity font-medium"
          >
            Detection
          </a>
          <a
            href="#"
            className="hover:opacity-80 transition-opacity font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="hover:opacity-80 transition-opacity font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
