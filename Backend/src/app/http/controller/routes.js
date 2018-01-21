import SSO from './auth/sso'
import Login from './auth/login'
import JWT from '../middleware/jwt'
import Session from './auth/session'
import News from './data/website/news'
import Register from './auth/register'
import Users from './data/emulator/users'
import Staff from './data/emulator/staff'
import Online from './data/emulator/online'
import Website from './data/website/settings'
import Hangouts from './data/website/hangouts'
import Category from './data/website/category'
export default class Routes {

  static load (http, cb) {

    // Guest
    http.post('/api/auth/login', Login.try)
    http.post('/api/auth/register', Register.try)
    http.get('/api/auth/sso', JWT.check, SSO.fetch)

    // Authentication
    http.get('/api/auth/session/logout', JWT.check, Session.delete)
    http.get('/api/auth/session/fetch', JWT.check, Session.get)

    // Check Data
    http.get('/api/data/emulator/users/match/username/:username', Register.matchUsername)
    http.get('/api/data/emulator/users/match/email/:email', Register.matchEmail)

    // Data Routes
    http.get('/api/data/build', Website.build)
    http.get('/api/data/website/settings', Website.get)
    http.get('/api/data/website/news/fetch', News.get)
    http.get('/api/data/website/news/fetch/:id', News.get)
    http.get('/api/data/website/category/fetch', Category.list)
    http.get('/api/data/website/category/fetch/:id', Category.get)
    http.get('/api/data/emulator/users/fetch/:username', Users.get)
    http.get('/api/data/emulator/users/leaderboards', Users.leaderboard)
    http.get('/api/data/emulator/online/fetch', Online.get)
    http.get('/api/data/emulator/staff/fetch', Staff.get)
    http.get('/api/data/website/hangouts/post/delete/:id', JWT.check, Hangouts.delete)
    http.get('/api/data/website/hangouts/comments/delete/:id', JWT.check, Hangouts.delete_comment)
    http.post('/api/data/website/hangouts/comments/create', JWT.check, Hangouts.create_comment)
    http.get('/api/data/website/hangouts/fetch', Hangouts.list)
    http.get('/api/data/website/hangouts/fetch/:id', Hangouts.view)
    http.post('/api/data/website/hangouts/create', JWT.check, Hangouts.create)

    // Return
    cb(null, http)

  }

}
