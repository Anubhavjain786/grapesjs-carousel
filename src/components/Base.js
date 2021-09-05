export default (dc, { defaultType, defaultModel, defaultView, ...config }) => {
    const type = config.compBaseName;

    dc.addType(type, {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
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

        }, {
            isComponent(el) {
                return ''
            }
        }),

        view: defaultView
    })
}