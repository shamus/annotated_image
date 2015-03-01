describe 'AnnotatedImage', ->
  TEMPLATE = '<annotated-image configuration="configuration"></annotated-image>'
  beforeEach module 'annotated-image'

  beforeEach ->
    @scope = createScope (scope) ->
      scope.configuration = {
        image: '/base/spec/fixtures/green_moon.jpg',
        annotations: [
          {
            author: 'me',
            text: 'Yay!',
            coordinates: {
              topLeft: { offsetX: 15, offsetY: 170 },
              bottomRight: { offsetX: 45, offsetY: 200 }
            }
          }
        ]
      }

    @el = prepareTemplate TEMPLATE, @scope

  describe 'by default', ->
    it 'renders the viewer', ->
      expect(@el.find('annotated-image-viewer')).toBeVisible()

    it 'renders the controls', ->
      expect(@el.find('annotated-image-controls')).toContainText('1 Annotations')
      expect(@el.find('annotated-image-controls [data-role="show annotations"]')).toBeVisible()
      expect(@el.find('annotated-image-controls [data-role="hide annotations"]')).not.toBeVisible()

    it 'hides the current annotation', ->
      expect(@el.find('annotated-image-current .current-annotation')).not.toBeVisible()

  describe 'with annotations shown', ->
    beforeEach ->
      @el.find('[data-role="show annotations"]').click()

    it 'updates the controls', ->
      expect(@el.find('annotated-image-controls')).toContainText('1 Annotations')
      expect(@el.find('annotated-image-controls [data-role="show annotations"]')).not.toBeVisible()
      expect(@el.find('annotated-image-controls [data-role="hide annotations"]')).toBeVisible()

    it 'displays the annotation text when its clicked', ->
      bounds = @el.find('canvas')[0].getBoundingClientRect()

      event = new MouseEvent('click', {
        bubbles: true
        cancelable: true
        view: window
        screenX: 25
        screenY: 175
        clientX: 25 + bounds.left
        clientY: 175 + bounds.top
        altKey: false
        ctrlKey: false
        shiftKey: false
        metaKey: false
      })

      @el.find('canvas')[0].dispatchEvent(event)
      expect(@el.find('annotated-image-current')).toContainText('Yay')
