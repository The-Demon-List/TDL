import List from './pages/List.js';
import Leaderboard from './pages/Leaderboard.js';
import Roulette from './pages/Roulette.js';
import History from './pages/History.js';

export default {
    // ... other configurations if there are any
    routes: [
        { path: '/', component: List },
        { path: '/leaderboard', component: Leaderboard },
        { path: '/roulette', component: Roulette },
        { path: '/history', component: History }, // <--- Just add this line right here!
    ],
};
