import * as React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import EventCommentList from './pages/EventCommentList';
import UserPage from './pages/UserPage';
import Admin from './pages/Admin';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PrivateRouter from './private/PrivateRouter'
import ForceRedirect from './private/ForceRedirect'
import AdminRouter from './private/AdminRouter'
import ProfilePage from './pages/ProfilePage';
import Page404 from './pages/Page404';
import NoAccess from './pages/NoAccess';
import store from './redux/store';
import jwt_decode from 'jwt-decode';
import { Logout, setUser } from './redux/actions/authActions';
import { setAuth } from './util/setAuth';
import { useSelector } from 'react-redux';
import EventListPage from './pages/EventList';
// import EventMaker from './pages/EventMaker';
import EventUser from './pages/EventUser';
import EventShow from './pages/EventShow';
import EventComment from './pages/EventComment';
import StatisticalPage from './pages/StatisticalPage'
import EventQrCode from './pages/EventQrCode'

const EventMaker = React.lazy(() => import('./pages/EventMaker'));

// ----------------------------------------------------------------------
if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt)
  store.dispatch(setUser(decode))
  setAuth(window.localStorage.jwt)
  const currentDate = Date.now / 1000
  if (decode.exp > currentDate) {
    store.dispatch(Logout())
  }
}


export default function Router() {
  const auth = useSelector(state => state.auth)
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role
  }
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'EventListPage', element: <EventListPage /> },
        {
          path: 'user', element: <AdminRouter user={user}>
            <UserPage />
          </AdminRouter>
        },
        {
          path: 'profile', element: <PrivateRouter user={user}>
            <ProfilePage />      </PrivateRouter>
        },
        {
          path: 'Admin', element: <AdminRouter user={user}>
            <Admin />
          </AdminRouter>
        },
        {
          path: 'EventMaker', element:
            <React.Suspense fallback={<>...</>}>
              <AdminRouter user={user}><EventMaker /></AdminRouter>
            </React.Suspense>

        },
        {
          path: 'EventUser', element: <PrivateRouter user={user}>
            <EventUser />
          </PrivateRouter>
        },
        {
          path: 'EventShow', element: <PrivateRouter user={user}>
            <EventShow />
          </PrivateRouter>
        },
        {
          path: 'EventComment', element: <PrivateRouter user={user}>
            <EventComment />
          </PrivateRouter>
        },
        {
          path: 'EventCommentList', element: <AdminRouter user={user}>
            <EventCommentList />
          </AdminRouter>
        },
        {
          path: 'StatisticalPage', element: <PrivateRouter user={user}>
            <StatisticalPage />
          </PrivateRouter>
        },
        {
          path: 'EventQrCode', element: <PrivateRouter user={user}>
            <EventQrCode />
          </PrivateRouter>
        },
      ],
    },

    {
      path: 'login',
      element: <ForceRedirect user={user}>
        <LoginPage />
      </ForceRedirect>,
    },
    {
      path: 'signup',
      element: <ForceRedirect user={user}>
        <SignUpPage />
      </ForceRedirect>,
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: 'noaccess', element: <NoAccess /> },
      ],
    },
    {
      path: '/', element: <Navigate to="/dashboard/app" replace />,

    },
  ]);

  return routes;
}