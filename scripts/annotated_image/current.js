AnnotatedImage.Current = function Current() {
  function link(scope, el, attrs, controller) {
    controller.onShowAnnotations(function() {
      scope.viewing = true;
    });

    controller.onSelectAnnotation(function(annotation) {
      scope.annotation = annotation;
    });

    controller.onHideAnnotations(function() {
      scope.viewing = false;
    });
  }

  return {
    restrict: 'E',
    require: '^annotatedImage',
    link: link,
    template: [
      '<div class="annotation-content" ng-if="viewing" ng-class="{\'show-current\': annotation, \'hide-current\': !annotation}">',
        '<div ng-if="annotation">',
          '<span>"{{ annotation.text }}"</span> - <span>{{ annotation.author }}</span>',
        '</div>',
      '</div>'
    ].join('\n'),
    scope: { }
  };
};
