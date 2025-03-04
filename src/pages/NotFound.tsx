
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "../lib/utils";

const NotFound = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 px-4">
      <div 
        className={cn(
          "relative w-full max-w-md mx-auto backdrop-blur-xl bg-black/20 border border-gray-800 rounded-xl p-8 shadow-xl transition-all duration-700 ease-out transform",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="absolute -top-3 left-4">
          <span className="inline-block py-1 px-3 text-xs font-medium bg-gray-800 text-gray-300 rounded-full">
            Page Error
          </span>
        </div>
        
        <div className="text-center">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 mb-2">404</h1>
          
          <div className={cn(
            "w-16 h-1 bg-gradient-to-r from-gray-500 to-transparent mx-auto mb-6 transition-all duration-1000",
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-0"
          )} />
          
          <p className="text-xl text-gray-300 mb-6">
            The page you're looking for doesn't exist
          </p>
          
          <a 
            href="/companyadmin" 
            className="group inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-100 transition-all duration-300 ease-in-out"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Return to Home</span>
          </a>
        </div>
      </div>
      
      <div className={cn(
        "mt-8 text-sm text-gray-500 transition-all duration-1000 delay-300",
        mounted ? "opacity-100" : "opacity-0"
      )}>
      </div>
    </div>
  );
};

export default NotFound;
