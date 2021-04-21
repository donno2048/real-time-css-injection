let text = `
/* The text is being injected as css while "printed" to the screen */

html, body { 
  margin: 0px; 
  height: 100%; 
}
pre {
  width: 100%;
  top: 10px;
  bottom: 10px;
  left: 0%;
  position: fixed;
  padding: 10px;
}
body {
  background-color: #123456;
  color: #FDFDFD;
}
pre {
  width: 75%;
  left: 12.5%;
  font-family: consolas;
  background-color: #002244; 
}
.selector { 
  color: #808808; 
}
.property { 
  color: #248842;
}
.value { 
  color: #975579; 
}
.comment {
  font-style: italic;
  color: #666666;
}`;
let char = 0;
let line = '';
let comment = false;
let Style = false;
let lineStyle = false;
let span = '';
let target = document.getElementById('target');
setInterval(function() {
	if (text.length > char) {
		document.getElementById('styleSheet').innerHTML += text.charAt(char);
		window.scrollTo(0, target.scrollHeight);
		target.scrollTo(0, target.scrollHeight);
		if (text.charAt(char) == '\n') {
			target.children[target.children.length - 1].innerHTML += '<br>';
			line = '';
			target.innerHTML += '<span></span>';
			lineStyle = false;
		} else line += text.charAt(char);
		if (comment) span = '<span class="comment">';
		else if (Style && lineStyle) span = '<span class="selector">';
		else if (Style) span = '<span class="property">';
		else span = '<span class="selector">';
		for (var i = 0; i < line.length; i++) {
			switch (line.charAt(i)) {
				case '/':
					if (i + 1 < line.length && line.charAt(i + 1) == '*') {
						span += '</span><span class="comment">/*';
						comment = true;
						i++;
					} else span += '/';
					break;
				case '*':
					if (i + 1 < line.length && line.charAt(i + 1) == '/') {
						span += '*/</span><span class="selector">';
						i++;
						comment = false;
					} else span += '*';
					break;
				case '{':
					if (!comment) {
						span += '</span>{<span class="property">';
						Style = true;
						lineStyle = true;
					} else span += '{';
					break;
				case '}':
					if (!comment) {
						span += '</span>}<span class=selector>';
						Style = false;
					}
					break;
				case ':':
					if (!comment && Style) {
						span += '</span>:<span class="value">';
					} else span += ':';
					break;
				case ';':
					if (!comment && Style) {
						span += '</span>;<span class="property">';
					} else span += ';';
					break;
				default: span += line.charAt(i);
			}
		}
		span += '</span>';
		target.children[target.children.length - 1].innerHTML = span;
		char++;
	}
}, 20);
