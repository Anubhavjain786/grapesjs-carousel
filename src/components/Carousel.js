export default (dc, { defaultModel, defaultView, ...config }) => {
    const type = 'carousel';

    dc.addType(type, {

        model:  defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                interval: config.interval,
                droppable: false,
    
                slides: config.slides,
                autoplay: config.autoplay,
                moveTo: null, // To move left or right
    
                traits: [{
                        label: 'Auto play',
                        name: 'autoplay',
                        changeProp: 1,
                        type: 'checkbox'
                    }, {
                        label: 'Interval',
                        name: 'interval',
                        changeProp: 1,
                        type: 'number'
                    }, {
                        label: '# Slides',
                        name: 'slides',
                        changeProp: 1,
                        type: 'number'
                    }],
                    
                script: function () {
                    // Set the ID
                    var id = this.id;
                   
                    // Set the indicators.
                    const indicators = document.querySelectorAll(`#${id} .carousel-indicators li`);
                    for (let i=0; i<indicators.length; i++) {
                        const indicator = indicators[i]
                        indicator.setAttribute('data-target', `#${id}`);   
                    }

                    var controls = document.querySelectorAll(`#${id} .carousel-control`);
                    for (let i=0; i<controls.length; i++) {
                        
                        const control = controls[i]
                        control.setAttribute('href', `#${id}`);
                        
                    }
    
                    var init = function () {
    
                        if (!jQuery.fn.carousel) {
                            // Bootstrap carousel
                            (function ($) {
                                'use strict';
    
                                // CAROUSEL CLASS DEFINITION
                                // =========================
    
                                var Carousel = function (element, options) {
                                    this.$element = $(element)
                                    this.$indicators = this.$element.find(`.carousel-indicators`)
                                    this.options = options
                                    this.paused = null
                                    this.sliding = null
                                    this.interval = null
                                    this.$active = null
                                    this.$items = null
    
                                    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))
    
                                    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
                                            .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
                                            .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
                                }
    
                                Carousel.VERSION = '3.3.7'
    
                                Carousel.TRANSITION_DURATION = 600
    
                                Carousel.DEFAULTS = {
                                    interval: '{[ interval ]}',
                                    pause: 'hover',
                                    wrap: true,
                                    keyboard: false
                                }
    
                                Carousel.prototype.keydown = function (e) {
                                    if (/input|textarea/i.test(e.target.tagName))
                                        return
                                    switch (e.which) {
                                        case 37:
                                            this.prev();
                                            break
                                        case 39:
                                            this.next();
                                            break
                                        default:
                                            return
                                    }
    
                                    e.preventDefault()
                                }
    
                                Carousel.prototype.cycle = function (e, interval) {
                                    e || (this.paused = false)
    
                                    this.interval && clearInterval(this.interval)
    
                                    this.options.interval = interval || this.options.interval;
    
                                    this.options.interval
                                            && !this.paused
                                            && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
    
                                    return this
                                }
    
                                Carousel.prototype.getItemIndex = function (item) {
                                    this.$items = item.parent().children('.item')
                                    return this.$items.index(item || this.$active)
                                }
    
                                Carousel.prototype.getItemForDirection = function (direction, active) {
                                    var activeIndex = this.getItemIndex(active)
                                    var willWrap = (direction == 'prev' && activeIndex === 0)
                                            || (direction == 'next' && activeIndex == (this.$items.length - 1))
                                    if (willWrap && !this.options.wrap)
                                        return active
                                    var delta = direction == 'prev' ? -1 : 1
                                    var itemIndex = (activeIndex + delta) % this.$items.length
                                    return this.$items.eq(itemIndex)
                                }
    
                                Carousel.prototype.setInterval = function (i) {
                                    this.cycle(null, i);
                                }
    
                                Carousel.prototype.to = function (pos) {
                                    var that = this
                                    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))
    
                                    if (pos > (this.$items.length - 1) || pos < 0)
                                        return
    
                                    if (this.sliding)
                                        return this.$element.one('slid.bs.carousel', function () {
                                            that.to(pos)
                                        }) // yes, "slid"
                                    if (activeIndex == pos)
                                        return this.pause().cycle()
    
                                    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
                                }
    
                                Carousel.prototype.pause = function (e) {
                                    e || (this.paused = true)
    
                                    if (this.$element.find('.next, .prev').length && $.support.transition) {
                                        this.$element.trigger($.support.transition.end)
                                        this.cycle(true)
                                    }
    
                                    this.interval = clearInterval(this.interval)
    
                                    return this
                                }
    
                                Carousel.prototype.next = function () {
                                    if (this.sliding)
                                        return
                                    return this.slide('next')
                                }
    
                                Carousel.prototype.prev = function () {
                                    if (this.sliding)
                                        return
                                    return this.slide('prev')
                                }
    
                                Carousel.prototype.slide = function (type, next) {
                                    var $active = this.$element.find('.item.active')
                                    var $next = next || this.getItemForDirection(type, $active)
                                    var isCycling = this.interval
                                    var direction = type == 'next' ? 'left' : 'right'
                                    var that = this
    
                                    if ($next.hasClass('active'))
                                        return (this.sliding = false)
    
                                    var relatedTarget = $next[0]
                                    var slideEvent = $.Event('slide.bs.carousel', {
                                        relatedTarget: relatedTarget,
                                        direction: direction
                                    })
                                    this.$element.trigger(slideEvent)
                                    if (slideEvent.isDefaultPrevented())
                                        return
    
                                    this.sliding = true
    
                                    isCycling && this.pause()
    
                                    if (this.$indicators.length) {
                                        this.$indicators.find('.active').removeClass('active')
                                        var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
                                        $nextIndicator && $nextIndicator.addClass('active')
                                    }
    
                                    var slidEvent = $.Event('slid.bs.carousel', {relatedTarget: relatedTarget, direction: direction}) // yes, "slid"
                                    if ($.support.transition && this.$element.hasClass('slide')) {
                                        $next.addClass(type)
                                        $next[0].offsetWidth // force reflow
                                        $active.addClass(direction)
                                        $next.addClass(direction)
                                        $active
                                                .one('bsTransitionEnd', function () {
                                                    $next.removeClass([type, direction].join(' ')).addClass('active')
                                                    $active.removeClass(['active', direction].join(' '))
                                                    that.sliding = false
                                                    setTimeout(function () {
                                                        that.$element.trigger(slidEvent)
                                                    }, 0)
                                                })
                                                .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
                                    } else {
                                        $active.removeClass('active')
                                        $next.addClass('active')
                                        this.sliding = false
                                        this.$element.trigger(slidEvent)
                                    }
    
                                    isCycling && this.cycle()
    
                                    return this
                                }
    
    
                                // CAROUSEL PLUGIN DEFINITION
                                // ==========================
    
                                function Plugin(option) {
                                    return this.each(function () {
                                        var $this = $(this)
                                        var data = $this.data('bs.carousel')
    //                                    var options = Carousel.DEFAULTS
                                        var options = $.extend({}, Carousel.DEFAULTS, $this.data(), option);
                                        var action = typeof option === 'string' ? option : options.slide;
    
                                        if (!data)
                                            $this.data('bs.carousel', (data = new Carousel(this, options)));
                                        if (typeof option === 'number')
                                            data.setInterval(option);
                                        else if (typeof action === 'string')
                                            data[action] && data[action]();
                                        else if (options.interval)
                                            data.pause().cycle();
                                    })
                                }
    
                                var old = $.fn.carousel;
    
                                $.fn.carousel = Plugin;
                                $.fn.carousel.Constructor = Carousel;
    
    
                                // CAROUSEL NO CONFLICT
                                // ====================
    
                                $.fn.carousel.noConflict = function () {
                                    $.fn.carousel = old
                                    return this
                                }
    
    
                                // CAROUSEL DATA-API
                                // =================
    
                                var clickHandler = function (e) {
                                    var href
                                    var $this = $(this)
                                    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
                                    if (!$target.hasClass('carousel'))
                                        return
                                    var options = $.extend({}, $target.data(), $this.data())
                                    var slideIndex = $this.attr('data-slide-to')
                                    if (slideIndex)
                                        options.interval = false
    
                                    Plugin.call($target, options)
    
                                    if (slideIndex) {
                                        $target.data('bs.carousel').to(slideIndex)
                                    }
    
                                    e.preventDefault()
                                }
    
                                $(document)
                                        .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
                                        .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)
    
                                $(window).on('load', function () {
                                    $('[data-ride="carousel"]').each(function () {
                                        var $carousel = $(this)
                                        Plugin.call($carousel, $carousel.data())
                                    })
                                })
    
                            })(jQuery);
    
                            (function ($) {
                                'use strict';
    
                                function transitionEnd() {
                                    var el = document.createElement('bootstrap')
    
                                    var transEndEventNames = {
                                        WebkitTransition: 'webkitTransitionEnd',
                                        MozTransition: 'transitionend',
                                        OTransition: 'oTransitionEnd otransitionend',
                                        transition: 'transitionend'
                                    }
    
                                    for (var name in transEndEventNames) {
                                        if (el.style[name] !== undefined) {
                                            return {end: transEndEventNames[name]}
                                        }
                                    }
    
                                    return false // explicit for ie8 (  ._.)
                                }
    
                                $.fn.emulateTransitionEnd = function (duration) {
                                    var called = false
                                    var $el = this
                                    $(this).one('bsTransitionEnd', function () {
                                        called = true
                                    })
                                    var callback = function () {
                                        if (!called)
                                            $($el).trigger($.support.transition.end)
                                    }
                                    setTimeout(callback, duration)
                                    return this
                                }
    
                                $(function () {
                                    $.support.transition = transitionEnd()
    
                                    if (!$.support.transition)
                                        return
    
                                    $.event.special.bsTransitionEnd = {
                                        bindType: $.support.transition.end,
                                        delegateType: $.support.transition.end,
                                        handle: function (e) {
                                            if ($(e.target).is(this))
                                                return e.handleObj.handler.apply(this, arguments)
                                        }
                                    }
                                })
                            })(jQuery);
                        }
    
                        jQuery(`#${id}`).carousel({keyboard: false});
                        jQuery(`#${id}`).carousel(parseInt('{[ interval ]}'));
                        jQuery(`#${id}`).carousel('pause');
    
                        let autoPlay = Boolean('{[ autoplay ]}');
                        if (true === autoPlay) {
                            // The carousel is moving by default.
                            
                            jQuery(`#${id}`).carousel('cycle');
                        }
    
                        let moveTo = '{[ moveTo ]}';
                        moveTo && jQuery(`#${id}`).carousel(moveTo);
                    };
    
                    if (typeof jQuery === 'undefined') {
                        var script = document.createElement('script');
                        script.onload = init;
                        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
                        document.body.appendChild(script);
                    } else {
                        init();
                    }
                }
            }
        }, {
            isComponent(el) {
    
                if (el.tagName === 'DIV' && el.className.includes(config.prefixName) && el.getAttribute && el.getAttribute('data-type') === config.prefixName) {
                    return {type};
                }
                return '';
            }
        }),

        view: defaultView.extend({
            events: {
                click: 'click'
            },
    
            init() {
                this.listenTo(this.model, 'change:interval change:autoplay change:moveTo', this.updateScript);
                this.listenTo(this.model, 'change:slides', this.updateNumSlides);
            },
    
            click(event) {
                const _class = event.target.getAttribute('class').split(' ');
    
                if (_class.includes('carousel-indicators') || _class.includes('carousel-indicators')) {
                    event.preventDefault();
                    event.stopPropagation();

                    editor.select(this.model);
                }
    
                if (_class.includes('carousel-indicators') && _class.includes('left')) {
                    // Move left
                    this.model.set('moveTo', 'prev');
                    this.model.set('moveTo', null);
                }
    
                if (_class.includes('carousel-indicators') && _class.includes('right')) {
                    // Move right
                    this.model.set('moveTo', 'next');
                    this.model.set('moveTo', null);
                }
            },
    
            updateNumSlides() {
                const comps = this.model.get('components');
    
                const nSlides = this.model.get('slides');
    
                const autoplay = this.model.get('autoplay');
    
                // Stop the carousel.
                autoplay && this.model.set('autoplay', false);
    
                // Add/Remove slides. Change the active class to 0.
                comps.models.forEach(m => m.set('carouselSlides', nSlides));
    
                // Start the carousel.
                autoplay && this.model.set('autoplay', true);
            }
        })
    });
}