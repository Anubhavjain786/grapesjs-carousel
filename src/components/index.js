import Base from './Base';
import Indicator from './Indictor';
import Slide from './Slide';
import Control from './Control';
import Carousel from './Carousel';

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
}