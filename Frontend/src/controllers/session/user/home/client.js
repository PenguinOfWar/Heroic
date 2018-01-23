class Client
{
    constructor($rootScope, $scope, $http, $state)
    {
        'ngInject'
        this.$http              = $http
        this.$scope             = $scope
        this.$state             = $state
        this.$onInit            = this.fetch()
        this.$scope.fly_home    = function () {
          return $state.go('me.home')
        }
    }

    fetch ()
    {
      this.$http.get('/api/auth/sso')
        .then (sso => {
          var flashvars =
          {
            "connection.info.host"                    : "35.226.240.137",
            "connection.info.port"                    : "3000",
            "url.prefix"                              : "/me",
            "site.url"                                : "/me",
            "client.reload.url"                       : "/me",
            "client.fatal.error.url"                  : "/client",
            "client.connection.failed.url"            : "/me",
            "external.variables.txt"                  : "http://swfs.xhabbo.fun/gamedata/variables.txt",
            "external.texts.txt"                      : "http://swfs.xhabbo.fun/gamedata/texts.txt",
            "productdata.load.url"                    : "http://swfs.xhabbo.fun/gamedata/productdata.txt",
            "furnidata.load.url"                      : "http://swfs.xhabbo.fun/gamedata/furnidata.xml",
            "external.figurepartlist.txt"             : "http://swfs.xhabbo.fun/gamedata/figuredata.xml",
            "external.override.texts.txt"             : "http://swfs.xhabbo.fun/gamedata/override/texts.txt",
            "external.override.variables.txt"         : "http://swfs.xhabbo.fun/gamedata/override/variables.txt",
            "external.figurepartlist.txt"             : "http://swfs.xhabbo.fun/gamedata/figuredata.xml",
            "client.starting.revolving"               : "Already!?",
            "use.sso.ticket"                          : "1",
            "sso.ticket"                              : sso.data.auth_ticket,
            "processlog.enabled"                      : "0",
            "flash.client.url"                        : "http://swfs.xhabbo.fun/other/game/",
            "flash.client.origin"                     : "popup",
            "client.allow.cross.domain"               : "1",
            "client.notify.cross.domain"              : "0",
          };
          var params =
          {
            "base" : "http://swfs.xhabbo.fun/other/game/",
            "allowScriptAccess" : "always",
            "menu" : "false"
          };
          swfobject.embedSWF("http://swfs.xhabbo.fun/gamedata/arcturus.swf", "client", "100%", "100%", "10.0.0", "", flashvars, params, null);
        })
    }

}

export default Client
