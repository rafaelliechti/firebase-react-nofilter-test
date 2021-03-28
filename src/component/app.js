import React from 'react';
import SignUp from './signUp';
import {Container} from 'react-bootstrap';
import {AuthProvider} from '../firebase/auth';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './signIn';
import PrivateRoute from './privateRoute';
import ForgotPassword from './forgotPassword';
import UpdateDashboard from './updateDashboard';

function App() {
    return (
        <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
            <div className='w-100' style={{maxWidth: '400px'}}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path='/' component={Dashboard}/>
                            <PrivateRoute path='/update-dashboard' component={UpdateDashboard}/>
                            <Route path='/signup' component={SignUp}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/forgot-password' component={ForgotPassword}/>
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
    );
}

export default App;
