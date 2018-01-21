import Hash from 'bcrypt-nodejs'
import Moment from 'moment'
import User from '../../model/emulator/users'
export default class CRUD {

  static create (data, callback) {
    if (callback) {
      const user = {
        username          : data.username,
        password          : Hash.hashSync(data.password),
        mail              : data.mail,
        account_created   : Moment(Date.now()).unix(),
        ip_reg            : data.ip,
        ip_last           : data.ip
      }
      new User(user).save()
        .then (user => {
          callback(null, data)
        })
        .catch (error => {
          callback({ errors : error })
        })
    } else {
      return new Promise ((resolve, reject) => {
        new User(data).save()
          .then (user => {
            user.fetch({ columns : ['id', 'username', 'rank', 'look']})
              .then (user => {
                resolve(user.toJSON())
              })
              .catch (error => {
                reject({ errors : error })
              })
          })
          .catch (error => {
            reject({ errors : error })
          })
      })
    }
  }

  static read (id) {
    return new Promise ((resolve, reject) => {
      User.where('id', id).fetch({ columns : ['id', 'username', 'rank', 'look'], withRelated : ['rank'] })
        .then (user => {
          if (user) {
            resolve(user.toJSON())
          } else {
            reject({ errors : 404})
          }
        })
        .catch (error => {
          reject({ errors : error })
        })
    })
  }

  static update (data) {
    return new Promise ((resolve, reject) => {
      new User(data).save()
        .then (user => {
          resolve(user.toJSON())
        })
        .catch (error => {
          reject({ errors : error })
        })
    })
  }

  static delete (id) {
    return new Promise ((resolve, reject) => {
      User.where('id', id).fetch()
        .then (user => {
          if (user) {
            user.destroy()
            resolve()
          } else {
            reject(4040)
          }
        })
        .catch (error => {
          reject({ errors : error })
        })
    })
  }

  // Additional Query Types
  static retrieve (column, value, type) {
    return new Promise ((resolve, reject) => {
      if (!type) {
        User.where(column, value).query('columns', ['username', 'look', 'rank']).fetchAll({ withRelated : ['rank'] })
          .then (users => {
            if (users) {
              resolve(users.toJSON())
            } else {
              resolve(null)
            }
          })
          .catch (error => {
            reject({ errors : error })
          })
      } else {
        User.where(column, value).query('columns', ['id', 'username', 'look', 'rank']).fetch({ withRelated : ['rank', 'friends', 'friends.user', 'rooms'] })
          .then (user => {
            if (user) {
              resolve(user.toJSON())
            } else {
              resolve(null)
            }
          })
          .catch (error => {
            reject({ errors : error })
          })
      }
    })
  }

  static retrieveTop (column, limit) {
    return new Promise ((resolve, reject) => {
      User.where('rank', '<', 3).query('orderBy', column, 'DESC').query('limit', limit).query('columns', ['id', 'username', 'look', 'rank', column]).fetchAll()
        .then (users => {
          resolve(users.toJSON())
        })
        .catch (error => {
          reject({ error : error })
        })
    })
  }

}
