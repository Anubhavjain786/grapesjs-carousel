export default (editor, config = {}) => {
	const domc = editor.DomComponents;
	const defaultType = domc.getType('default');
    
	const defaultModel = defaultType.model;
	const defaultView = defaultType.view;
    
	const TYPE = 'mpgGallery';
    
	var $ = editor.$;
    
	var model = defaultModel.extend({
    
	    defaults: {
		...defaultModel.prototype.defaults,
		droppable: false,
    
		jsSrc: config.mpgJs,
		cssSrc: config.mpgCss,
    
		traits: [],
		script: function () {
		    // Set the ID
		    var id = this.id;
    
		    var init = function () {
			var elem = document.getElementById(id);
			try {
			    if (MaterialPhotoGallery && elem) {
				new MaterialPhotoGallery(elem);
				elem.querySelectorAll('img').forEach(e => {
				    e.style.opacity = 1;
				    e.classList.remove('hide');
				    e.setAttribute('data-full', e.getAttribute('src'));
				    if (!e.classList.contains('m-p-g__thumbs-img')) {
					e.classList.add('m-p-g__thumbs-img')
				    }
				});
				return;
			    }
    
			    elem.innerHTML = '<h2>MaterialPhotoGallery is not loaded!</h2>';
			    console.error('MaterialPhotoGallery is not loaded!');
    
			} catch (e) {
			    elem.innerHTML = '<h2>MaterialPhotoGallery is not loaded!</h2>';
			    console.error('MaterialPhotoGallery is not loaded!', e);
			}
		    };
    
		    var script = document.querySelector('script[src="{[ jsSrc ]}"]');
		    var style = document.querySelector('link[href="{[ cssSrc ]}"]');
    
		    var races = [];
    
		    if (!script) {
			races.push(new Promise(function (resolve, reject) {
			    var script = document.createElement('script');
			    script.onload = resolve;
			    script.onerror = reject;
			    script.src = '{[ jsSrc ]}';
			    document.body.appendChild(script);
			}));
		    }
    
		    if (!style) {
			races.push(new Promise(function (resolve, reject) {
			    var link = document.createElement('link');
			    link.onload = resolve;
			    link.onerror = reject;
			    link.rel = 'stylesheet';
			    link.href = '{[ cssSrc ]}';
			    document.head.appendChild(link);
			}));
		    }
    
		    Promise.all(races).then(init);
		}
	    }
	}, {
	    isComponent(el) {
    
		if (el.tagName === 'DIV' && el.className.includes(`${config.prefixName}-m-p-g`) && el.getAttribute && el.getAttribute('data-type') === 'mpg-gallery') {
		    return {type: TYPE};
		}
		return '';
	    }
	});
    
	let getDoc = () => {
	    var iframes = document.querySelectorAll("iframe.gjs-frame");
    
	    if (iframes.length < 1) {
		return document;
	    }
    
	    return iframes[0].contentDocument || iframes[0].contentWindow.document;
	};
    
	let getWin = (doc) => {
	    return doc.parentWindow || doc.defaultView; //  Window
	};
    
	var view = defaultView.extend({
    
	    events: {
		click: 'click'
	    },
    
	    init() {
		var self = this;
		// Wait for the view to finish the animation.
		// Only update the PMG when the animation is completed.
    //            this.listenTo(editor.editor, 'change:device', ()=>setTimeout( self.updateScript , 1000));
	    },
    
	    click(event) {
		event.preventDefault();
		event.stopPropagation();
    
		if (event.target === this.el) {
		    return;
		}
    
		let w = getWin(getDoc());
    
		let width = $(event.target).css('width');
		let height = $(event.target).css('height');
    
		editor.select(event.target);
    
		w.onwheel = null;
		w.ontouchmove = null;
    
		// Set the old sizes
		$(event.target).css('opacity', '1');
		$(event.target).css('width', width);
		$(event.target).css('height', height);
    
		$(this.el).find('.m-p-g__controls').css('display', 'none');
		$(this.el).find('.m-p-g__fullscreen').css('display', 'none');
    
		// Refresh the MPG again. The photos were losing the right size. With this fix
		// The mph will force the photos to the right size.
		this.updateScript();
	    }
	});
    
	domc.addType(TYPE, {
    
	    model: model,
    
	    view: view
	});
    
	/*
	 * Events to handle:
	 * 
	 * component:clone Could be clone one img
	 * canvas:drop Could be reorder one img
	 * 
	 * sorter:drag:start / sorter:drag:end Could be the sort event
	 * component:remove Remove an img from the mpg
	 * component:update:src Update the image's source
	 * 
	 * when change the image source inside the mpg gallery.
	 * 
	 * preview event should show the library the way it is.
	 * 
	 * We should call the scriptUpdated againg to update the MPG library
	 * 
	 */
    
	let updateScript = (model) => {
	    let parent = typeof model.parent === 'function' ? model.parent() : null;
	    let mpg = parent ? parent.parent() || parent : null;
    
	    if (mpg && mpg.is(TYPE) && mpg.view && mpg.view.updateScript) {
		mpg.view.updateScript();
	    }
	};
    
	editor.on('component:clone', updateScript);
	editor.on('component:remove', updateScript);
	editor.on('component:update:src', updateScript);
	editor.on('canvas:drop', (dataTransfer, model) => updateScript(model));
	editor.on('sorter:drag:end', () => editor.getSelected() && updateScript(editor.getSelected()));
    }