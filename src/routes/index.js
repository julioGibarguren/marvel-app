import { Router } from '@vaadin/router';
import '../views/char-list';
import '../views/char-detail';

const routes = [
    {
        path: '/',
        component: 'char-list',  
    },
    {
        path: '/detail:id',
        component: 'char-detail',
        action: async () => {
          await import('../views/char-detail');
        },
      },
]

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);