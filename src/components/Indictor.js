export default (dc, config) => {
    const baseType = dc.getType(config.compBaseName);
    const classKey = config.classCarouselIndicator;

    const baseModel = baseType.model;
    const baseView = baseType.view;

    const type = config.compIndicatorName;

    dc.addType(type, {
        model: baseModel.extend({
            defaults: {
                ...baseModel.prototype.defaults,
                traits: [],
                ...config.carouselIndicatorProps
            },
        }, {
            isComponent(el) {
    
                if (el.tagName === 'OL' && el.className.includes(classKey) && el.getAttribute && el.getAttribute('data-type') === `${config.prefixName}-indicators`) {
                    return {type};
                }
                return '';
            }
        }),

        view: baseView.extend({
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
        })
    });
}