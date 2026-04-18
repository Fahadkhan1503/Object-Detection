import React from "react";
import { colors, gradients } from "./colors";
import { Zap } from "lucide-react";
function Navbar() {
  return (
    <nav
      style={{ background: gradients.primary, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      className="text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="p-2 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
             <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-base md:text-lg font-bold leading-tight text-white">
              ObjectDetect AI
            </p>
            <p className="text-xs tracking-widest text-white" style={{ opacity: 0.6, marginTop: "-1px" }}>
              Vision System
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Online */}
          <div
            className="flex items-center gap-1.5 md:gap-2 rounded-full font-medium tracking-wide transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              padding: "6px 12px",
              fontSize: "11px",
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#6eea7f",
                boxShadow: "0 0 5px #6eea7f",
                display: "inline-block",
                animation: "nbpulse 2s infinite",
                flexShrink: 0,
              }}
            />
            <span className="hidden sm:inline">Online</span>
          </div>

          {/* YOLOv8n */}
          <div
            className="flex items-center gap-1.5 md:gap-2 rounded-full font-medium tracking-wide transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              padding: "6px 12px",
              fontSize: "11px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <rect x="3" y="3" width="8" height="8" rx="2" fill="white" opacity="0.9"/>
              <rect x="13" y="3" width="8" height="8" rx="2" fill="white" opacity="0.55"/>
              <rect x="3" y="13" width="8" height="8" rx="2" fill="white" opacity="0.55"/>
              <rect x="13" y="13" width="8" height="8" rx="2" fill="white" opacity="0.9"/>
            </svg>
            YOLOv8n
          </div>

        </div>
      </div>

      <style>{`@keyframes nbpulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </nav>
  );
}

export default Navbar;

// import React from "react";
// import { Zap } from "lucide-react";
// import { colors, gradients } from "./colors";
// function Navbar() {
//   return (
//     <nav style={{ background: gradients.primary }} className="text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div
//             className="p-2 rounded-lg"
//             style={{ backgroundColor: colors.primary.light }}
//           >
//             <Zap className="w-6 h-6" style={{ color: colors.primary.dark }} />
//           </div>
//           <h1 className="text-xl md:text-2xl font-bold">ObjectDetect AI</h1>
//         </div>
//         <div className="hidden md:flex gap-8">
//           <a
//             href="#"
//             className="hover:opacity-80 transition-opacity font-medium"
//           >
//             Home
//           </a>
//           <a
//             href="#"
//             className="hover:opacity-80 transition-opacity font-medium"
//           >
//             Detection
//           </a>
//           <a
//             href="#"
//             className="hover:opacity-80 transition-opacity font-medium"
//           >
//             About
//           </a>
//           <a
//             href="#"
//             className="hover:opacity-80 transition-opacity font-medium"
//           >
//             Contact
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
