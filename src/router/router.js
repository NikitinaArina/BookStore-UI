import Vue from 'vue'
import VueRouter from 'vue-router'
import BookList from "../pages/BookList.vue";
import Login from "../pages/Login.vue";
import Registration from "../pages/Registration.vue";
import Profile from "../pages/Profile.vue";
import UsersList from "../pages/UsersList.vue";
import EditUser from "../pages/EditUser";

Vue.use(VueRouter)

const routes = [
    {path: '/', component: BookList },
    {path: '/login', component: Login },
    {path: '/registration', component: Registration},
    {path: '/profile', component: Profile},
    {path: '/users', component: UsersList},
    {path: '/user/:id', component: EditUser, name: 'edit', props: true}
]

export default new VueRouter({
    mode: 'history',
    routes
})