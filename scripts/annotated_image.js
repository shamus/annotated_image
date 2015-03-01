function AnnotatedImage() {
  var EVENTS = ['showAnnotations', 'hideAnnotations', 'selectAnnotation'];

  function Controller(scope) {
    this.annotations = scope.configuration.annotations;
    this.handlers = EVENTS.reduce(function(memo, event) {
      memo[event] = [];
      return memo;
    }, {});
  }

  EVENTS.forEach(function(event) {
    var capitalized = event.charAt(0).toUpperCase() + event.slice(1);
    Controller.prototype['on' + capitalized] = function(handler) {
      this.handlers[event].push(handler);
    };
  });

  Controller.prototype.showAnnotations = function() {
    this.handlers.showAnnotations.forEach(function(handler) {
      handler();
    });
  };

  Controller.prototype.hideAnnotations = function() {
    this.handlers.hideAnnotations.forEach(function(handler) {
      handler();
    });
  };

  Controller.prototype.selectAnnotation = function(coordinates) {
    var annotation = this.annotations.filter(function(annotation) {
      var c = annotation.coordinates;
      var insideHorizontally = coordinates.offsetX >= c.topLeft.offsetX && coordinates.offsetX <= c.bottomRight.offsetX;
      var insideVertically = coordinates.offsetY >= c.topLeft.offsetY && coordinates.offsetY <= c.bottomRight.offsetY;

      return insideHorizontally && insideVertically;
    })[0];

    this.handlers.selectAnnotation.forEach(function(handler) {
      handler(annotation);
    });
  };

  return {
    restrict: 'E',
    template: [
      '<annotated-image-controls annotations="configuration.annotations"></annotated-image-controls>',
      '<annotated-image-viewer src="configuration.image" annotations="configuration.annotations"></annotated-image-viewer>',
      '<annotated-image-current></annotated-image-current>'
    ].join('\n'),
    controller: ['$scope', Controller],
    scope: {
      configuration: '='
    }
  };
}
