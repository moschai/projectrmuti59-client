import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import moment from "moment";
import "moment/locale/th";
import "./styles/App.css";
import "./styles/index.css";
import { appPath } from "./router/path";
import Home from "./page/Home";
import Student from "./page/Student";
import Authority from "./page/authority/Authority";
import Notfound from "./page/Notfound";
import DocumentOnePage from "./page/DocumentOnePage";
import DocumentTwoPage from "./page/DocumentTwoPage";
import DocumentThreePage from "./page/DocumentThreePage";
import DocumentFourPage from "./page/DocumentFourPage";
import DocumentFivePage from "./page/DocumentFivePage";
import DocumentSixPage from "./page/DocumentSixPage";
import DocumentSevenPage from "./page/DocumentSevenPage";
import DocumentEightPage from "./page/DocumentEightPage";
import DocumentNinePage from "./page/DocumentNinePage";
import DocumentTenPage from "./page/DocumentTenPage";
import DocumentElevenPage from "./page/DocumentElevenPage";
import DocumentTwelvePage from "./page/DocumentTwelvePage";
import DocumentThirteenPage from "./page/DocumentThirteenPage";
import DocumentFourteenPage from "./page/DocumentFourteenPage";
import DocumentFifteenPage from "./page/DocumentFifteenPage";
import DocumentSixteenPage from "./page/DocumentSixteenPage";
import DocumentSeventeenPage from "./page/DocumentSeventeenPage";
import DocumentEighteenPage from "./page/DocumentEighteenPage";
import AuthorityLoginPage from "./page/authority/Login";
import PrivateAuthorityRoute from "./router/PrivateAuthorityRoute";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "./services/AuthService";
import { Spin } from "antd";
import { authorityProfileAction } from "./redux/actions/AuthAction";
import DocumentForAuthority from "./page/authority/DocumentForAuthority";
import ApproveDocument from "./page/authority/ApproveDocument";
import DocAuthTableSixSubject from "./page/authority/DocAuthTableSixSubject";
import ApproveDocSubjectSixPage from "./page/authority/ApproveDocsubjectSix";
import DocAuthTableSevenSubject from "./page/authority/DocAuthTableSevenSubject";
import ApproveDocSubjectSevenPage from "./page/authority/ApproveDocsubjectSeven";
import ApproveDocSubjectEightPage from "./page/authority/ApproveDocsubjectEight";
import DocAuthTableEightSubject from "./page/authority/DocAuthTableEightSubject";
import ApproveDocSubjectNinePage from "./page/authority/ApproveDocsubjectNine";
import DocAuthTableNineSubject from "./page/authority/DocAuthTableNineSubject";
import ApproveDocSubjectTenPage from "./page/authority/ApproveDocsubjectTen";
import DocAuthTableTenSubject from "./page/authority/DocAuthTableTenSubject";
import DocAuthTableSeventeenSubject from "./page/authority/DocAuthTableSeventeenSubject";
import ApproveDocSubjectSeventeenPage from "./page/authority/ApproveDocsubjectSeventeen";
import DocumentTagStudentPage from "./page/DocumentTagStudent";
import PrivateAdminRoute from "./router/PrivateAdminRoute";
import Admin from "./page/admin/Admin";
import { AdminProfileAction } from "./redux/actions/AuthAdminAction";
import AdminLoginPage from "./page/admin/Login";
import AddRegisterAuthorityPage from "./page/admin/AddRegisterAuthorityPage";
import AddSubjectPage from "./page/admin/AddSubjectPage";
import DeleteDocumentPage from "./page/admin/DeleteDocumentPage";

moment.locale("th");
function App() {
  const { isAuthentication } = useSelector((state) => state.authState);
  const adminState = useSelector((state) => state.authAdminState);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isAuthentication && AuthService.getToken()) {
      fetchProfile();
    } else {
      if (!adminState.isAuthentication && AuthService.adminGetToken()) {
        adminFetchProfile();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    await dispatch(authorityProfileAction());
    setLoading(false);
  };

  const adminFetchProfile = async () => {
    setLoading(true);
    await dispatch(AdminProfileAction());
    setLoading(false);
  };
  if (isLoading) {
    return (
      <div className="text-center">
        <Spin tip="loading..."></Spin>
      </div>
    );
  }
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to={appPath.home} />
        </Route>
        <Route path={appPath.home} component={Home} />
        <Route path={appPath.student} component={Student} />
        <Route
          path={`${appPath.authority.root}${appPath.login}`}
          component={AuthorityLoginPage}
        />
        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.document}`}
          component={DocumentForAuthority}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approve}/:document`}
          component={ApproveDocument}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjectsix}/:tableId`}
          component={ApproveDocSubjectSixPage}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjectsix}`}
          component={DocAuthTableSixSubject}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjectseven}/:tableId`}
          component={ApproveDocSubjectSevenPage}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjectseven}`}
          component={DocAuthTableSevenSubject}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjecteight}/:tableId`}
          component={ApproveDocSubjectEightPage}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjecteight}`}
          component={DocAuthTableEightSubject}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjectnine}/:tableId`}
          component={ApproveDocSubjectNinePage}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjectnine}`}
          component={DocAuthTableNineSubject}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjectten}/:tableId`}
          component={ApproveDocSubjectTenPage}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}${appPath.authority.approvesubjectten}`}
          component={DocAuthTableTenSubject}
        />

        <PrivateAuthorityRoute
          path={`${appPath.authority.root}`}
          component={Authority}
        />

        {/* admin */}

        <Route
          path={`${appPath.admin.root}${appPath.admin.login}`}
          component={AdminLoginPage}
        />

        <PrivateAdminRoute
          path={`${appPath.admin.root}${appPath.admin.addauthority}`}
          component={AddRegisterAuthorityPage}
        />

        <PrivateAdminRoute
          path={`${appPath.admin.root}${appPath.admin.addsubject}`}
          component={AddSubjectPage}
        />

        <PrivateAdminRoute
          path={`${appPath.admin.root}${appPath.admin.documentdelete}`}
          component={DeleteDocumentPage}
        />

        <PrivateAdminRoute path={appPath.admin.root} component={Admin} />

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
        <Route
          path={appPath.documentThirteen}
          component={DocumentThirteenPage}
        />
        <Route
          path={appPath.documentFourteen}
          component={DocumentFourteenPage}
        />
        <Route path={appPath.documentFifteen} component={DocumentFifteenPage} />
        <Route path={appPath.documentSixteen} component={DocumentSixteenPage} />
        <Route
          path={appPath.documentSeventeen}
          component={DocumentSeventeenPage}
        />
        <Route
          path={appPath.documentEighteen}
          component={DocumentEighteenPage}
        />
        <Route path={appPath.documentTag} component={DocumentTagStudentPage} />

        <Route path="*" component={Notfound} />
      </Switch>
    </div>
  );
}

export default App;
