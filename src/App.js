import React from 'react';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';

import './styles/App.css';
import { appPath } from './router/path';
import Home from './page/Home';
import Student from './page/Student';
import Authority from './page/authority/Authority';
import Notfound from './page/Notfound';
import DocumentOnePage from './page/DocumentOnePage';
import DocumentTwoPage from './page/DocumentTwoPage';
import DocumentThreePage from './page/DocumentThreePage';
import DocumentFourPage from './page/DocumentFourPage';
import DocumentFivePage from './page/DocumentFivePage';
import DocumentSixPage from './page/DocumentSixPage';
import DocumentSevenPage from './page/DocumentSevenPage';
import DocumentEightPage from './page/DocumentEightPage';
import DocumentNinePage from './page/DocumentNinePage';
import DocumentTenPage from './page/DocumentTenPage';
import DocumentElevenPage from './page/DocumentElevenPage';
import DocumentTwelvePage from './page/DocumentTwelvePage';
import DocumentThirteenPage from './page/DocumentThirteenPage';
import DocumentFourteenPage from './page/DocumentFourteenPage';
import DocumentFifteenPage from './page/DocumentFifteenPage';
import DocumentSixteenPage from './page/DocumentSixteenPage';
import DocumentSeventeenPage from './page/DocumentSeventeenPage';
import DocumentEighteenPage from './page/DocumentEighteenPage';


function App() {
  return (
    <div >
     <Switch>
       <Route exact path="/">
          <Redirect to={appPath.home} />
       </Route>
       <Route path={appPath.home} component={Home} />
       <Route path={appPath.student} component={Student} />
       <Route path={appPath.authority.root} component={Authority} />
      <Route path={appPath.documentOne} component={DocumentOnePage} />
      <Route path={appPath.documentTwo} component={DocumentTwoPage} />
      <Route path={appPath.documentThree} component={DocumentThreePage} />
      <Route path={appPath.documentFour} component={DocumentFourPage} />
      <Route path={appPath.documentFive} component={DocumentFivePage} />
      <Route path={appPath.documentSix} component={DocumentSixPage} />
      <Route path={appPath.documentSeven} component={DocumentSevenPage} />
      <Route path={appPath.documentEight} component={DocumentEightPage} />
      <Route path={appPath.documentNine} component={DocumentNinePage} />
      <Route path={appPath.documentTen} component={DocumentTenPage} />
      <Route path={appPath.documentEleven} component={DocumentElevenPage} />
      <Route path={appPath.documentTwelve} component={DocumentTwelvePage} />
      <Route path={appPath.documentThirteen} component={DocumentThirteenPage} />
      <Route path={appPath.documentFourteen} component={DocumentFourteenPage} />
      <Route path={appPath.documentFifteen} component={DocumentFifteenPage} />
      <Route path={appPath.documentSixteen} component={DocumentSixteenPage} />
      <Route path={appPath.documentSeventeen} component={DocumentSeventeenPage} />
      <Route path={appPath.documentEighteen} component={DocumentEighteenPage} />
     
       <Route path="*" component={Notfound} />
     </Switch>
    </div>
  );
}

export default App;
