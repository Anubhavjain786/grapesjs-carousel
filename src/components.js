import base from './components/Base';
import indicator from './components/Indictor';
import slide from './components/Slide';
import control from './components/Control';
import carousel from './components/Carousel';
// mpg gallery
import mpgGallery from './components/Mpg';

export default (editor, config = {}) => {
    
    base(editor, config);
    indicator(editor, config);
    slide(editor, config);
    control(editor, config);
    carousel(editor, config);
    
    // MPG Gallery
    mpgGallery(editor, config);
}