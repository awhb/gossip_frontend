import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Recipe from "./components/Recipe"
import NewRecipe from "./components/NewRecipe";
import Login from "./pages/Login";
import "./App.css";
import AppBar from "./components/AppBar";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
      primary: blue,
      secondary: orange,
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <header className="App-header">
            <AppBar />
          </header>
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:id" element={<Recipe />} />
              <Route path="/posts/new" element={<NewRecipe />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </main>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;