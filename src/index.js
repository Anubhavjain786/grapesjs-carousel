import loadComponents from './components'; 
import loadBlocks from './blocks';
import { defaultStyle } from './consts';

// component's name
const compBaseName = 'carousel-base';
const compIndicatorName = 'carousel-indicator';
const compSlideName = 'carousel-slide';
const compControlName = 'carousel-control';

export default (editor, opts = {}) => {
    const options = {
        ...{
            // Object to extend the default carousel block, eg. `{ label: 'Carousel', attributes: { ... } }`
            // Pass a falsy value to avoid adding the block
            carouselBlock: {},

            // Object to extend the default carousel properties, eg. `{ name: 'My Carousel', droppable: false, ... }`
            carouselBaseProps: {},

            // Object to extend the default carousel properties
            carouselIndicatorProps: {},

            // Object to extend the default carousel slide properties
            carouselSlideProps: {},

            // Object to extend the default carousel control properties
            carouselControlProps: {},

            // Default class to use on carousel
            classCarousel: "carousel",

            // Default class to use on carousel base
            classCarouselBase: "carousel-base",

            // Default class to use on carousel control
            classCarouselControl: 'carousel-control',

            // Default class to use on carousel indicator
            classCarouselIndicator: "carousel-indicators",

            // Default class to use on carousel slide
            classCarouselSlide: "carousel-slide",

            //Components Name
            compBaseName,

            compIndicatorName,

            compSlideName,

            compControlName,

            blocks: ['carousel'],

            prefixName: 'bts-carousel',

            gridsCategory: 'Extra',

            autoplay: true,

            interval: 5000,

            slides: 3,

            styles: null

        },
        ...opts,
    };

    if(!options.styles) {
        options.styles =  defaultStyle(options.prefixName)
    }

    // Add components
    loadComponents(editor, options);

    // Add blocks
    loadBlocks(editor, options);
};