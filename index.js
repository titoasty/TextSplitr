function TextSplitr(elt, options) {
	this.chars = [];
	this.words = [];
	this.options = options;
/*	this.options = Object.assign({}, {
		type: 'chars'
	}, options);*/

	var html = elt.innerHTML;

	var typeChars = options.type.indexOf('chars') >= 0;
	var typeWords = options.type.indexOf('words') >= 0;

	var tags = [];
	var found = html.match(/<span[^>]*>(.*?)<\/span>/g);
	for(var i=0; i<found.length; i++) {
		var pos = html.indexOf(found[i]);
		tags[pos] = found[i];
	}

	elt.innerHTML = '';

	var i=0;
	var lastSpace = true, word=null;
	while(i < html.length) {
		if(tags[i]) {
			var strTag = tags[i];
			i += strTag.length;

			//elt.appendChild(this.createCharContainer(tag));
			elt.insertAdjacentHTML("beforeEnd", strTag);

			var tag = elt.childNodes[elt.childNodes.length-1];
			this.words.push(tag);
			this.chars.push(tag);
		} else {
			var c = html.charAt(i);
			var isSpace = (c == ' ');

			if(typeChars && !typeWords) {
				if(isSpace) {
					elt.appendChild(document.createTextNode(' '));
				} else {
					elt.appendChild(this.createCharContainer(c));
				}
			}

			if(typeWords) {
				if(isSpace) {
					elt.appendChild(document.createTextNode(' '));
					lastSpace = true;
				} else {
					if (lastSpace) {
						lastSpace = false;
						word = this.createWordContainer('');
						elt.appendChild(word);
					}

					if(typeChars) {
						word.appendChild(this.createCharContainer(c));
					} else {
						word.innerHTML += c;
					}
				}
			}

			i++;
		}
	}
}

TextSplitr.prototype.createCharContainer = function(html) {
	var div = document.createElement('div');
	div.style.display = 'inline-block';
	div.style.position = 'relative';
	div.innerHTML = html;

	this.chars.push(div);

	return div;
};

TextSplitr.prototype.createWordContainer = function(html) {
	var div = document.createElement('div');
	div.style.display = 'inline-block';
	div.style.position = 'relative';
	div.innerHTML = html;

	this.words.push(div);

	return div;
};

exports = TextSplitr;
