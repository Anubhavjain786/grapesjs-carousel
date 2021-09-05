import {slideImgOne, slideImgTwo, slideImgThree, styleGen} from './consts';

export default (editor, config = {}) => {
    const bm = editor.BlockManager
    
    bm.add(`${config.prefixName}-carousel`, {
        label: `Carousel`,
        category: config.gridsCategory,
        content: `
                <div class="${config.prefixName} carousel slide" data-ride="carousel" data-type="${config.prefixName}">
                    <!-- Indicators -->
                    <ol class="carousel-indicators" data-type="${config.prefixName}-indicators">
                        <li data-target="#" data-slide-to="0" class="active"></li>
                        <li data-target="#" data-slide-to="1"></li>
                        <li data-target="#" data-slide-to="2"></li>
                    </ol>
                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" role="listbox" data-type="${config.prefixName}-slides">
                        <div class="item active">
                            <img src="${slideImgOne}" alt="..." />
                            <div class="carousel-caption"> 
                               Slide 1
                            </div>
                        </div>
                        <div class="item">
                            <img src="${slideImgTwo}" alt="..." />
                            <div class="carousel-caption">
                                Slide 2
                            </div>
                        </div>
                        <div class="item">
                            <img src="${slideImgThree}" alt="..." />
                            <div class="carousel-caption">
                                Slide 3
                            </div>
                        </div>
                    </div>
                    <!-- Controls -->
                    <a class="${config.prefixName} left carousel-control" href="#" role="button" data-slide="prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5" style="position: absolute;top: 40%;z-index: 5; left: 40%;">
                        <g><path fill="#2E435A" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g>
                        </svg>
                    </a>
                    <a class="${config.prefixName} right carousel-control" href="#" role="button" data-slide="next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5" style="position: absolute;top: 40%;z-index: 5; right: 40%;">
                        <g><path fill="#2E435A" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g>
                        </svg>
                    </a>
                </div>
            </div>
            ${config.styles}
            `,
        attributes: {class: 'fa fa-sliders'},
        ...config.carouselBlock
    });
    
}