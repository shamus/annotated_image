AnnotatedImage.Viewer = function Viewer($rootScope) {
  function link(scope, el, attrs, controller) {
    var canvas = el.find('canvas');
    var viewManager = new AnnotatedImage.ViewManager(canvas[0], scope.src);

    canvas.bind('click', function(event) {
      if (viewManager.shouldHideAnnotations) {
        return;
      }
      controller.selectAnnotation(event);
      $rootScope.$digest();
    });

    controller.onShowAnnotations(function() {
      viewManager.showAnnotations(scope.annotations);
    });

    controller.onHideAnnotations(function() {
      viewManager.hideAnnotations();
    });

    controller.onSelectAnnotation(function(annotation) {
      viewManager.selectAnnotation(annotation);
    });
  }

  return {
    restrict: 'E',
    require: '^annotatedImage',
    template: '<canvas></canvas>',
    link: link,
    scope: {
      src: '=',
      annotations: '='
    }
  };
};
