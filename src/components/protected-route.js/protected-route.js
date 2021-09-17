import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ children, ...props }) {
  const isAuthorized = useSelector(state => Boolean(state.user.token));
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
