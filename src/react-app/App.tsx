import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@getmocha/users-service/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import Landing from "@/react-app/pages/Landing";
import Eras from "@/react-app/pages/Eras";
import Lyrics from "@/react-app/pages/Lyrics";
import FanTheoryRoom from "@/react-app/pages/FanTheoryRoom";
// import Quiz from "@/react-app/pages/Quiz";
import EnhancedQuiz from "@/react-app/pages/EnhancedQuiz";
import Social from "@/react-app/pages/Social";
import AuthCallback from "@/react-app/pages/AuthCallback";

export default function App() {
  const location = useLocation();

  // Animate on route change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".page",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <AuthProvider>
        <div className="page">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/eras" element={<Eras />} />
            <Route path="/theory" element={<FanTheoryRoom />} />
            <Route path="/lyrics" element={<Lyrics />} />
            <Route path="/quiz" element={<EnhancedQuiz />} />
            <Route path="/social" element={<Social />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </div>
    </AuthProvider>
  );
}
