
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src\LandingArea.svelte generated by Svelte v3.16.7 */

    const file = "src\\LandingArea.svelte";

    function create_fragment(ctx) {
    	let section;
    	let div2;
    	let div0;
    	let t0;
    	let div1;
    	let h1;
    	let t2;
    	let p;
    	let t4;
    	let a;
    	let span;
    	let t6;
    	let div3;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Easy Tune Up Mechanic Shop!";
    			t2 = space();
    			p = element("p");
    			p.textContent = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores ad\r\n        ratione repudiandae, dolorem officia sunt voluptatibus optio adipisci\r\n        dolore harum culpa. Architecto, provident explicabo! Iusto, esse, rem\r\n        pariatur quibusdam ab quidem molestias nihil quo commodi provident vel\r\n        temporibus. Ex quia est placeat quasi deleniti. In.";
    			t4 = space();
    			a = element("a");
    			span = element("span");
    			span.textContent = "Contact Us";
    			t6 = space();
    			div3 = element("div");
    			attr_dev(div0, "class", "hero__white-bg svelte-1biz648");
    			add_location(div0, file, 7, 4, 187);
    			attr_dev(h1, "class", "hero__header red-header svelte-1biz648");
    			add_location(h1, file, 9, 6, 258);
    			attr_dev(p, "class", "hero__text light-text svelte-1biz648");
    			add_location(p, file, 10, 6, 334);
    			attr_dev(span, "class", "button-slanted-content");
    			add_location(span, file, 18, 8, 836);
    			attr_dev(a, "class", "diagonal-button hero__button svelte-1biz648");
    			attr_dev(a, "href", "#contact-us");
    			add_location(a, file, 17, 6, 767);
    			attr_dev(div1, "class", "hero__content svelte-1biz648");
    			add_location(div1, file, 8, 4, 223);
    			attr_dev(div2, "class", "hero svelte-1biz648");
    			add_location(div2, file, 5, 2, 124);
    			attr_dev(div3, "class", "main-bg-img svelte-1biz648");
    			add_location(div3, file, 23, 2, 964);
    			attr_dev(section, "class", "hero-container d-flex-nw svelte-1biz648");
    			attr_dev(section, "id", "hero");
    			add_location(section, file, 3, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    			append_dev(div1, t4);
    			append_dev(div1, a);
    			append_dev(a, span);
    			append_dev(section, t6);
    			append_dev(section, div3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class LandingArea extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LandingArea",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src\PistonHeader.svelte generated by Svelte v3.16.7 */

    const file$1 = "src\\PistonHeader.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let h1;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			t = text(/*title*/ ctx[0]);
    			attr_dev(h1, "class", "red-header");
    			add_location(h1, file$1, 19, 2, 443);
    			attr_dev(div, "class", "piston-header svelte-12rydgg");
    			add_location(div, file$1, 18, 0, 412);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(h1, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { title = "Header Title" } = $$props;
    	const writable_props = ["title"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PistonHeader> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    	};

    	$$self.$capture_state = () => {
    		return { title };
    	};

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    	};

    	return [title];
    }

    class PistonHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment$1, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PistonHeader",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get title() {
    		throw new Error("<PistonHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<PistonHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Service.svelte generated by Svelte v3.16.7 */

    const file$2 = "src\\Service.svelte";

    function create_fragment$2(ctx) {
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let h1;
    	let t1;
    	let t2;
    	let p;
    	let t3;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			t1 = text(/*serviceTitle*/ ctx[1]);
    			t2 = space();
    			p = element("p");
    			t3 = text(/*serviceText*/ ctx[2]);
    			attr_dev(img, "class", "service__icon ");
    			if (img.src !== (img_src_value = /*serviceIcon*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$2, 9, 4, 367);
    			attr_dev(div0, "class", "service__icon-container svelte-9ejykm");
    			add_location(div0, file$2, 8, 2, 324);
    			attr_dev(h1, "class", "service__title svelte-9ejykm");
    			add_location(h1, file$2, 12, 4, 469);
    			attr_dev(p, "class", "service__text svelte-9ejykm");
    			add_location(p, file$2, 13, 4, 521);
    			attr_dev(div1, "class", "service__body svelte-9ejykm");
    			add_location(div1, file$2, 11, 2, 436);
    			attr_dev(div2, "class", "service svelte-9ejykm");
    			add_location(div2, file$2, 7, 0, 299);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(h1, t1);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    			append_dev(p, t3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*serviceIcon*/ 1 && img.src !== (img_src_value = /*serviceIcon*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*serviceTitle*/ 2) set_data_dev(t1, /*serviceTitle*/ ctx[1]);
    			if (dirty & /*serviceText*/ 4) set_data_dev(t3, /*serviceText*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { serviceIcon = "/assets/brakes.svg" } = $$props;
    	let { serviceTitle = "Service Title" } = $$props;
    	let { serviceText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatum, harum tempora quaerat iusto perspiciatis commodi accusamus similique." } = $$props;
    	const writable_props = ["serviceIcon", "serviceTitle", "serviceText"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Service> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("serviceIcon" in $$props) $$invalidate(0, serviceIcon = $$props.serviceIcon);
    		if ("serviceTitle" in $$props) $$invalidate(1, serviceTitle = $$props.serviceTitle);
    		if ("serviceText" in $$props) $$invalidate(2, serviceText = $$props.serviceText);
    	};

    	$$self.$capture_state = () => {
    		return { serviceIcon, serviceTitle, serviceText };
    	};

    	$$self.$inject_state = $$props => {
    		if ("serviceIcon" in $$props) $$invalidate(0, serviceIcon = $$props.serviceIcon);
    		if ("serviceTitle" in $$props) $$invalidate(1, serviceTitle = $$props.serviceTitle);
    		if ("serviceText" in $$props) $$invalidate(2, serviceText = $$props.serviceText);
    	};

    	return [serviceIcon, serviceTitle, serviceText];
    }

    class Service extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$2, safe_not_equal, {
    			serviceIcon: 0,
    			serviceTitle: 1,
    			serviceText: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Service",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get serviceIcon() {
    		throw new Error("<Service>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set serviceIcon(value) {
    		throw new Error("<Service>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get serviceTitle() {
    		throw new Error("<Service>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set serviceTitle(value) {
    		throw new Error("<Service>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get serviceText() {
    		throw new Error("<Service>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set serviceText(value) {
    		throw new Error("<Service>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\MechanicServices.svelte generated by Svelte v3.16.7 */
    const file$3 = "src\\MechanicServices.svelte";

    function create_fragment$3(ctx) {
    	let section;
    	let t0;
    	let div0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let div1;
    	let span;
    	let current;

    	const pistonheader = new PistonHeader({
    			props: { title: "How We Can Help" },
    			$$inline: true
    		});

    	const service0 = new Service({
    			props: {
    				serviceTitle: "CEL Diagnosis",
    				serviceIcon: "/assets/engine.svg"
    			},
    			$$inline: true
    		});

    	const service1 = new Service({
    			props: {
    				serviceTitle: "Smog Check",
    				serviceIcon: "assets/exhaust.svg"
    			},
    			$$inline: true
    		});

    	const service2 = new Service({
    			props: {
    				serviceTitle: "Brake Repairs",
    				serviceIcon: "assets/brakes.svg"
    			},
    			$$inline: true
    		});

    	const service3 = new Service({
    			props: {
    				serviceTitle: "Oil Change",
    				serviceIcon: "assets/oil.svg"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(pistonheader.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(service0.$$.fragment);
    			t1 = space();
    			create_component(service1.$$.fragment);
    			t2 = space();
    			create_component(service2.$$.fragment);
    			t3 = space();
    			create_component(service3.$$.fragment);
    			t4 = space();
    			div1 = element("div");
    			span = element("span");
    			span.textContent = "More Services";
    			attr_dev(div0, "class", "services__grid svelte-1q56vl7");
    			add_location(div0, file$3, 7, 2, 217);
    			attr_dev(span, "class", "button-slanted-content");
    			add_location(span, file$3, 14, 4, 599);
    			attr_dev(div1, "class", "diagonal-button svelte-1q56vl7");
    			add_location(div1, file$3, 13, 2, 564);
    			attr_dev(section, "class", "services d-flex-nw svelte-1q56vl7");
    			attr_dev(section, "id", "services");
    			add_location(section, file$3, 5, 0, 119);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(pistonheader, section, null);
    			append_dev(section, t0);
    			append_dev(section, div0);
    			mount_component(service0, div0, null);
    			append_dev(div0, t1);
    			mount_component(service1, div0, null);
    			append_dev(div0, t2);
    			mount_component(service2, div0, null);
    			append_dev(div0, t3);
    			mount_component(service3, div0, null);
    			append_dev(section, t4);
    			append_dev(section, div1);
    			append_dev(div1, span);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pistonheader.$$.fragment, local);
    			transition_in(service0.$$.fragment, local);
    			transition_in(service1.$$.fragment, local);
    			transition_in(service2.$$.fragment, local);
    			transition_in(service3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pistonheader.$$.fragment, local);
    			transition_out(service0.$$.fragment, local);
    			transition_out(service1.$$.fragment, local);
    			transition_out(service2.$$.fragment, local);
    			transition_out(service3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(pistonheader);
    			destroy_component(service0);
    			destroy_component(service1);
    			destroy_component(service2);
    			destroy_component(service3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class MechanicServices extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MechanicServices",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\CarsServiced.svelte generated by Svelte v3.16.7 */
    const file$4 = "src\\CarsServiced.svelte";

    function create_fragment$4(ctx) {
    	let section;
    	let t0;
    	let div;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let img1;
    	let img1_src_value;
    	let t2;
    	let img2;
    	let img2_src_value;
    	let t3;
    	let img3;
    	let img3_src_value;
    	let t4;
    	let img4;
    	let img4_src_value;
    	let t5;
    	let img5;
    	let img5_src_value;
    	let current;

    	const pistonheader = new PistonHeader({
    			props: { title: "Brands We Service" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(pistonheader.$$.fragment);
    			t0 = space();
    			div = element("div");
    			img0 = element("img");
    			t1 = space();
    			img1 = element("img");
    			t2 = space();
    			img2 = element("img");
    			t3 = space();
    			img3 = element("img");
    			t4 = space();
    			img4 = element("img");
    			t5 = space();
    			img5 = element("img");
    			attr_dev(img0, "class", "cars-serviced__logo img-padding-bottom svelte-19498q");
    			if (img0.src !== (img0_src_value = /*carLogos*/ ctx[0].volkswagen)) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "Volkswagen logo");
    			add_location(img0, file$4, 15, 4, 458);
    			attr_dev(img1, "class", "cars-serviced__logo svelte-19498q");
    			if (img1.src !== (img1_src_value = /*carLogos*/ ctx[0].honda)) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "Honda logo");
    			add_location(img1, file$4, 20, 4, 592);
    			attr_dev(img2, "class", "cars-serviced__logo svelte-19498q");
    			if (img2.src !== (img2_src_value = /*carLogos*/ ctx[0].ford)) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "Ford logo");
    			add_location(img2, file$4, 21, 4, 671);
    			attr_dev(img3, "class", "cars-serviced__logo svelte-19498q");
    			if (img3.src !== (img3_src_value = /*carLogos*/ ctx[0].nissan)) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "Nissan logo");
    			add_location(img3, file$4, 22, 4, 748);
    			attr_dev(img4, "class", "cars-serviced__logo svelte-19498q");
    			if (img4.src !== (img4_src_value = /*carLogos*/ ctx[0].dodge)) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "Dodge logo");
    			add_location(img4, file$4, 23, 4, 829);
    			attr_dev(img5, "class", "cars-serviced__logo svelte-19498q");
    			if (img5.src !== (img5_src_value = /*carLogos*/ ctx[0].subaru)) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "Subaru logo");
    			add_location(img5, file$4, 24, 4, 908);
    			attr_dev(div, "class", "cars-serviced__gallery svelte-19498q");
    			add_location(div, file$4, 14, 2, 416);
    			attr_dev(section, "class", "cars-serviced svelte-19498q");
    			attr_dev(section, "id", "cars");
    			add_location(section, file$4, 12, 0, 325);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(pistonheader, section, null);
    			append_dev(section, t0);
    			append_dev(section, div);
    			append_dev(div, img0);
    			append_dev(div, t1);
    			append_dev(div, img1);
    			append_dev(div, t2);
    			append_dev(div, img2);
    			append_dev(div, t3);
    			append_dev(div, img3);
    			append_dev(div, t4);
    			append_dev(div, img4);
    			append_dev(div, t5);
    			append_dev(div, img5);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*carLogos*/ 1 && img0.src !== (img0_src_value = /*carLogos*/ ctx[0].volkswagen)) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if (!current || dirty & /*carLogos*/ 1 && img1.src !== (img1_src_value = /*carLogos*/ ctx[0].honda)) {
    				attr_dev(img1, "src", img1_src_value);
    			}

    			if (!current || dirty & /*carLogos*/ 1 && img2.src !== (img2_src_value = /*carLogos*/ ctx[0].ford)) {
    				attr_dev(img2, "src", img2_src_value);
    			}

    			if (!current || dirty & /*carLogos*/ 1 && img3.src !== (img3_src_value = /*carLogos*/ ctx[0].nissan)) {
    				attr_dev(img3, "src", img3_src_value);
    			}

    			if (!current || dirty & /*carLogos*/ 1 && img4.src !== (img4_src_value = /*carLogos*/ ctx[0].dodge)) {
    				attr_dev(img4, "src", img4_src_value);
    			}

    			if (!current || dirty & /*carLogos*/ 1 && img5.src !== (img5_src_value = /*carLogos*/ ctx[0].subaru)) {
    				attr_dev(img5, "src", img5_src_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pistonheader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pistonheader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(pistonheader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { carLogos = {
    		volkswagen: "./assets/volkswagen.png",
    		honda: "./assets/honda.png",
    		ford: "./assets/ford.png",
    		nissan: "./assets/nissan.png",
    		dodge: "./assets/dodge.png",
    		subaru: "./assets/subaru.png"
    	} } = $$props;

    	const writable_props = ["carLogos"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CarsServiced> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("carLogos" in $$props) $$invalidate(0, carLogos = $$props.carLogos);
    	};

    	$$self.$capture_state = () => {
    		return { carLogos };
    	};

    	$$self.$inject_state = $$props => {
    		if ("carLogos" in $$props) $$invalidate(0, carLogos = $$props.carLogos);
    	};

    	return [carLogos];
    }

    class CarsServiced extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$4, safe_not_equal, { carLogos: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CarsServiced",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get carLogos() {
    		throw new Error("<CarsServiced>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set carLogos(value) {
    		throw new Error("<CarsServiced>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\AboutUs.svelte generated by Svelte v3.16.7 */

    const file$5 = "src\\AboutUs.svelte";

    function create_fragment$5(ctx) {
    	let section;
    	let div1;
    	let div0;
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let a;
    	let span;
    	let t5;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "About Us";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo sit non\r\n        corporis optio quod possimus numquam voluptatem earum molestiae\r\n        accusantium excepturi totam, aut incidunt veniam itaque distinctio\r\n        aliquam culpa sequi neque quam vero vitae officiis dolorum facilis.\r\n        Tempore dolore id fuga pariatur praesentium labore perspiciatis,\r\n        deserunt obcaecati deleniti beatae itaque assumenda sunt voluptates,\r\n        doloribus modi impedit dolorum. Pariatur aperiam, quae nostrum enim\r\n        corrupti perspiciatis maiores sit amet, harum expedita quas voluptates\r\n        possimus perferendis!";
    			t3 = space();
    			a = element("a");
    			span = element("span");
    			span.textContent = "Reviews";
    			t5 = space();
    			img = element("img");
    			attr_dev(h1, "class", "about-us__content__title svelte-vh6jv6");
    			add_location(h1, file$5, 7, 6, 206);
    			attr_dev(p, "class", "about-us__content__text svelte-vh6jv6");
    			add_location(p, file$5, 8, 6, 264);
    			attr_dev(span, "class", "button-slanted-content");
    			add_location(span, file$5, 20, 8, 1031);
    			attr_dev(a, "class", "diagonal-button hero__button");
    			attr_dev(a, "href", "#reviews");
    			add_location(a, file$5, 19, 6, 965);
    			attr_dev(div0, "class", "about-us__content svelte-vh6jv6");
    			add_location(div0, file$5, 6, 4, 167);
    			attr_dev(img, "class", "about-us__img svelte-vh6jv6");
    			if (img.src !== (img_src_value = /*aboutImg*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "mechanic bending over to look under car");
    			add_location(img, file$5, 23, 4, 1112);
    			attr_dev(div1, "class", "about-us__mw d-flex-nw svelte-vh6jv6");
    			add_location(div1, file$5, 5, 2, 125);
    			attr_dev(section, "class", "about-us blue-gradient svelte-vh6jv6");
    			attr_dev(section, "id", "about");
    			add_location(section, file$5, 4, 0, 70);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(div0, t3);
    			append_dev(div0, a);
    			append_dev(a, span);
    			append_dev(div1, t5);
    			append_dev(div1, img);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*aboutImg*/ 1 && img.src !== (img_src_value = /*aboutImg*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { aboutImg = "./assets/img-1.jpg" } = $$props;
    	const writable_props = ["aboutImg"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AboutUs> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("aboutImg" in $$props) $$invalidate(0, aboutImg = $$props.aboutImg);
    	};

    	$$self.$capture_state = () => {
    		return { aboutImg };
    	};

    	$$self.$inject_state = $$props => {
    		if ("aboutImg" in $$props) $$invalidate(0, aboutImg = $$props.aboutImg);
    	};

    	return [aboutImg];
    }

    class AboutUs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$5, safe_not_equal, { aboutImg: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AboutUs",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get aboutImg() {
    		throw new Error("<AboutUs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set aboutImg(value) {
    		throw new Error("<AboutUs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Map.svelte generated by Svelte v3.16.7 */
    const file$6 = "src\\Map.svelte";

    function create_fragment$6(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "map svelte-th00ad");
    			add_location(div, file$6, 17, 0, 332);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			/*div_binding*/ ctx[4](div);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[4](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let container;
    	let map;
    	let zoom = 14;
    	let center = { lat: 37.3385, lng: -121.9534 };

    	onMount(async () => {
    		map = new google.maps.Map(container,
    		{
    				zoom,
    				center,
    				gestureHandling: "none",
    				zoomControl: false
    			});
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(0, container = $$value);
    		});
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("container" in $$props) $$invalidate(0, container = $$props.container);
    		if ("map" in $$props) map = $$props.map;
    		if ("zoom" in $$props) zoom = $$props.zoom;
    		if ("center" in $$props) center = $$props.center;
    	};

    	return [container, map, zoom, center, div_binding];
    }

    class Map$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Map",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\ContactUs.svelte generated by Svelte v3.16.7 */
    const file$7 = "src\\ContactUs.svelte";

    function create_fragment$7(ctx) {
    	let section;
    	let t0;
    	let div2;
    	let div1;
    	let div0;
    	let p0;
    	let b0;
    	let t2;
    	let t3;
    	let p1;
    	let b1;
    	let t5;
    	let t6;
    	let p2;
    	let b2;
    	let t8;
    	let t9;
    	let p3;
    	let t10;
    	let br;
    	let t11;
    	let t12;
    	let current;

    	const pistonheader = new PistonHeader({
    			props: { title: "Contact Us" },
    			$$inline: true
    		});

    	const map = new Map$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(pistonheader.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			b0 = element("b");
    			b0.textContent = "Monday-Friday:";
    			t2 = text("\r\n          9:30am-5:00pm");
    			t3 = space();
    			p1 = element("p");
    			b1 = element("b");
    			b1.textContent = "Saturday:";
    			t5 = text("\r\n          9:30am-3:00pm");
    			t6 = space();
    			p2 = element("p");
    			b2 = element("b");
    			b2.textContent = "Phone:";
    			t8 = text("\r\n        (831)012-3456");
    			t9 = space();
    			p3 = element("p");
    			t10 = text("123 W. Union St\r\n        ");
    			br = element("br");
    			t11 = text("\r\n        Watsonville, CA 95076");
    			t12 = space();
    			create_component(map.$$.fragment);
    			add_location(b0, file$7, 12, 10, 402);
    			add_location(p0, file$7, 11, 8, 387);
    			add_location(b1, file$7, 16, 10, 487);
    			add_location(p1, file$7, 15, 8, 472);
    			attr_dev(div0, "class", "contact__hours");
    			add_location(div0, file$7, 10, 6, 349);
    			add_location(b2, file$7, 21, 8, 600);
    			attr_dev(p2, "class", "contact__phone");
    			add_location(p2, file$7, 20, 6, 564);
    			add_location(br, file$7, 26, 8, 719);
    			attr_dev(p3, "class", "contact__address");
    			add_location(p3, file$7, 24, 6, 656);
    			attr_dev(div1, "class", "contact-us__details svelte-1ukma7x");
    			add_location(div1, file$7, 9, 4, 308);
    			attr_dev(div2, "class", "contact-us__container d-flex-nw svelte-1ukma7x");
    			add_location(div2, file$7, 8, 2, 257);
    			attr_dev(section, "class", "contact-us svelte-1ukma7x");
    			attr_dev(section, "id", "contact-us");
    			add_location(section, file$7, 6, 0, 170);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(pistonheader, section, null);
    			append_dev(section, t0);
    			append_dev(section, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, p0);
    			append_dev(p0, b0);
    			append_dev(p0, t2);
    			append_dev(div0, t3);
    			append_dev(div0, p1);
    			append_dev(p1, b1);
    			append_dev(p1, t5);
    			append_dev(div1, t6);
    			append_dev(div1, p2);
    			append_dev(p2, b2);
    			append_dev(p2, t8);
    			append_dev(div1, t9);
    			append_dev(div1, p3);
    			append_dev(p3, t10);
    			append_dev(p3, br);
    			append_dev(p3, t11);
    			append_dev(div2, t12);
    			mount_component(map, div2, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pistonheader.$$.fragment, local);
    			transition_in(map.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pistonheader.$$.fragment, local);
    			transition_out(map.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(pistonheader);
    			destroy_component(map);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class ContactUs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactUs",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* node_modules\svelte-stars-rating\star-rating.svelte generated by Svelte v3.16.7 */
    const file$8 = "node_modules\\svelte-stars-rating\\star-rating.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    // (119:4) {#each stars as star}
    function create_each_block(ctx) {
    	let svg;
    	let polygon;
    	let polygon_points_value;
    	let defs;
    	let linearGradient;
    	let stop0;
    	let stop0_offset_value;
    	let stop0_stop_color_value;
    	let stop1;
    	let stop1_offset_value;
    	let stop1_stop_color_value;
    	let stop2;
    	let stop2_offset_value;
    	let stop2_stop_color_value;
    	let stop3;
    	let stop3__stop_color_value;
    	let linearGradient_id_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			polygon = svg_element("polygon");
    			defs = svg_element("defs");
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			stop2 = svg_element("stop");
    			stop3 = svg_element("stop");
    			attr_dev(polygon, "points", polygon_points_value = /*getStarPoints*/ ctx[4]());
    			set_style(polygon, "fill-rule", "nonzero");
    			add_location(polygon, file$8, 123, 8, 3065);
    			attr_dev(stop0, "id", "stop1");
    			attr_dev(stop0, "offset", stop0_offset_value = /*star*/ ctx[11].percent);
    			attr_dev(stop0, "stop-opacity", "1");
    			attr_dev(stop0, "stop-color", stop0_stop_color_value = /*getFullFillColor*/ ctx[5](/*star*/ ctx[11]));
    			add_location(stop0, file$8, 126, 12, 3207);
    			attr_dev(stop1, "id", "stop2");
    			attr_dev(stop1, "offset", stop1_offset_value = /*star*/ ctx[11].percent);
    			attr_dev(stop1, "stop-opacity", "0");
    			attr_dev(stop1, "stop-color", stop1_stop_color_value = /*getFullFillColor*/ ctx[5](/*star*/ ctx[11]));
    			add_location(stop1, file$8, 131, 12, 3370);
    			attr_dev(stop2, "id", "stop3");
    			attr_dev(stop2, "offset", stop2_offset_value = /*star*/ ctx[11].percent);
    			attr_dev(stop2, "stop-opacity", "1");
    			attr_dev(stop2, "stop-color", stop2_stop_color_value = /*style*/ ctx[2].styleEmptyStarColor);
    			add_location(stop2, file$8, 136, 12, 3533);
    			attr_dev(stop3, "id", "stop4");
    			attr_dev(stop3, "offset", "100%");
    			attr_dev(stop3, "stop-opacity", "1");
    			attr_dev(stop3, ":stop-color", stop3__stop_color_value = /*style*/ ctx[2].styleEmptyStarColor);
    			add_location(stop3, file$8, 141, 12, 3699);
    			attr_dev(linearGradient, "id", linearGradient_id_value = "gradient" + /*star*/ ctx[11].raw);
    			add_location(linearGradient, file$8, 125, 10, 3154);
    			add_location(defs, file$8, 124, 8, 3137);
    			attr_dev(svg, "class", "star-svg");
    			set_style(svg, "fill", "url(#gradient" + /*star*/ ctx[11].raw + ")");
    			set_style(svg, "height", /*style*/ ctx[2].styleStarWidth);
    			set_style(svg, "width", /*style*/ ctx[2].styleStarWidth);
    			add_location(svg, file$8, 119, 6, 2911);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, polygon);
    			append_dev(svg, defs);
    			append_dev(defs, linearGradient);
    			append_dev(linearGradient, stop0);
    			append_dev(linearGradient, stop1);
    			append_dev(linearGradient, stop2);
    			append_dev(linearGradient, stop3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stars*/ 8 && stop0_offset_value !== (stop0_offset_value = /*star*/ ctx[11].percent)) {
    				attr_dev(stop0, "offset", stop0_offset_value);
    			}

    			if (dirty & /*stars*/ 8 && stop0_stop_color_value !== (stop0_stop_color_value = /*getFullFillColor*/ ctx[5](/*star*/ ctx[11]))) {
    				attr_dev(stop0, "stop-color", stop0_stop_color_value);
    			}

    			if (dirty & /*stars*/ 8 && stop1_offset_value !== (stop1_offset_value = /*star*/ ctx[11].percent)) {
    				attr_dev(stop1, "offset", stop1_offset_value);
    			}

    			if (dirty & /*stars*/ 8 && stop1_stop_color_value !== (stop1_stop_color_value = /*getFullFillColor*/ ctx[5](/*star*/ ctx[11]))) {
    				attr_dev(stop1, "stop-color", stop1_stop_color_value);
    			}

    			if (dirty & /*stars*/ 8 && stop2_offset_value !== (stop2_offset_value = /*star*/ ctx[11].percent)) {
    				attr_dev(stop2, "offset", stop2_offset_value);
    			}

    			if (dirty & /*style*/ 4 && stop2_stop_color_value !== (stop2_stop_color_value = /*style*/ ctx[2].styleEmptyStarColor)) {
    				attr_dev(stop2, "stop-color", stop2_stop_color_value);
    			}

    			if (dirty & /*style*/ 4 && stop3__stop_color_value !== (stop3__stop_color_value = /*style*/ ctx[2].styleEmptyStarColor)) {
    				attr_dev(stop3, ":stop-color", stop3__stop_color_value);
    			}

    			if (dirty & /*stars*/ 8 && linearGradient_id_value !== (linearGradient_id_value = "gradient" + /*star*/ ctx[11].raw)) {
    				attr_dev(linearGradient, "id", linearGradient_id_value);
    			}

    			if (dirty & /*stars*/ 8) {
    				set_style(svg, "fill", "url(#gradient" + /*star*/ ctx[11].raw + ")");
    			}

    			if (dirty & /*style*/ 4) {
    				set_style(svg, "height", /*style*/ ctx[2].styleStarWidth);
    			}

    			if (dirty & /*style*/ 4) {
    				set_style(svg, "width", /*style*/ ctx[2].styleStarWidth);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(119:4) {#each stars as star}",
    		ctx
    	});

    	return block;
    }

    // (151:4) {#if isIndicatorActive}
    function create_if_block(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*rating*/ ctx[0]);
    			attr_dev(div, "class", "indicator svelte-p3zdxf");
    			add_location(div, file$8, 151, 6, 3949);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rating*/ 1) set_data_dev(t, /*rating*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(151:4) {#if isIndicatorActive}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let each_value = /*stars*/ ctx[3];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	let if_block = /*isIndicatorActive*/ ctx[1] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "star-rating svelte-p3zdxf");
    			add_location(div0, file$8, 117, 2, 2853);
    			attr_dev(div1, "class", "star-container svelte-p3zdxf");
    			add_location(div1, file$8, 116, 0, 2822);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div0, t);
    			if (if_block) if_block.m(div0, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*stars, style, getFullFillColor, getStarPoints*/ 60) {
    				each_value = /*stars*/ ctx[3];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (/*isIndicatorActive*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function calcStarPoints(centerX, centerY, innerCircleArms, innerRadius, outerRadius) {
    	let angle = Math.PI / innerCircleArms;
    	let angleOffsetToCenterStar = 60;
    	let totalArms = innerCircleArms * 2;
    	let points = "";

    	for (let i = 0; i < totalArms; i++) {
    		let isEvenIndex = i % 2 == 0;
    		let r = isEvenIndex ? outerRadius : innerRadius;
    		let currX = centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r;
    		let currY = centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r;
    		points += currX + "," + currY + " ";
    	}

    	return points;
    }

    function calcStarFullness(starData) {
    	let starFullnessPercent = starData.raw * 100 + "%";
    	return starFullnessPercent;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { rating = 0 } = $$props;
    	let { isIndicatorActive = true } = $$props;

    	let { style = {
    		styleStarWidth: 50,
    		styleEmptyStarColor: "#737373",
    		styleFullStarColor: "#ffd219"
    	} } = $$props;

    	let emptyStar = 0;
    	let fullStar = 1;
    	let totalStars = 5;
    	let stars = [];

    	function getStarPoints() {
    		let centerX = style.styleStarWidth / 2;
    		let centerY = style.styleStarWidth / 2;
    		let innerCircleArms = 5;
    		let innerRadius = style.styleStarWidth / innerCircleArms;
    		let innerOuterRadiusRatio = 2.5;
    		let outerRadius = innerRadius * innerOuterRadiusRatio;
    		return calcStarPoints(centerX, centerY, innerCircleArms, innerRadius, outerRadius);
    	}

    	function initStars() {
    		for (let i = 0; i < totalStars; i++) {
    			stars.push({ raw: emptyStar, percent: emptyStar + "%" });
    		}
    	}

    	function setStars() {
    		let fullStarsCounter = Math.floor(rating);

    		for (let i = 0; i < stars.length; i++) {
    			if (fullStarsCounter !== 0) {
    				$$invalidate(3, stars[i].raw = fullStar, stars);
    				$$invalidate(3, stars[i].percent = calcStarFullness(stars[i]), stars);
    				fullStarsCounter--;
    			} else {
    				let surplus = Math.round(rating % 1 * 10) / 10;
    				let roundedOneDecimalPoint = Math.round(surplus * 10) / 10;
    				$$invalidate(3, stars[i].raw = roundedOneDecimalPoint, stars);
    				return $$invalidate(3, stars[i].percent = calcStarFullness(stars[i]), stars);
    			}
    		}
    	}

    	function getFullFillColor(starData) {
    		return starData.raw !== emptyStar
    		? style.styleFullStarColor
    		: style.styleEmptyStarColor;
    	}

    	onMount(() => {
    		initStars();
    		setStars();
    	});

    	const writable_props = ["rating", "isIndicatorActive", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Star_rating> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("rating" in $$props) $$invalidate(0, rating = $$props.rating);
    		if ("isIndicatorActive" in $$props) $$invalidate(1, isIndicatorActive = $$props.isIndicatorActive);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    	};

    	$$self.$capture_state = () => {
    		return {
    			rating,
    			isIndicatorActive,
    			style,
    			emptyStar,
    			fullStar,
    			totalStars,
    			stars
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("rating" in $$props) $$invalidate(0, rating = $$props.rating);
    		if ("isIndicatorActive" in $$props) $$invalidate(1, isIndicatorActive = $$props.isIndicatorActive);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("emptyStar" in $$props) emptyStar = $$props.emptyStar;
    		if ("fullStar" in $$props) fullStar = $$props.fullStar;
    		if ("totalStars" in $$props) totalStars = $$props.totalStars;
    		if ("stars" in $$props) $$invalidate(3, stars = $$props.stars);
    	};

    	return [rating, isIndicatorActive, style, stars, getStarPoints, getFullFillColor];
    }

    class Star_rating extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$8, safe_not_equal, {
    			rating: 0,
    			isIndicatorActive: 1,
    			style: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Star_rating",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get rating() {
    		throw new Error("<Star_rating>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rating(value) {
    		throw new Error("<Star_rating>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isIndicatorActive() {
    		throw new Error("<Star_rating>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isIndicatorActive(value) {
    		throw new Error("<Star_rating>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Star_rating>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Star_rating>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Review.svelte generated by Svelte v3.16.7 */
    const file$9 = "src\\Review.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let p;
    	let t0;
    	let t1;
    	let t2;
    	let h3;
    	let t3;
    	let current;

    	const starrating = new Star_rating({
    			props: {
    				rating: /*rating*/ ctx[2],
    				style: /*style*/ ctx[4],
    				isIndicatorActive: /*isIndicatorActive*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text(/*reviewParagraph*/ ctx[1]);
    			t1 = space();
    			create_component(starrating.$$.fragment);
    			t2 = space();
    			h3 = element("h3");
    			t3 = text(/*reviewerName*/ ctx[0]);
    			attr_dev(p, "class", "review__text svelte-69oahw");
    			add_location(p, file$9, 17, 2, 634);
    			attr_dev(h3, "class", "review__title svelte-69oahw");
    			add_location(h3, file$9, 21, 2, 748);
    			attr_dev(div, "class", "review blue-gradient svelte-69oahw");
    			add_location(div, file$9, 16, 0, 596);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(div, t1);
    			mount_component(starrating, div, null);
    			append_dev(div, t2);
    			append_dev(div, h3);
    			append_dev(h3, t3);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*reviewParagraph*/ 2) set_data_dev(t0, /*reviewParagraph*/ ctx[1]);
    			const starrating_changes = {};
    			if (dirty & /*rating*/ 4) starrating_changes.rating = /*rating*/ ctx[2];
    			starrating.$set(starrating_changes);
    			if (!current || dirty & /*reviewerName*/ 1) set_data_dev(t3, /*reviewerName*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(starrating.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(starrating.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(starrating);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { reviewerName = "Persons Name" } = $$props;
    	let { reviewParagraph = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio veniamquasi iure doloremque enim dolore maxime omnis labore voluptate,reiciendis nesciunt! Labore itaque quod atque ipsam possimus dicta nihilpariatur. At odio vel accusamus accusantium?" } = $$props;
    	let { rating = "3.5" } = $$props;
    	let isIndicatorActive = false;

    	let style = {
    		styleStarWidth: 18,
    		styleEmptyStarColor: "#d4d4d4",
    		styleFullStarColor: "#ffd219"
    	};

    	const writable_props = ["reviewerName", "reviewParagraph", "rating"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Review> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("reviewerName" in $$props) $$invalidate(0, reviewerName = $$props.reviewerName);
    		if ("reviewParagraph" in $$props) $$invalidate(1, reviewParagraph = $$props.reviewParagraph);
    		if ("rating" in $$props) $$invalidate(2, rating = $$props.rating);
    	};

    	$$self.$capture_state = () => {
    		return {
    			reviewerName,
    			reviewParagraph,
    			rating,
    			isIndicatorActive,
    			style
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("reviewerName" in $$props) $$invalidate(0, reviewerName = $$props.reviewerName);
    		if ("reviewParagraph" in $$props) $$invalidate(1, reviewParagraph = $$props.reviewParagraph);
    		if ("rating" in $$props) $$invalidate(2, rating = $$props.rating);
    		if ("isIndicatorActive" in $$props) $$invalidate(3, isIndicatorActive = $$props.isIndicatorActive);
    		if ("style" in $$props) $$invalidate(4, style = $$props.style);
    	};

    	return [reviewerName, reviewParagraph, rating, isIndicatorActive, style];
    }

    class Review extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$9, safe_not_equal, {
    			reviewerName: 0,
    			reviewParagraph: 1,
    			rating: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Review",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get reviewerName() {
    		throw new Error("<Review>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set reviewerName(value) {
    		throw new Error("<Review>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get reviewParagraph() {
    		throw new Error("<Review>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set reviewParagraph(value) {
    		throw new Error("<Review>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rating() {
    		throw new Error("<Review>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rating(value) {
    		throw new Error("<Review>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Reviews.svelte generated by Svelte v3.16.7 */
    const file$a = "src\\Reviews.svelte";

    function create_fragment$a(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let current;

    	const pistonheader = new PistonHeader({
    			props: { title: "Reviews" },
    			$$inline: true
    		});

    	const review0 = new Review({
    			props: {
    				reviewerName: "Alex Garcia",
    				rating: "4.2"
    			},
    			$$inline: true
    		});

    	const review1 = new Review({
    			props: {
    				rating: "3.5",
    				reviewerName: "Sooz Garcia"
    			},
    			$$inline: true
    		});

    	const review2 = new Review({ props: { rating: "4.8" }, $$inline: true });
    	const review3 = new Review({ props: { rating: "4.8" }, $$inline: true });
    	const review4 = new Review({ props: { rating: "4.4" }, $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(pistonheader.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(review0.$$.fragment);
    			t1 = space();
    			create_component(review1.$$.fragment);
    			t2 = space();
    			create_component(review2.$$.fragment);
    			t3 = space();
    			create_component(review3.$$.fragment);
    			t4 = space();
    			create_component(review4.$$.fragment);
    			attr_dev(div0, "class", "reviews-container svelte-bcwoar");
    			add_location(div0, file$a, 7, 2, 191);
    			attr_dev(div1, "class", "reviews svelte-bcwoar");
    			attr_dev(div1, "id", "reviews");
    			add_location(div1, file$a, 5, 0, 117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(pistonheader, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			mount_component(review0, div0, null);
    			append_dev(div0, t1);
    			mount_component(review1, div0, null);
    			append_dev(div0, t2);
    			mount_component(review2, div0, null);
    			append_dev(div0, t3);
    			mount_component(review3, div0, null);
    			append_dev(div0, t4);
    			mount_component(review4, div0, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pistonheader.$$.fragment, local);
    			transition_in(review0.$$.fragment, local);
    			transition_in(review1.$$.fragment, local);
    			transition_in(review2.$$.fragment, local);
    			transition_in(review3.$$.fragment, local);
    			transition_in(review4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pistonheader.$$.fragment, local);
    			transition_out(review0.$$.fragment, local);
    			transition_out(review1.$$.fragment, local);
    			transition_out(review2.$$.fragment, local);
    			transition_out(review3.$$.fragment, local);
    			transition_out(review4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(pistonheader);
    			destroy_component(review0);
    			destroy_component(review1);
    			destroy_component(review2);
    			destroy_component(review3);
    			destroy_component(review4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Reviews extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Reviews",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\Footer.svelte generated by Svelte v3.16.7 */

    const file$b = "src\\Footer.svelte";

    function create_fragment$b(ctx) {
    	let footer;
    	let div;
    	let ul;
    	let li0;
    	let a0;
    	let t1;
    	let li1;
    	let a1;
    	let t3;
    	let li2;
    	let a2;
    	let t5;
    	let li3;
    	let a3;
    	let t7;
    	let li4;
    	let a4;
    	let t9;
    	let li5;
    	let a5;
    	let t11;
    	let li6;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Home";
    			t1 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Services";
    			t3 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "What We Service";
    			t5 = space();
    			li3 = element("li");
    			a3 = element("a");
    			a3.textContent = "About";
    			t7 = space();
    			li4 = element("li");
    			a4 = element("a");
    			a4.textContent = "Contact";
    			t9 = space();
    			li5 = element("li");
    			a5 = element("a");
    			a5.textContent = "Reviews";
    			t11 = space();
    			li6 = element("li");
    			li6.textContent = "Designed by Alejandro Garcia";
    			attr_dev(a0, "href", "#hero");
    			attr_dev(a0, "class", "footer__nav__item svelte-1m1esp7");
    			add_location(a0, file$b, 6, 10, 130);
    			add_location(li0, file$b, 6, 6, 126);
    			attr_dev(a1, "href", "#services");
    			attr_dev(a1, "class", "footer__nav__item svelte-1m1esp7");
    			add_location(a1, file$b, 7, 10, 197);
    			add_location(li1, file$b, 7, 6, 193);
    			attr_dev(a2, "href", "#cars");
    			attr_dev(a2, "class", "footer__nav__item svelte-1m1esp7");
    			add_location(a2, file$b, 8, 10, 272);
    			add_location(li2, file$b, 8, 6, 268);
    			attr_dev(a3, "href", "#about");
    			attr_dev(a3, "class", "footer__nav__item svelte-1m1esp7");
    			add_location(a3, file$b, 9, 10, 350);
    			add_location(li3, file$b, 9, 6, 346);
    			attr_dev(a4, "href", "#contact-us");
    			attr_dev(a4, "class", "footer__nav__item svelte-1m1esp7");
    			add_location(a4, file$b, 10, 10, 419);
    			add_location(li4, file$b, 10, 6, 415);
    			attr_dev(a5, "href", "#reviews");
    			attr_dev(a5, "class", "footer__nav__item svelte-1m1esp7");
    			add_location(a5, file$b, 11, 10, 495);
    			add_location(li5, file$b, 11, 6, 491);
    			attr_dev(li6, "class", "designer-tag svelte-1m1esp7");
    			add_location(li6, file$b, 12, 6, 564);
    			attr_dev(ul, "class", "footer__nav");
    			add_location(ul, file$b, 5, 4, 94);
    			attr_dev(div, "class", "footer__mw svelte-1m1esp7");
    			add_location(div, file$b, 4, 2, 64);
    			attr_dev(footer, "class", "footer blue-gradient svelte-1m1esp7");
    			add_location(footer, file$b, 3, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div);
    			append_dev(div, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t1);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t3);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(ul, t5);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    			append_dev(ul, t7);
    			append_dev(ul, li4);
    			append_dev(li4, a4);
    			append_dev(ul, t9);
    			append_dev(ul, li5);
    			append_dev(li5, a5);
    			append_dev(ul, t11);
    			append_dev(ul, li6);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\Navigation.svelte generated by Svelte v3.16.7 */

    const file$c = "src\\Navigation.svelte";

    function create_fragment$c(ctx) {
    	let nav;
    	let div;
    	let input;
    	let t0;
    	let span0;
    	let t1;
    	let span1;
    	let t2;
    	let span2;
    	let t3;
    	let ul;
    	let li0;
    	let a0;
    	let t5;
    	let li1;
    	let a1;
    	let t7;
    	let li2;
    	let a2;
    	let t9;
    	let li3;
    	let a3;
    	let t11;
    	let li4;
    	let a4;
    	let t13;
    	let li5;
    	let a5;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div = element("div");
    			input = element("input");
    			t0 = space();
    			span0 = element("span");
    			t1 = space();
    			span1 = element("span");
    			t2 = space();
    			span2 = element("span");
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Home";
    			t5 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Services";
    			t7 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "What We Service";
    			t9 = space();
    			li3 = element("li");
    			a3 = element("a");
    			a3.textContent = "About";
    			t11 = space();
    			li4 = element("li");
    			a4 = element("a");
    			a4.textContent = "Contact";
    			t13 = space();
    			li5 = element("li");
    			a5 = element("a");
    			a5.textContent = "Reviews";
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "class", "svelte-1mpwzlh");
    			add_location(input, file$c, 5, 4, 92);
    			attr_dev(span0, "class", "svelte-1mpwzlh");
    			add_location(span0, file$c, 7, 4, 164);
    			attr_dev(span1, "class", "svelte-1mpwzlh");
    			add_location(span1, file$c, 8, 4, 178);
    			attr_dev(span2, "class", "svelte-1mpwzlh");
    			add_location(span2, file$c, 9, 4, 192);
    			attr_dev(a0, "href", "#hero");
    			attr_dev(a0, "class", "svelte-1mpwzlh");
    			add_location(a0, file$c, 12, 10, 270);
    			attr_dev(li0, "class", "svelte-1mpwzlh");
    			add_location(li0, file$c, 12, 6, 266);
    			attr_dev(a1, "href", "#services");
    			attr_dev(a1, "class", "svelte-1mpwzlh");
    			add_location(a1, file$c, 13, 10, 311);
    			attr_dev(li1, "class", "svelte-1mpwzlh");
    			add_location(li1, file$c, 13, 6, 307);
    			attr_dev(a2, "href", "#cars");
    			attr_dev(a2, "class", "svelte-1mpwzlh");
    			add_location(a2, file$c, 14, 10, 360);
    			attr_dev(li2, "class", "svelte-1mpwzlh");
    			add_location(li2, file$c, 14, 6, 356);
    			attr_dev(a3, "href", "#about");
    			attr_dev(a3, "class", "svelte-1mpwzlh");
    			add_location(a3, file$c, 15, 10, 412);
    			attr_dev(li3, "class", "svelte-1mpwzlh");
    			add_location(li3, file$c, 15, 6, 408);
    			attr_dev(a4, "href", "#contact-us");
    			attr_dev(a4, "class", "svelte-1mpwzlh");
    			add_location(a4, file$c, 16, 10, 455);
    			attr_dev(li4, "class", "svelte-1mpwzlh");
    			add_location(li4, file$c, 16, 6, 451);
    			attr_dev(a5, "href", "#reviews");
    			attr_dev(a5, "class", "svelte-1mpwzlh");
    			add_location(a5, file$c, 17, 10, 505);
    			attr_dev(li5, "class", "svelte-1mpwzlh");
    			add_location(li5, file$c, 17, 6, 501);
    			attr_dev(ul, "class", "menu blue-gradient svelte-1mpwzlh");
    			attr_dev(ul, "aria-hidden", "”true”");
    			add_location(ul, file$c, 11, 4, 208);
    			attr_dev(div, "class", "menuToggle svelte-1mpwzlh");
    			add_location(div, file$c, 4, 2, 62);
    			attr_dev(nav, "class", "nav svelte-1mpwzlh");
    			attr_dev(nav, "role", "navigation");
    			add_location(nav, file$c, 3, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div);
    			append_dev(div, input);
    			append_dev(div, t0);
    			append_dev(div, span0);
    			append_dev(div, t1);
    			append_dev(div, span1);
    			append_dev(div, t2);
    			append_dev(div, span2);
    			append_dev(div, t3);
    			append_dev(div, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(ul, t9);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    			append_dev(ul, t11);
    			append_dev(ul, li4);
    			append_dev(li4, a4);
    			append_dev(ul, t13);
    			append_dev(ul, li5);
    			append_dev(li5, a5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Navigation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navigation",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.16.7 */
    const file$d = "src\\App.svelte";

    // (29:0) {#if ready}
    function create_if_block$1(ctx) {
    	let current;
    	const contactus = new ContactUs({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(contactus.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contactus, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contactus.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contactus.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contactus, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(29:0) {#if ready}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let script;
    	let script_src_value;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let hr0;
    	let t4;
    	let t5;
    	let hr1;
    	let t6;
    	let t7;
    	let t8;
    	let hr2;
    	let t9;
    	let t10;
    	let hr3;
    	let t11;
    	let current;
    	const nav = new Navigation({ $$inline: true });
    	const landingarea = new LandingArea({ $$inline: true });
    	const mechanicservices = new MechanicServices({ $$inline: true });
    	const carsserviced = new CarsServiced({ $$inline: true });
    	const aboutus = new AboutUs({ $$inline: true });
    	let if_block = /*ready*/ ctx[0] && create_if_block$1(ctx);
    	const reviews = new Reviews({ $$inline: true });
    	const footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			script = element("script");
    			t0 = space();
    			create_component(nav.$$.fragment);
    			t1 = space();
    			create_component(landingarea.$$.fragment);
    			t2 = space();
    			create_component(mechanicservices.$$.fragment);
    			t3 = space();
    			hr0 = element("hr");
    			t4 = space();
    			create_component(carsserviced.$$.fragment);
    			t5 = space();
    			hr1 = element("hr");
    			t6 = space();
    			create_component(aboutus.$$.fragment);
    			t7 = space();
    			if (if_block) if_block.c();
    			t8 = space();
    			hr2 = element("hr");
    			t9 = space();
    			create_component(reviews.$$.fragment);
    			t10 = space();
    			hr3 = element("hr");
    			t11 = space();
    			create_component(footer.$$.fragment);
    			script.defer = true;
    			script.async = true;
    			if (script.src !== (script_src_value = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBhnRVZfDUED8k2cFQjT8FluYWed5qrzFo&callback=initMap")) attr_dev(script, "src", script_src_value);
    			add_location(script, file$d, 14, 2, 444);
    			add_location(hr0, file$d, 24, 0, 667);
    			add_location(hr1, file$d, 26, 0, 693);
    			add_location(hr2, file$d, 31, 0, 751);
    			add_location(hr3, file$d, 33, 0, 772);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, script);
    			insert_dev(target, t0, anchor);
    			mount_component(nav, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(landingarea, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(mechanicservices, target, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, hr0, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(carsserviced, target, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, hr1, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(aboutus, target, anchor);
    			insert_dev(target, t7, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, hr2, anchor);
    			insert_dev(target, t9, anchor);
    			mount_component(reviews, target, anchor);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, hr3, anchor);
    			insert_dev(target, t11, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ready*/ ctx[0]) {
    				if (!if_block) {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t8.parentNode, t8);
    				} else {
    					transition_in(if_block, 1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			transition_in(landingarea.$$.fragment, local);
    			transition_in(mechanicservices.$$.fragment, local);
    			transition_in(carsserviced.$$.fragment, local);
    			transition_in(aboutus.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(reviews.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(landingarea.$$.fragment, local);
    			transition_out(mechanicservices.$$.fragment, local);
    			transition_out(carsserviced.$$.fragment, local);
    			transition_out(aboutus.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(reviews.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(script);
    			if (detaching) detach_dev(t0);
    			destroy_component(nav, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(landingarea, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(mechanicservices, detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(hr0);
    			if (detaching) detach_dev(t4);
    			destroy_component(carsserviced, detaching);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(hr1);
    			if (detaching) detach_dev(t6);
    			destroy_component(aboutus, detaching);
    			if (detaching) detach_dev(t7);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(hr2);
    			if (detaching) detach_dev(t9);
    			destroy_component(reviews, detaching);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(hr3);
    			if (detaching) detach_dev(t11);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { ready } = $$props;
    	const writable_props = ["ready"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("ready" in $$props) $$invalidate(0, ready = $$props.ready);
    	};

    	$$self.$capture_state = () => {
    		return { ready };
    	};

    	$$self.$inject_state = $$props => {
    		if ("ready" in $$props) $$invalidate(0, ready = $$props.ready);
    	};

    	return [ready];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$d, safe_not_equal, { ready: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*ready*/ ctx[0] === undefined && !("ready" in props)) {
    			console.warn("<App> was created without expected prop 'ready'");
    		}
    	}

    	get ready() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ready(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		ready: false,
    	}
    });

    window.initMap = function ready() {
    	app.$set({ ready: true });
    };

    return app;

}());
//# sourceMappingURL=bundle.js.map
