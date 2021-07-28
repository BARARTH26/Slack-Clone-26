import './App.css';
import {BrowserRouter as Router,Switch,Link,Route} from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Sidebar from  "./components/Sidebar"
import Chat from "./components/Chat";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase/firebase";
import Login from "./components/Login";
import Spin from "react-spinkit";

function App() {

const[user,loading] = useAuthState(auth);

if(loading){
  return (
    <AppLoading>
      <AppLoadingContent>
        <img
					src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
					alt=""
				/>
      <Spin name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </AppLoadingContent>
    </AppLoading>
  )
}
 
return (
    <div className="app">
      {!user ? (
        <Login />
      ): (
        <Router>
        <Header />
        <AppBody>
          <Sidebar />
          <Switch>
            <Route >
              <Chat />
            </Route>
          </Switch>
        </AppBody >
      </Router>
      )}
      
    </div>
  );
}

export default App;


const AppLoading = styled.div`
  
`;
const AppLoadingContent = styled.div`
  height : 100vh;
  text-align: center;
  padding-bottom: 100px;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  >img{
    height:100px;
    padding :20px;
    margin-bottom: 50px;
  }
`;

const AppBody = styled.div`
  display : flex;
  height:100vh;
`;