import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TicTacToe from '../views/TicTacToe.vue';
import Battleship from '../components/Battleship.vue';
import Message from '../views/Message.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tic-tac-toe',
      name: 'tic-tac-toe',
      component: TicTacToe
    },
    {
      path: '/battleship',
      name: 'battleship',
      component: Battleship
    },
    {
      path: '/message', 
      name: 'message',
      component: Message
    }
  ]
})

export default router
