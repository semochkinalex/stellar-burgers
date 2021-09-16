import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children, ...props }) {
  return (
    <Route
      {...props}
      render={({ location }) =>
        true ? (
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
