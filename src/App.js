import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Filter from "./Page/Filter";


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Filter />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
