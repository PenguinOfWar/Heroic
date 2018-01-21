import Users from './users'
import Database from  '../../server'
export default class Ranks extends Database.Model {

    get tableName () {
        return 'ranks'
    }

    members () {
      return this.hasMany(Users, 'rank').query('columns', ['id', 'username', 'look', 'rank'])
    }

}
