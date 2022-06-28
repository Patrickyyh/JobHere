
import styled from 'styled-components';
// import the react router 
import {BrowserRouter ,Routes ,Route , Link} from 'react-router-dom';

import {Register,Error,Landing, ProtectedRoute ,Stream} from './pages'

// Dashboard nested structure
import{ AddJobs,AllJobs, Profile,
        SharedLayout, Stats,Lobby} from './pages/dashboard'






function App() {
  return (
  <BrowserRouter>
    <Routes>
          <Route path = "/" element = {
              <ProtectedRoute>
                <SharedLayout/>
              </ProtectedRoute>
               
          }>
            {/* After login, the page will be navigated to the stats  */}
              <Route index element  = {<Stats />}/>
              <Route path = "all-jobs" element  = {<AllJobs />}/>
              <Route path = "add-job" element  = {<AddJobs />}/>
              <Route path = "profile" element  = {<Profile />}/>
              <Route path = 'lobby'   element  = {<Lobby />}/> 
              
          </Route>

          <Route path = "/register" element  = { <Register/>} />
          <Route path = "/landing"  element  = { <Landing/>} />
          <Route path = "/stream/:roomId"   element  = {<Stream /> } /> 
          <Route path = "*"         element  = { <Error/>} />
    </Routes>
   
  </BrowserRouter>
  );
}

export default App;
