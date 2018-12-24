// https://github.com/hbxeagle/rem
// var defaultFontSize = adaptHTMLRootSizeToRem(640, 100);
function adaptHTMLRootSizeToRem(designWidth, rem2px){
  var d = window.document.createElement('div');
  d.style.width = '1rem';
  d.style.display = "none";
  var head = window.document.getElementsByTagName('head')[0];
  head.appendChild(d);
  var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
  var st = document.createElement('style');
  var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
  var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
  st.innerHTML = portrait + landscape;
  d.remove();
  head.appendChild(st);
  return defaultFontSize;
};

export {
  adaptHTMLRootSizeToRem
};

export default {
  adaptHTMLRootSizeToRem
};


