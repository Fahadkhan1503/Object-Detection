// import React from "react";
// import { Zap, Github, Linkedin, Mail } from "lucide-react";
// import { colors } from "./colors";

// function Footer() {
//   return (
//     <footer
//       style={{ backgroundColor: colors.gray.dark }}
//       className="text-white py-8 md:py-12 mt-12"
//     >
//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <Zap className="w-6 h-6" style={{ color: colors.primary.normal }} />
//               <h3 className="text-xl font-bold">ObjectDetect AI</h3>
//             </div>
//             <p style={{ color: colors.gray.normal }} className="text-sm">
//               Advanced object detection and tracking system powered by YOLO
//               technology.
//             </p>
//           </div>

//           {/* Features */}
//           <div>
//             <h4 className="font-bold mb-4">Features</h4>
//             <ul
//               style={{ color: colors.gray.normal }}
//               className="space-y-2 text-sm"
//             >
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Real-time Detection
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Object Tracking
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Batch Processing
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Video Export
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Resources */}
//           <div>
//             <h4 className="font-bold mb-4">Resources</h4>
//             <ul
//               style={{ color: colors.gray.normal }}
//               className="space-y-2 text-sm"
//             >
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Documentation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Tutorials
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   API Reference
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Support
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Connect */}
//           <div>
//             <h4 className="font-bold mb-4">Connect</h4>
//             <div className="flex gap-4">
//               <a
//                 href="#"
//                 className="p-2 rounded-lg hover:opacity-80 transition-opacity"
//                 style={{ backgroundColor: colors.primary.normal }}
//               >
//                 <Github className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="p-2 rounded-lg hover:opacity-80 transition-opacity"
//                 style={{ backgroundColor: colors.secondary.normal }}
//               >
//                 <Linkedin className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="p-2 rounded-lg hover:opacity-80 transition-opacity"
//                 style={{ backgroundColor: colors.warning.normal }}
//               >
//                 <Mail className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div
//           style={{ borderTopColor: colors.gray.normal }}
//           className="border-t py-6"
//         >
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p style={{ color: colors.gray.normal }} className="text-sm">
//               © 2026 ObjectDetect AI. All rights reserved.
//             </p>
//             <div className="flex gap-6 mt-4 md:mt-0">
//               <a
//                 href="#"
//                 style={{ color: colors.gray.normal }}
//                 className="text-sm hover:text-white transition-colors"
//               >
//                 Privacy Policy
//               </a>
//               <a
//                 href="#"
//                 style={{ color: colors.gray.normal }}
//                 className="text-sm hover:text-white transition-colors"
//               >
//                 Terms of Service
//               </a>
//               <a
//                 href="#"
//                 style={{ color: colors.gray.normal }}
//                 className="text-sm hover:text-white transition-colors"
//               >
//                 Contact
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from "react";
import { Zap } from "lucide-react";
import { colors } from "./colors";

function Footer() {
  return (
    <footer
      style={{ backgroundColor: colors.gray.dark }}
      className="text-white py-4 mt-12 px-6"
    >
      <div className="flex justify-center items-center text-sm">
        
        {/* Left Side */}
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5" style={{ color: colors.primary.normal }} />
          <span>
            ObjectDetect AI — Advanced object detection and tracking system powered by YOLO technology.
          </span>
        </div>

        {/* Right Side */}
        <div>
          Created by Muhammad Fahad
        </div>

      </div>
    </footer>
  );
}

export default Footer;

