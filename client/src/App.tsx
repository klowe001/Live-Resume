import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AnimationProvider } from "@/context/animation-context";
import { ConsentProvider } from "@/context/consent-context";
import { ConsentBanner } from "@/components/consent-banner";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
