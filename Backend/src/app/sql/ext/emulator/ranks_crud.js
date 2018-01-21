import Ranks from '../../model/emulator/ranks'
export default class CRUD {

  static retrieve (column, value) {
    return new Promise ((resolve, reject) => {
      Ranks.where(column, value).query('columns', ['id', 'name', 'badge_code', 'staff']).fetchAll({ withRelated : ['members'] })
        .then (ranks => {
          if (ranks) {
            resolve(ranks.toJSON())
          } else {
            resolve(null)
          }
        })
        .catch (errors => {
          reject({ errors : errors })
        })
    })
  }

}
