import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home-client";
import JobDetail from "./pages/JobDetail";
import JobApplicationForm from "./pages/JobApplicationForm";
import SuccessJob from "./pages/SuccessJob";
import Error404 from "./pages/Error404";
import JobExpiryPage from "./pages/JobExpiryPage";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/job/:id/:jobtitle" element={<JobDetail />} />
        <Route path="/job/:id/:jobtitle/apply" element={<JobApplicationForm />} />
        <Route path="/success" element={<SuccessJob />} />
        <Route path="/expired" element={<JobExpiryPage />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
