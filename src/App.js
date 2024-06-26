import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import ImageGrid from "./@/components/ui/gridContainer";
import MyNavigationMenu from "./@/components/ui/navBar";
import Login from "./@/components/ui/login";
import Signup from "./@/components/ui/signup";
import UploadForm from "./@/components/ui/createImage";

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavigationMenu />
        <Routes>
          <Route path="/" element={<ImageGrid />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
