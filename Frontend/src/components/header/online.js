class OnlineController
{
    constructor($scope, $http, $interval)
    {
      'ngInject'
      this.$scope           = $scope
      this.$http            = $http
      this.$interval        = $interval
      $scope.online         = 0
      this.$onInit          = this.fetch()
    }

    fetch () {
      this.run()
      this.$interval(() => this.run(), 10000)
    }

    run () {
      this.$http({ type : 'GET', url : '/api/data/emulator/online/fetch'})
        .then (online => {
          if (online.data != undefined) {
            this.$scope.online = online.data.length
          } else {
            this.$scope.online = 0
          }
        })
    } 

}

let OnlineComponent = {
    controller: OnlineController,
    templateUrl: 'views/common/components/header/online.html'
}

export default OnlineComponent
