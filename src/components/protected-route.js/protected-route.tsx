import React from 'react';
import { useSelector } from '../../services/hooks';
import { Redirect, Route } from 'react-router-dom';

interface IProtectedRoute {
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, ...props }) => {
  const isAuthorized = useSelector(state => Boolean(state.user.token));
    return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
              // Передадим в пропс to не строку, а объект.
              to={{
                  // Маршрут, на который произойдёт переадресация
                  pathname: '/login',
                  state: { from: location }
              }}
          />
        )
      }
    />
  );
}
