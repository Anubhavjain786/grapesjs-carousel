import Base from './components/Base';
import Indicator from './components/Indictor';
import Slide from './components/Slide';
import Control from './components/Control';
import Carousel from './components/Carousel';
// mpg gallery
import MpgGallery from './components/Mpg';

export default (editor, config = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const opts = {
    ...config,
    defaultModel,
    defaultView,
  };

  Base(dc, opts);
  Indicator(dc, opts);
  Slide(dc, opts);
  Control(dc, opts);
  Carousel(dc, opts);
  
  // MPG Gallery
  MpgGallery(dc, opts);
}