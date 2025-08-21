import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavigationHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const focusable = Array.from(
      document.querySelectorAll<HTMLElement>("[tabindex]")
    );

    let currentIndex = 0;
    focusable[currentIndex]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 39: // ArrowRight
        case 40: // ArrowDown
          currentIndex = (currentIndex + 1) % focusable.length;
          focusable[currentIndex]?.focus();
          e.preventDefault();
          break;

        case 37: // ArrowLeft
        case 38: // ArrowUp
          currentIndex =
            (currentIndex - 1 + focusable.length) % focusable.length;
          focusable[currentIndex]?.focus();
          e.preventDefault();
          break;

        case 13: // Enter
          (document.activeElement as HTMLElement)?.click?.();
          e.preventDefault();
          break;

        case 10009: // Back key (Tizen remote)
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            console.log("Exit app triggered");
          }
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [location, navigate]);

  return null; // This component only handles navigation
}

/*

// This component listens for route changes
function RouteChangeListener() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🚀 Remote navigation + Back key support
  useEffect(() => {
    const focusable = Array.from(
      document.querySelectorAll<HTMLElement>("[tabindex]")
    );

    let currentIndex = 0;
    focusable[currentIndex]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 39: // ArrowRight
        case 40: // ArrowDown
          currentIndex = (currentIndex + 1) % focusable.length;
          focusable[currentIndex]?.focus();
          e.preventDefault();
          break;

        case 37: // ArrowLeft
        case 38: // ArrowUp
          currentIndex =
            (currentIndex - 1 + focusable.length) % focusable.length;
          focusable[currentIndex]?.focus();
          e.preventDefault();
          break;

        case 13: // Enter
          (document.activeElement as HTMLElement)?.click?.();
          e.preventDefault();
          break;

        case 10009: // Back key (Tizen)
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            console.log("Exit app triggered");
          }
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [location]);

  return null; // it doesn't render anything
}
*/
