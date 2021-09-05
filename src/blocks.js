import {slideImgOne, slideImgTwo, slideImgThree, styleGen} from './consts';

export default (editor, config = {}) => {
    const blockManager = editor.BlockManager;
    
    const style = styleGen(config.prefixName);
    
    blockManager.add(`${config.prefixName}-carousel`, {
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
            ${style}
            `,
        attributes: {class: 'fa fa-sliders'}
    });
    
    /*Material Photo Gallery*/
    blockManager.add(`${config.prefixName}-mpg`, {
        label: `Material Photo Gallery`,
        category: config.gridsCategory,
        content: `
                <div class="${config.prefixName}-m-p-g" data-type="mpg-gallery" style="display: block;overflow: auto;">
			<div class="m-p-g__thumbs" data-google-image-layout data-max-height="350" style="display: block;overflow: auto;">
				<img src="http://unsplash.it/600/400?image=940" data-full="http://unsplash.it/1200/800?image=940" class="m-p-g__thumbs-img" />
				<img src="http://unsplash.it/640/450?image=906" data-full="http://unsplash.it/1280/900?image=906" class="m-p-g__thumbs-img" />
				<img src="http://unsplash.it/550/420?image=885" data-full="http://unsplash.it/1100/840?image=885" class="m-p-g__thumbs-img" />
				<img src="http://unsplash.it/650/450?image=823" data-full="http://unsplash.it/1300/900?image=823" class="m-p-g__thumbs-img" />
				<img src="http://unsplash.it/600/350?image=815" data-full="http://unsplash.it/1200/700?image=815" class="m-p-g__thumbs-img" />
				<img src="http://unsplash.it/560/500?image=677" data-full="http://unsplash.it/1120/1000?image=677" class="m-p-g__thumbs-img" />
				<img src="http://unsplash.it/600/400?image=940" data-full="http://unsplash.it/1200/800?image=940" class="m-p-g__thumbs-img" />
				<img src="http://unsplash.it/670/410?image=401" data-full="http://unsplash.it/1340/820?image=401" class="m-p-g__thumbs-img" />
				<img src="http://unsplash.it/620/340?image=623" data-full="http://unsplash.it/1240/680?image=623" class="m-p-g__thumbs-img" />
				<img src="http://unsplash.it/790/390?image=339" data-full="http://unsplash.it/1580/780?image=339" class="m-p-g__thumbs-img" />
			</div>
			<div class="m-p-g__fullscreen"></div>
		</div>
            `,
        attributes: {class: 'fa fa-th-large'}
    });
}