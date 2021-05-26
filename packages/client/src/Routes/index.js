import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const AdminPage = React.lazy(() => import(/* webpackChunkName: "AdminPage" */ 'Pages/Admin'));

const Root = () => (
    <Router>
        <React.Suspense fallback={<div>loading...</div>}>
            <Route path="/" component={AdminPage} />
        </React.Suspense>
    </Router>
);

export default Root;
