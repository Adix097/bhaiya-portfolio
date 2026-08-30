import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Work from "./pages/Work";
import Collections from "./pages/Collections";
import BrandIdentity from "./pages/BrandIdentity";
import CollectionDetail from "./pages/CollectionDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from "./components/AdminRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCollections from "./pages/admin/AdminCollections";
import AdminCollectionEditor from "./pages/admin/AdminCollectionEditor";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectEditor from "./pages/admin/AdminProjectEditor";
import BrandProjectDetail from "./pages/BrandProjectDetail";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route path="/work" element={<Navigate to="/work/collections" replace />} />

        <Route
          path="/work/brand"
          element={
            <>
              <Navbar />
              <Work />
              <Footer />
            </>
          }
        />

        <Route
          path="/work/collections"
          element={
            <>
              <Navbar />
              <Work />
              <Footer />
            </>
          }
        />

        <Route
          path="/work/brand/:slug"
          element={
            <>
              <Navbar />
              <BrandProjectDetail />
              <Footer />
            </>
          }
        />

        <Route
          path="/work/collections/:slug"
          element={
            <>
              <Navbar />
              <CollectionDetail />
              <Footer />
            </>
          }
        />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/collections"
          element={
            <AdminRoute>
              <AdminCollections />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/collections/new"
          element={
            <AdminRoute>
              <AdminCollectionEditor />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/collections/:slug/edit"
          element={
            <AdminRoute>
              <AdminCollectionEditor />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <AdminRoute>
              <AdminProjects />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/projects/new"
          element={
            <AdminRoute>
              <AdminProjectEditor />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/projects/:slug/edit"
          element={
            <AdminRoute>
              <AdminProjectEditor />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
