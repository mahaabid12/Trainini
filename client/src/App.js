import{ BrowserRouter as Router, Switch,Route} from 'react-router-dom'


function App() {
  return (
   <Router>
   <Switch>
    
   <Route exact path="/login" component={loginScreen}/>
   <Route exact path="/register" component={RegisterScreen}/>
   <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
   <Route exact path="/passwordreset/:resetToken" component={ForgotPasswordScreen}/>

   </Switch>

   </Router>
 

  
  );
}

export default App;
