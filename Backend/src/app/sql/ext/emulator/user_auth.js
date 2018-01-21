import CRUD from './user_crud'
import Hash from 'bcrypt-nodejs'
import Users from '../../model/emulator/users'
export default class Auth {

  // Login Functions
  static attempt (data) {
    return new Promise ((resolve, reject) => {
      Users.where('username', data.username).fetch({ withRelated : ['rank'], columns : ['id', 'username', 'password', 'rank'] })
        .then (user => {
          if (user) {
            if (Hash.compareSync(data.password, user.toJSON().password)) {
              CRUD.read(user.toJSON().id)
                .then (user => {
                  resolve(user)
                })
                .catch (error => {
                  reject({ errors : error })
                })
            } else {
              reject({ errors : `auth`})
            }
          } else {
            reject({ errors : `auth`})
          }
        })
        .catch (error => {
          reject({ errors : error })
        })
    })
  }

  // Registration Functions
  static hasDuplicates (data, callback) {
    Users.query((qb) => { qb.where('username', data.username); qb.orWhere('mail', data.mail); }).fetch({ columns : ['id'] })
      .then (users => {
        if (users) {
          callback({ errors : 'Username or email is being used!'})
        } else {
          callback(null, data)
        }
      })
  }

  static hasAccounts (data, callback) {
    Users.where('ip_last', data.ip).fetch({ columns : ['id'] })
      .then (users => {
        if (users && users.length > 3) {
          callback({ errors : 'You already registered the maximum number of accounts!' })
        } else {
          callback(null, data)
        }
      })
  }

  // Seperate API Functions
  static hasDuplicate (data, type) {
    return new Promise ((resolve, reject) => {
      Users.where(type, data).fetch({ columns : ['id'] })
        .then (users => {
          if (users) {
            reject({ errors : 'already in use'})
          } else {
            resolve()
          }
        })
    })
  }

}
