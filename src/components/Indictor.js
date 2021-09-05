import {compIndicatorName, compBaseName} from '../consts';

export default (editor, config = {}) => {
    const domc = editor.DomComponents;
    const baseType = domc.getType(compBaseName);

    const baseModel = baseType.model;
    const baseView = baseType.view;

    const TYPE = compIndicatorName;

    var model = baseModel.extend({
        defaults: {
            ...baseModel.prototype.defaults,
            traits: []
        },

    }, {
        isComponent(el) {

            if (el.tagName === 'OL' && el.className.includes('carousel-indicators') && el.getAttribute && el.getAttribute('data-type') === `${config.prefixName}-indicators`) {
                return {type: TYPE};
            }
            return '';
        }
    });


    var view = baseView.extend({
        init() {
            this.listenTo(this.model, 'change:carouselSlides', this.updateSlides);
        },

        updateSlides() {
            const comps = this.model.get('components');

            const n = parseInt(this.model.get('carouselSlides'));
            
            const id = this.el.id;
            
            var output = '';
            
            [...Array(n).keys()].forEach((i) => {
                let _c = i === 0 ? 'active': '';
                output += `<li data-target="#${id}" data-slide-to="${i}" class="${_c}"></li>`;
            });

            comps.reset();
            comps.add(output);
        }
    });

    domc.addType(TYPE, {

        model: model,

        view: view
    });
}