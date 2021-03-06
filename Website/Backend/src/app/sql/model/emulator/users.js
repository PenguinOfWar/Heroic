import Rooms from './rooms'
import Ranks from './ranks'
import Friends from './friends'
import Database from  '../../server'
export default class Users extends Database.Model {

    get tableName () {
        return 'users'
    }

    rank () {
      return this.belongsTo(Ranks, 'rank').query('columns', ['id', 'rank_name', 'badge_code', 'staff'])
    }

    friends () {
      return this.hasMany(Friends, 'user_one_id').query('columns', ['id', 'user_one_id', 'user_two_id'])
    }

    rooms () {
      return this.hasMany(Rooms, 'owner_id').query('columns', ['id', 'name', 'owner_id'])
    }

}
