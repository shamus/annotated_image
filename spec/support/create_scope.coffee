window.createScope = (configure) ->
  scope = undefined
  inject ($rootScope) ->
    scope = $rootScope.$new()
    configure(scope) if configure

  scope
