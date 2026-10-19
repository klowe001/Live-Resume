import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AnimationProvider } from "@/context/animation-context";
import { ConsentProvider } from "@/context/consent-context";
import { ConsentBanner } from "@/components/consent-banner";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Blog from "@/pages/blog";
import PostPage from "@/pages/post";

/** Drops a trailing slash (static hosts add one for folders) and starts each new page at the top. */
function useRouteHousekeeping() {
  const [location, navigate] = useLocation();
  useEffect(() => {
    if (location.length > 1 && location.endsWith("/")) {
      navigate(location.replace(/\/+$/, "") + window.location.hash, { replace: true });
      return;
    }
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location, navigate]);
}

function Router() {
  useRouteHousekeeping();
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={PostPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConsentProvider>
        <AnimationProvider>
          <Toaster />
          <Router />
          <ConsentBanner />
        </AnimationProvider>
      </ConsentProvider>
    </QueryClientProvider>
  );
}

export default App;
