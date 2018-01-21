import Database from  '../../server'
export default class  Rooms extends Database.Model {

    get tableName () {
        return 'rooms_data'
    }
}
