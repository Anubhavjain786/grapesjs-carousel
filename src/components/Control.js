import {compControlName, compBaseName} from '../consts';

export default (editor, config = {}) => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType(compBaseName);

    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    const TYPE = compControlName;

    var model = defaultModel.extend({
        defaults: {
            ...defaultModel.prototype.defaults,
            traits: []
        }
    }, {
        isComponent(el) {

            if (el.tagName === 'A' && el.className.includes('carousel-control')) {
                return {type: TYPE};
            }
            return '';
        }
    });


    var view = defaultView.extend({
        init() {

        },

        events: {
            click: 'click'
        },

        click(event) {
            event.preventDefault();
        },
    });

    domc.addType(TYPE, {

        model: model,

        view: view
    });
}