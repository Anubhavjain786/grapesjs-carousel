import {compSlideName, compBaseName, slideImgOne} from '../consts';

export default (editor, config = {}) => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType(compBaseName);

    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    const TYPE = compSlideName;

    var model = defaultModel.extend({
        defaults: {
            ...defaultModel.prototype.defaults,
            traits: []
        },

    }, {
        isComponent(el) {

            if (el.tagName === 'DIV' && el.className.includes('carousel-inner') && el.getAttribute && el.getAttribute('data-type') === `${config.prefixName}-slides`) {
                return {type: TYPE};
            }
            return '';
        }
    });


    var view = defaultView.extend({
        init() {
            this.listenTo(this.model, 'change:carouselSlides', this.updateSlides);
        },

        updateSlides() {
            var comps = this.model.get('components');

            const n = parseInt(this.model.get('carouselSlides'));

            const id = this.el.id;

            const diff = (n - comps.length);

            const l = Math.abs(diff);

            if (diff < 0) {
                this.reduce(comps, l);
            } else if (diff > 0) {
                this.increse(comps, l);
            }
            
            this.resetActive(comps);
        },

        reduce(comps, n) {
            [...Array(n).keys()].forEach((i) => {
                comps.pop();
            });
        },

        increse(comps, n) {
            [...Array(n).keys()].forEach((i) => {
                let output = `<div class="item">
                            <img src="${slideImgOne}" alt="..." />
                            <div class="carousel-caption">
                                New Slide
                            </div>
                        </div>`;
                comps.add(output);
            });
        },
        
        resetActive(comps){
            [...Array(comps.length).keys()].forEach((i) => {
                comps.at(i).setClass('item');
            });
            
            comps.at(0).addClass('active');
        }
    });

    domc.addType(TYPE, {

        model: model,

        view: view
    });
}