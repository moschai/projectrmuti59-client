import React from 'react';
import { Button,Divider } from 'antd';
import {withRouter} from 'react-router-dom'
import BaseLayout from '../components/layout/BaseLayout';
import { appPath } from '../router/path';

const Home = ({history}) => {
    return (
      <div className=" d-flex align-center min-h-100">
          <div className="text-center w-100">
          <Button size="large" onClick={()=>history.push(appPath.student)}>
              นักศึกษา
          </Button>
        {/* <Divider type="horizontal" /> */}
          <Button size="large" onClick={()=>history.push(appPath.authority.root)}>
              อาจารย์
          </Button>
          </div>
      </div>
    );
}

export default withRouter(Home);
