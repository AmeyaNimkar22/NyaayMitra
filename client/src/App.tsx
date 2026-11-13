import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Advisor from "./pages/Advisor";
import Learn from "./pages/Learn";
import Games from "./pages/Games";
import ScanLearn from "./pages/ScanLearn";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route path="/home">
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Route>
          <Route path="/advisor">
            <ProtectedRoute>
              <Advisor />
            </ProtectedRoute>
          </Route>
          <Route path="/learn">
            <ProtectedRoute>
              <Learn />
            </ProtectedRoute>
          </Route>
          <Route path="/games">
            <ProtectedRoute>
              <Games />
            </ProtectedRoute>
          </Route>
          <Route path="/scan-learn">
            <ProtectedRoute>
              <ScanLearn />
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </Route>
          <Route path="/settings">
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          </Route>

          <Route component={NotFound} />
        </Switch>
      </AuthProvider>
    </ErrorBoundary>
  );
}
