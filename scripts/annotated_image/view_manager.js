AnnotatedImage.ViewManager = function ViewManager(canvas, src) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.image = new Image();
  this.shouldHideAnnotations = true;

  this.image.onload = function() {
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.update();
  }.bind(this);

  this.image.src = src;
};

AnnotatedImage.ViewManager.prototype.update = function() {
  this.context.drawImage(this.image, 0, 0);
  if (this.shouldHideAnnotations || !this.annotations) {
    return;
  }

  this.annotations.forEach(function(annotation) {
    this.context.strokeStyle = '#FFF';
    if (annotation === this.selectedAnnotation) {
      this.context.strokeStyle = '#F00';
    }
    this.drawRect(annotation.coordinates);
  }.bind(this));
};

AnnotatedImage.ViewManager.prototype.showAnnotations = function(annotations) {
  this.annotations = annotations;
  this.shouldHideAnnotations = false;
  this.update();
};

AnnotatedImage.ViewManager.prototype.hideAnnotations = function() {
  this.shouldHideAnnotations = true;
  this.update();
};

AnnotatedImage.ViewManager.prototype.selectAnnotation = function(selectedAnnotation) {
  this.selectedAnnotation = selectedAnnotation;
  this.update();
};

AnnotatedImage.ViewManager.prototype.drawRect = function(coordinates) {
  var width = coordinates.bottomRight.offsetX - coordinates.topLeft.offsetX;
  var height = coordinates.bottomRight.offsetY - coordinates.topLeft.offsetY;

  this.context.strokeRect(coordinates.topLeft.offsetX, coordinates.topLeft.offsetY, width, height);
};
