import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TherapistsPage from "../pages/TherapistsPage";
import TherapistPublicProfile from "../pages/TherapistPublicProfile";
import BookingPage from "../pages/BookingPage";

import ServiceIndividualPage from "../pages/ServiceIndividualPage";
import ServiceCouplePage from "../pages/ServiceCouplePage";
import ServiceChildPage from "../pages/ServiceChildPage";
import SpecialtiesPage from "../pages/SpecialtiesPage";
import CorporatePage from "../pages/CorporatePage";

import BlogListPage from "../pages/BlogListPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import TherapistDashboardPage from "../pages/TherapistDashboardPage";
import TherapistSchedulePage from "../pages/TherapistSchedulePage";
import TherapistClientsPage from "../pages/TherapistClientsPage";
import TherapistNotesPage from "../pages/TherapistNotesPage";
import TherapistAnalyticsPage from "../pages/TherapistAnalyticsPage";

import ClientPortalPage from "../pages/ClientPortalPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Marketing & Service Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/therapists" element={<TherapistsPage />} />
      <Route path="/therapist/:type/:therapistId" element={<BookingPage />} />

      <Route path="/services/individual-therapy" element={<ServiceIndividualPage />} />
      <Route path="/services/couple-therapy" element={<ServiceCouplePage />} />
      <Route path="/services/children-therapy" element={<ServiceChildPage />} />

      <Route path="/specialties" element={<SpecialtiesPage />} />
      <Route path="/employee-experience-program" element={<CorporatePage />} />

      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/Article/:slug" element={<BlogDetailPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact-us" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<AboutPage />} />
      <Route path="/terms-and-conditions" element={<AboutPage />} />
      <Route path="/refund-policy" element={<AboutPage />} />

      {/* Auth & Dashboards */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      <Route path="/therapist/dashboard" element={<TherapistDashboardPage />} />
      <Route path="/therapist/schedule" element={<TherapistSchedulePage />} />
      <Route path="/therapist/clients" element={<TherapistClientsPage />} />
      <Route path="/therapist/notes" element={<TherapistNotesPage />} />
      <Route path="/therapist/analytics" element={<TherapistAnalyticsPage />} />

      <Route path="/client/portal" element={<ClientPortalPage />} />

      {/* Branded Therapist Profile Slug Routes */}
      <Route path="/therapist/:slug" element={<TherapistPublicProfile />} />
      <Route path="/:slug" element={<TherapistPublicProfile />} />
    </Routes>
  );
};

export default AppRoutes;
