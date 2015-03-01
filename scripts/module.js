var annotatedImage = angular.module('annotated-image', []);
annotatedImage.directive('annotatedImage', AnnotatedImage);
annotatedImage.directive('annotatedImageControls', AnnotatedImage.Controls);
annotatedImage.directive('annotatedImageCurrent', AnnotatedImage.Current);
annotatedImage.directive('annotatedImageViewer', AnnotatedImage.Viewer);
