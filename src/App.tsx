import { useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/auth/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import User from "./pages/users/User";
import "./App.css";
import MenuAppBar from "./components/MenuAppBar";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import UpdateUser from "./pages/users/UpdateUser";


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
              
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/posts/:post_id" element={<Post />} />
              <Route path="/posts/new" element={<NewPost />} />
              <Route path="/posts/:post_id/update" element={<UpdatePost />} />

              {/* Comments? <Route path="/comments/new" element={<NewComment />} />
              <Route path="/comments/:comment_id/update" element={<UpdateComment />} /> */}

              <Route path="/users/:user_id" element={<User />} />
              <Route path="/users/:user_id/update" element={<UpdateUser />} />

              <Route path="/*" element={<Home />} />
            </Routes>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;