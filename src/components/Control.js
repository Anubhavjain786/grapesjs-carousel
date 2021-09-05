export default (dc, config) => {
    const baseType = dc.getType(config.compBaseName);
    const classKey = config.classCarouselControl;
    const type = config.compControlName;

    const baseModel = baseType.model;
    const baseView = baseType.view;

    dc.addType(type, {

        model: baseModel.extend({
            defaults: {
                ...baseModel.prototype.defaults,
                traits: [],
                ...config.carouselControlProps
            },
        }, {
            isComponent(el) {
                if (el.tagName === 'A' && el.className.includes(classKey)) {
                    return {type};
                }
                return '';
            }
        }),

        view: baseView.extend({
            events: {
                click: 'click'
            },
            
            click(event) {
                event.preventDefault();
            },
        })
    });
}