
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./components/dashboard/DashboardPage";
import AppointmentsPage from "./components/appointments/AppointmentsPage";
import ServicesPage from "./components/services/ServicesPage";
import EmployeesPage from "./components/employees/EmployeesPage";
import CustomersPage from "./components/customers/CustomersPage";
import InventoryPage from "./components/inventory/InventoryPage";
import SalesPage from "./components/sales/SalesPage";
import SettingsPage from "./components/settings/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
