AnnotatedImage.Controls = function Controls() {
  function link(scope, el, attrs, controller) {
    scope.showAnnotations = function() {
      controller.showAnnotations();
    };

    scope.hideAnnotations = function() {
      controller.hideAnnotations();
    };

    controller.onShowAnnotations(function() {
      scope.viewing = true;
    });

    controller.onHideAnnotations(function() {
      scope.viewing = false;
    });
  }

  return {
    restrict: 'E',
    require: '^annotatedImage',
    template: [
      '<div>',
        '<span class="control" data-role="show annotations" ng-click="showAnnotations()" ng-hide="viewing">Show</span>',
        '<span class="control" data-role="hide annotations" ng-click="hideAnnotations()" ng-show="viewing">Hide</span>',
        '<span ng-click="showAnnotations()">{{ annotations.length }} Annotations</span>',
      '</div>'
    ].join('\n'),
    link: link,
    scope: {
      annotations: '='
    }
  };
};
