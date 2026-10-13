/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore Vue SFC declarations are not available in this project.
import Index from '@/pages/index.vue'
// @ts-ignore Vue SFC declarations are not available in this project.
import Pets from '@/pages/pets.vue'
// @ts-ignore Vue SFC declarations are not available in this project.
import Consulta from '@/pages/consulta.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/pets',
      component: Pets,
    },
    {
      path: '/consulta',
      component: Consulta,
    }
  ],
})

export default router
