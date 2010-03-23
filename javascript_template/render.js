// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
// adapted from: http://ejohn.org/blog/javascript-micro-templating/
// modified by Zhang Jinzhu (wosmvp@gmail.com)

// Usage:
//   document.getElementsByTagName('body')[0].innerHTML = render('template',{argument : 'argu'});
//   render('template',{argument : 'argu'}, function(data) { document.getElementsByTagName('body')[0].innerHTML = data });
//   document.getElementsByTagName('body')[0].innerHTML = render('template');

var render = (function() {
  var cache = [];

  return function(name,data,fun) {
    if (data instanceof Function) { fun = data ; data = null };

    var template = document.getElementById(name).value;

    if (cache[name]) {
      var fn = cache[name];
    } else {
      var fn = new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +

          // Introduce the data as local variables using with(){}
          "with(obj){p.push(\"" +

          // Convert the template into pure JavaScript
          template
          .replace(/[\r\t\n]/g, " ")
          .replace(/\"/g, '\\"')
          .split("{{").join("\t")
          .replace(/((^|}})[^\t]*)/g, "$1\r")
          .replace(/\t=(.*?)(;+\s*)?}}/g, "\",function(){ try { return $1 }catch(e){ return '$1 undefined'} }.apply(this),\"")
          .split("\t").join("\");")
          .split("}}").join(";p.push(\"")
          .split("\r").join("")
          + "\");};return p.join('');");
      cache[name] = fn;
    };

    var result = fn.call(this,data || '');
    return (fun instanceof Function) ? fun.call(this,result) : result;
  };
})()
