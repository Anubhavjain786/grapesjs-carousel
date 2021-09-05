import loadComponents from './components';
import loadBlocks from './blocks';

const attrCarousel = "data-carousel";
const attrCarouselBase = "data-carousel-base";
const attrCarouselIndicator = "data-carousel-indicator";
const attrCarouselSlide = "data-carousel-slide";
const attrCarouselControl = "data-carousel-control";


export default grapesjs.plugins.add('grapesjs-plugin-carousel', (editor, opts = {}) => {

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

      // Carousels attribute identifier (main component)
      attrCarousel,

       // Carousels attribute base
       attrCarouselBase,

       // Carousel attribute identifier
       attrCarouselIndicator,
 
       // Carousel slide attribute identifier
       attrCarouselSlide,
 
       // Carousel control attribute identifier
       attrCarouselControl,

          // Default class to use on carousel
      classCarousel: "carousel",

        // Default class to use on carousel base
      classCarouselBase: "carousel-base",

      // Default class to use on carousel indicator
      classCarouselIndicator: "carousel-indicators",

      // Default class to use on carousel slide
      classCarouselSlide: "carousel-slide",

      // Default class to use on carousel control
      classCarouselControl: "carousel-control",

                blocks: ['carousel', 'mpg'],

                prefixName: 'bst-carousel',

                gridsCategory: 'Extra',

                autoplay: true,

                interval: 5000,

                slides: 3,

                mpgCss: 'https://ettrics.github.io/material-photo-gallery/dist/css/material-photo-gallery.css',

                mpgJs: 'https://ettrics.github.io/material-photo-gallery/dist/js/material-photo-gallery.min.js'
        },
        ...opts,
    };

    // Add components
    loadComponents(editor, options);

    // Add blocks
    loadBlocks(editor, options);
});