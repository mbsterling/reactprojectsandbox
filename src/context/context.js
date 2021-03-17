import React from 'react';

const AuthContext = React.createContext({
    authenticated: false,
    isAdmin: false,
    login: () => {}
});

export default AuthContext;