import { useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Recipe from "./components/Recipe"
import NewRecipe from "./components/NewRecipe";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import User from "./pages/User";
import "./App.css";
import MenuAppBar from "./components/MenuAppBar";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import UpdateUser from "./pages/UpdateUser";


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
              <Route path="/posts/:post_id" element={<Recipe />} />
              <Route path="/posts/new" element={<NewRecipe />} />
              <Route path="/*" element={<Home />} />
              <Route path="/users/:user_id" element={<User />} />
              <Route path="/users/:user_id/update" element={<UpdateUser />} />
            </Routes>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;