export default class Profile
{
    constructor(AppConstants, $state, $scope, $http)
    {
        'ngInject'
        this.AppConstants       = AppConstants
        this.$state             = $state
        this.$scope             = $scope
        this.$http              = $http
        this.$onInit            = () => { this.fetch() }
    }

    fetch ()
    {
      this.$http({ method : 'GET', url : this.AppConstants.api + '/data/emulator/users/fetch/' + this.$state.params.username })
        .then (result => {
          if (result.data && result.data.username !== undefined) {
            this.$scope.user = result.data
          } else {
            this.$scope.user = undefined
          }
        })
        .catch (error => {
          this.$scope.user = undefined
        })
    }

}
