import HomePage from './views/HomePage.vue'
import EditPage from './views/EditPage.vue'
import CreatePage from './views/CreatePage.vue'
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {path: '/', component: HomePage},
    {path: '/create', component: CreatePage},
    {path: '/edit', name: 'edit', component: EditPage, props: true},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;