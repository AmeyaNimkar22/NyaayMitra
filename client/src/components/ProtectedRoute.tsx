import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Wrap any page that should require a logged-in user, e.g.:
 *
 *   <Route path="/home">
 *     <ProtectedRoute>
 *       <Home />
 *     </ProtectedRoute>
 *   </Route>
 *
 * If there's no mock user in AuthContext, this redirects to /login
 * instead of rendering the page.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    // Render nothing while the redirect above kicks in.
    return null;
  }

  return <>{children}</>;
}
