import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./pages/dashboard/Dashboard";


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
          <Dashboard />
      </Router>
    </QueryClientProvider>
  );
}
