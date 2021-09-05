export default (dc, { defaultType, defaultModel, defaultView, ...config }) => {
    const type = 'carousel-base';
    const attrKey = config.attrCarouselBase;
    const classKey = config.classCarouselBase;

    dc.addType(type, {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                name: 'Carousel-base',
                droppable: false,
                draggable: false,
                copyable: false,
                selectable: false,
                removable: false,
                stylable: false,
                layerable: false,
                carouselSlides: 3,
                ...config.carouselBaseProps,
            },

            init() {
                const attrs = this.getAttributes();
                attrs[attrKey] = 1;
                this.setAttributes(attrs);
                classKey && this.addClass(classKey);
              },
        }, {
            isComponent(el) {
                if (el.hasAttribute && el.hasAttribute(attrKey)) {
                    return { type };
                  }
            }
        }),

        view: defaultView
    })
}