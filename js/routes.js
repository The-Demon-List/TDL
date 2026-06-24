import List from './pages/List.js';
import Leaderboard from './pages/Leaderboard.js';
import Roulette from './pages/Roulette.js';
import History from './pages/History.js';

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', component: List },
        { path: '/leaderboard', component: Leaderboard },
        { path: '/roulette', component: Roulette },
        { path: '/history', component: History },
    ],
});
