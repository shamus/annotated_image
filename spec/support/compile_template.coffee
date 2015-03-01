window.compileTemplate = (template, scope) ->
  compiled = undefined

  inject ($compile) ->
    compiled = $compile(template)(scope)
    scope.$digest()

  $(compiled)
