import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, ThemeProvider } from '@material-ui/core';
import LoginSignUpPage from './Login'

function Nav() {
    return (
    <Router>
        <div>
            <AppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Typography variant="h4" element={Link} to="/" style={{ fontWeight: "bold", textDecoration: 'none', color:"#FFBF00"}}>
                Aggie Reuse
                </Typography>
                <Button element={Link} href="/" color="inherit">
                Home
                </Button>
                <Button element={Link} href="/register" color="inherit">
                Login
                </Button>
            </Toolbar>
            </AppBar>

            <Routes>
            <Route exact path="/" />
            <Route path="/register" element={<LoginSignUpPage />} />
            </Routes>
        </div>
    </Router>
    );
}

export default Nav