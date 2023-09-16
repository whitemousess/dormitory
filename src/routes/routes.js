// routeConfig
import config from '~/config';

// Router change Pages
import Home from '~/pages/Home';
import User from '~/pages/User';

const publicRoutes = [
    { path: config.routes.home, component: Home},
    { path: config.routes.user, component: User}
]; 

const privateRoutes = []; 

export {publicRoutes ,privateRoutes};