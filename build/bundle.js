
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
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
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
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
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
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
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
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
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
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
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
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
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
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
    /**
     * Base class for Svelte components. Used when dev=false.
     */
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
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\App.svelte generated by Svelte v3.32.0 */

    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let meta;
    	let t0;
    	let main;
    	let header;
    	let h10;
    	let t2;
    	let section0;
    	let form;
    	let table;
    	let tr0;
    	let td0;
    	let p0;
    	let t4;
    	let td1;
    	let input0;
    	let t5;
    	let td2;
    	let p1;
    	let t7;
    	let tr1;
    	let td3;
    	let p2;
    	let t9;
    	let td4;
    	let input1;
    	let t10;
    	let td5;
    	let p3;
    	let t12;
    	let tr2;
    	let td6;
    	let p4;
    	let t14;
    	let td7;
    	let input2;
    	let t15;
    	let td8;
    	let p5;
    	let t17;
    	let section1;
    	let h11;
    	let t18;
    	let span;

    	let t19_value = (/*finalWeightDecimal*/ ctx[3] === 0
    	? "Anything"
    	: /*mustScore*/ ctx[5] + "%") + "";

    	let t19;
    	let t20;
    	let t21;
    	let footer;
    	let a;
    	let p6;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			meta = element("meta");
    			t0 = space();
    			main = element("main");
    			header = element("header");
    			h10 = element("h1");
    			h10.textContent = "Final Grade Calculator";
    			t2 = space();
    			section0 = element("section");
    			form = element("form");
    			table = element("table");
    			tr0 = element("tr");
    			td0 = element("td");
    			p0 = element("p");
    			p0.textContent = "My current grade is";
    			t4 = space();
    			td1 = element("td");
    			input0 = element("input");
    			t5 = space();
    			td2 = element("td");
    			p1 = element("p");
    			p1.textContent = "%";
    			t7 = space();
    			tr1 = element("tr");
    			td3 = element("td");
    			p2 = element("p");
    			p2.textContent = "The grade I want is";
    			t9 = space();
    			td4 = element("td");
    			input1 = element("input");
    			t10 = space();
    			td5 = element("td");
    			p3 = element("p");
    			p3.textContent = "%";
    			t12 = space();
    			tr2 = element("tr");
    			td6 = element("td");
    			p4 = element("p");
    			p4.textContent = "My final is worth";
    			t14 = space();
    			td7 = element("td");
    			input2 = element("input");
    			t15 = space();
    			td8 = element("td");
    			p5 = element("p");
    			p5.textContent = "%";
    			t17 = space();
    			section1 = element("section");
    			h11 = element("h1");
    			t18 = text("Your must score at least ");
    			span = element("span");
    			t19 = text(t19_value);
    			t20 = text("!");
    			t21 = space();
    			footer = element("footer");
    			a = element("a");
    			p6 = element("p");
    			p6.textContent = "Hussein Elguindi";
    			document.title = "Final Grade Calculator";
    			attr_dev(meta, "name", "theme-color");
    			attr_dev(meta, "content", "#4285f4");
    			add_location(meta, file, 47, 1, 1227);
    			attr_dev(h10, "class", "svelte-thyvjx");
    			add_location(h10, file, 52, 2, 1307);
    			attr_dev(header, "class", "svelte-thyvjx");
    			add_location(header, file, 51, 1, 1296);
    			attr_dev(p0, "class", "svelte-thyvjx");
    			add_location(p0, file, 59, 9, 1448);
    			attr_dev(td0, "class", "svelte-thyvjx");
    			add_location(td0, file, 59, 5, 1444);
    			attr_dev(input0, "name", "currGrade");
    			attr_dev(input0, "inputmode", "decimal");
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "label", "Current grade");
    			attr_dev(input0, "class", "grade svelte-thyvjx");
    			attr_dev(input0, "placeholder", "0");
    			attr_dev(input0, "autocomplete", "off");
    			add_location(input0, file, 60, 9, 1489);
    			attr_dev(td1, "class", "svelte-thyvjx");
    			add_location(td1, file, 60, 5, 1485);
    			attr_dev(p1, "class", "svelte-thyvjx");
    			add_location(p1, file, 61, 9, 1687);
    			attr_dev(td2, "class", "svelte-thyvjx");
    			add_location(td2, file, 61, 5, 1683);
    			attr_dev(tr0, "class", "svelte-thyvjx");
    			add_location(tr0, file, 58, 4, 1434);
    			attr_dev(p2, "class", "svelte-thyvjx");
    			add_location(p2, file, 64, 9, 1729);
    			attr_dev(td3, "class", "svelte-thyvjx");
    			add_location(td3, file, 64, 5, 1725);
    			attr_dev(input1, "name", "wantGrade");
    			attr_dev(input1, "inputmode", "decimal");
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "label", "Target grade");
    			attr_dev(input1, "class", "grade svelte-thyvjx");
    			attr_dev(input1, "placeholder", "0");
    			attr_dev(input1, "autocomplete", "off");
    			add_location(input1, file, 65, 9, 1770);
    			attr_dev(td4, "class", "svelte-thyvjx");
    			add_location(td4, file, 65, 5, 1766);
    			attr_dev(p3, "class", "svelte-thyvjx");
    			add_location(p3, file, 66, 9, 1967);
    			attr_dev(td5, "class", "svelte-thyvjx");
    			add_location(td5, file, 66, 5, 1963);
    			attr_dev(tr1, "class", "svelte-thyvjx");
    			add_location(tr1, file, 63, 4, 1715);
    			attr_dev(p4, "class", "svelte-thyvjx");
    			add_location(p4, file, 69, 9, 2009);
    			attr_dev(td6, "class", "svelte-thyvjx");
    			add_location(td6, file, 69, 5, 2005);
    			attr_dev(input2, "name", "finalWeight");
    			attr_dev(input2, "inputmode", "decimal");
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "label", "Worth of final");
    			attr_dev(input2, "class", "grade svelte-thyvjx");
    			attr_dev(input2, "placeholder", "0");
    			attr_dev(input2, "autocomplete", "off");
    			add_location(input2, file, 70, 9, 2048);
    			attr_dev(td7, "class", "svelte-thyvjx");
    			add_location(td7, file, 70, 5, 2044);
    			attr_dev(p5, "class", "svelte-thyvjx");
    			add_location(p5, file, 71, 9, 2251);
    			attr_dev(td8, "class", "svelte-thyvjx");
    			add_location(td8, file, 71, 5, 2247);
    			attr_dev(tr2, "class", "svelte-thyvjx");
    			add_location(tr2, file, 68, 4, 1995);
    			attr_dev(table, "class", "form svelte-thyvjx");
    			add_location(table, file, 57, 3, 1409);
    			add_location(form, file, 56, 2, 1377);
    			attr_dev(section0, "class", "main svelte-thyvjx");
    			add_location(section0, file, 55, 1, 1352);
    			attr_dev(span, "class", "grade svelte-thyvjx");
    			add_location(span, file, 78, 31, 2367);
    			attr_dev(h11, "class", "svelte-thyvjx");
    			add_location(h11, file, 78, 2, 2338);
    			attr_dev(section1, "class", "result svelte-thyvjx");
    			add_location(section1, file, 77, 1, 2311);
    			attr_dev(p6, "class", "svelte-thyvjx");
    			add_location(p6, file, 82, 88, 2571);
    			attr_dev(a, "href", "https://HusseinElguindi.github.io");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener noreferrer");
    			attr_dev(a, "class", "svelte-thyvjx");
    			add_location(a, file, 82, 2, 2485);
    			attr_dev(footer, "class", "svelte-thyvjx");
    			add_location(footer, file, 81, 1, 2474);
    			attr_dev(main, "class", "svelte-thyvjx");
    			add_location(main, file, 50, 0, 1288);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, header);
    			append_dev(header, h10);
    			append_dev(main, t2);
    			append_dev(main, section0);
    			append_dev(section0, form);
    			append_dev(form, table);
    			append_dev(table, tr0);
    			append_dev(tr0, td0);
    			append_dev(td0, p0);
    			append_dev(tr0, t4);
    			append_dev(tr0, td1);
    			append_dev(td1, input0);
    			set_input_value(input0, /*currGrade*/ ctx[0]);
    			append_dev(tr0, t5);
    			append_dev(tr0, td2);
    			append_dev(td2, p1);
    			append_dev(table, t7);
    			append_dev(table, tr1);
    			append_dev(tr1, td3);
    			append_dev(td3, p2);
    			append_dev(tr1, t9);
    			append_dev(tr1, td4);
    			append_dev(td4, input1);
    			set_input_value(input1, /*wantGrade*/ ctx[1]);
    			append_dev(tr1, t10);
    			append_dev(tr1, td5);
    			append_dev(td5, p3);
    			append_dev(table, t12);
    			append_dev(table, tr2);
    			append_dev(tr2, td6);
    			append_dev(td6, p4);
    			append_dev(tr2, t14);
    			append_dev(tr2, td7);
    			append_dev(td7, input2);
    			set_input_value(input2, /*finalWeight*/ ctx[2]);
    			append_dev(tr2, t15);
    			append_dev(tr2, td8);
    			append_dev(td8, p5);
    			/*form_binding*/ ctx[10](form);
    			append_dev(main, t17);
    			append_dev(main, section1);
    			append_dev(section1, h11);
    			append_dev(h11, t18);
    			append_dev(h11, span);
    			append_dev(span, t19);
    			append_dev(h11, t20);
    			append_dev(main, t21);
    			append_dev(main, footer);
    			append_dev(footer, a);
    			append_dev(a, p6);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "keydown", /*gradeInputKeyDown*/ ctx[6], false, false, false),
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[7]),
    					listen_dev(input1, "keydown", /*gradeInputKeyDown*/ ctx[6], false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[8]),
    					listen_dev(input2, "keydown", /*gradeInputKeyDown*/ ctx[6], false, false, false),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[9])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*currGrade*/ 1 && to_number(input0.value) !== /*currGrade*/ ctx[0]) {
    				set_input_value(input0, /*currGrade*/ ctx[0]);
    			}

    			if (dirty & /*wantGrade*/ 2 && to_number(input1.value) !== /*wantGrade*/ ctx[1]) {
    				set_input_value(input1, /*wantGrade*/ ctx[1]);
    			}

    			if (dirty & /*finalWeight*/ 4 && to_number(input2.value) !== /*finalWeight*/ ctx[2]) {
    				set_input_value(input2, /*finalWeight*/ ctx[2]);
    			}

    			if (dirty & /*finalWeightDecimal, mustScore*/ 40 && t19_value !== (t19_value = (/*finalWeightDecimal*/ ctx[3] === 0
    			? "Anything"
    			: /*mustScore*/ ctx[5] + "%") + "")) set_data_dev(t19, t19_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(meta);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			/*form_binding*/ ctx[10](null);
    			mounted = false;
    			run_all(dispose);
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

    function instance($$self, $$props, $$invalidate) {
    	let finalWeightDecimal;
    	let mustScore;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let currGrade;
    	let wantGrade;
    	let finalWeight;

    	const roundGrade = num => {
    		return Math.round((num + Number.EPSILON) * 100) / 100;
    	};

    	// handle going to prev/next field on backspace/enter
    	let gradeForm;

    	const gradeInputKeyDown = e => {
    		let backwardForm = e.code === "Backspace" && !e.target.validity.badInput && e.target.value.length <= 0;
    		let forwardForm = e.code === "Enter";
    		if (!backwardForm && !forwardForm) return;
    		let index = -1;

    		for (let i = 0; i < gradeForm.elements.length; i++) {
    			if (gradeForm.elements[i].name === e.target.name) {
    				index = i;
    				break;
    			}
    		}

    		if (index < 0) return;

    		if (forwardForm) {
    			if (++index >= gradeForm.elements.length) {
    				// close soft keyboard and remove focus
    				e.target.blur();

    				return;
    			}

    			// go to next input
    			gradeForm.elements[index].focus();
    		} else if (backwardForm) {
    			if (--index >= 0) {
    				gradeForm.elements[index].focus();
    				e.preventDefault();
    			}
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		currGrade = to_number(this.value);
    		$$invalidate(0, currGrade);
    	}

    	function input1_input_handler() {
    		wantGrade = to_number(this.value);
    		$$invalidate(1, wantGrade);
    	}

    	function input2_input_handler() {
    		finalWeight = to_number(this.value);
    		$$invalidate(2, finalWeight);
    	}

    	function form_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			gradeForm = $$value;
    			$$invalidate(4, gradeForm);
    		});
    	}

    	$$self.$capture_state = () => ({
    		currGrade,
    		wantGrade,
    		finalWeight,
    		roundGrade,
    		gradeForm,
    		gradeInputKeyDown,
    		finalWeightDecimal,
    		mustScore
    	});

    	$$self.$inject_state = $$props => {
    		if ("currGrade" in $$props) $$invalidate(0, currGrade = $$props.currGrade);
    		if ("wantGrade" in $$props) $$invalidate(1, wantGrade = $$props.wantGrade);
    		if ("finalWeight" in $$props) $$invalidate(2, finalWeight = $$props.finalWeight);
    		if ("gradeForm" in $$props) $$invalidate(4, gradeForm = $$props.gradeForm);
    		if ("finalWeightDecimal" in $$props) $$invalidate(3, finalWeightDecimal = $$props.finalWeightDecimal);
    		if ("mustScore" in $$props) $$invalidate(5, mustScore = $$props.mustScore);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*finalWeight*/ 4) {
    			 $$invalidate(3, finalWeightDecimal = finalWeight ? finalWeight / 100 : 0);
    		}

    		if ($$self.$$.dirty & /*wantGrade, finalWeightDecimal, currGrade*/ 11) {
    			 $$invalidate(5, mustScore = roundGrade(((wantGrade || 0) - (1 - finalWeightDecimal) * (currGrade || 0)) / finalWeightDecimal));
    		}
    	};

    	return [
    		currGrade,
    		wantGrade,
    		finalWeight,
    		finalWeightDecimal,
    		gradeForm,
    		mustScore,
    		gradeInputKeyDown,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		form_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
