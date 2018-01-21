import Login from './session/guest/login'
import Logout from './session/user/logout'
import About from './session/user/home/about'
import Register from './session/guest/register'
import Client from './session/user/home/client'
import Profile from './session/user/home/profile'
import Staff from './session/user/community/staff'
import Online from './session/user/community/online'
import Article from './session/user/community/Article'
import HangoutsHome from './session/user/hangouts/home'
import HangoutsPost from './session/user/hangouts/post'
import HangoutsCreate from './session/user/hangouts/create'
import Categories from './session/user/community/Categories'
import Leaderboards from './session/user/community/Leaderboards'
let app = angular.module('heroic.controllers', [])

// Guest
app.controller('Login', Login)
app.controller('Register', Register)
app.controller('Logout', Logout)
// User Home
app.controller('Client', Client)
app.controller('About', About)
app.controller('Profile', Profile)
// User Community
app.controller('Staff', Staff) 
app.controller('Online', Online)
app.controller('Article', Article)
app.controller('Categories', Categories)
app.controller('Leaderboards', Leaderboards)
// User Hangouts
app.controller('HangoutsHome', HangoutsHome)
app.controller('HangoutsPost', HangoutsPost)
app.controller('HangoutsCreate', HangoutsCreate)

export default app
