import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./Components/Details";
import MovieInput from "./Components/MovieInput";
import TvDetails from "./Components/TvDetails";
import MovieHomePage from "./Screens/MovieHomePage";

import MovieScreen from "./Screens/MovieScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieScreen />}>
            <Route index element={<MovieHomePage />} />
            <Route path="search" element={<MovieInput />} />
            <Route path="/movie/:id" element={<Details />} />
            <Route path="/tv/:id" element={<TvDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <TodoScreen /> */}
    </>
  );
}

export default App;
