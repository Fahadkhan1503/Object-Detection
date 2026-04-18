import React from "react";
import { Zap } from "lucide-react";
import { colors } from "./colors";

function Footer() {
  return (
    <footer
      style={{ backgroundColor: colors.gray.dark }}
      className="text-white py-6 mt-12 px-4 sm:px-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-sm">
        
        {/* Left Side */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <Zap className="w-5 h-5 shrink-0" style={{ color: colors.primary.normal }} />
          <span>
            ObjectDetect AI — Advanced object detection and tracking system powered by YOLO technology.
          </span>
        </div>

        {/* Right Side */}
        <div className="text-center md:text-right whitespace-nowrap">
          Created by Muhammad Fahad
        </div>

      </div>
    </footer>
  );
}

export default Footer;

