import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>gfg</Layout>} />
        <Route path="/search" element={<Layout>search</Layout>} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
        </Route>

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
