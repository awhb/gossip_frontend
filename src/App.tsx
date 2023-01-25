import { useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Recipe from "./components/Recipe"
import NewRecipe from "./components/NewRecipe";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";
import MenuAppBar from "./components/MenuAppBar";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';


const theme = createTheme({
  palette: {
      primary: blue,
      secondary: orange,
  },
});

function App() {
  const memoTheme = useMemo(() => theme, []);

  return (
    <ThemeProvider theme={memoTheme}>
      <div className="App">
        <Router>
          <header className="App-header">
            <MenuAppBar />
          </header>
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:id" element={<Recipe />} />
              <Route path="/posts/new" element={<NewRecipe />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;