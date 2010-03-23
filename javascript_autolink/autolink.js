String.prototype.autolink = function () {
  return this.toString().replace(/((https?:\/\/|www\.)[^'"\s]*)/gi,'<a href="$1">$1</a>');
};
