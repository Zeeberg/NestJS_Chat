import "./styles/App.scss";

import { BrowserRouter } from "react-router-dom";
import Header from "./components/UI/Header/Header";
import AppRouter from "./components/AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
