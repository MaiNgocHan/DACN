import { Route, Navigate } from 'react-router-dom';
const layoutRoute = ({ component: Component, currentUser, roles, ...rest }) => (
    <Route
      {...rest}
      element={(props) => {
        if (!currentUser) {
          return <Navigate to={{ pathname: '/signin', state: { from: props.location } }} />;
        }
      }}
    />
);
export default layoutRoute