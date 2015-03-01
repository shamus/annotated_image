window.prepareTemplate = (template, scope) ->
  el = compileTemplate template, scope
  $('body').append(el)

  afterEach -> el.remove()
  el
