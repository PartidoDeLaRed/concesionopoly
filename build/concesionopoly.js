(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _concesionopolyIndex = require('./concesionopoly/index');

var _concesionopolyIndex2 = _interopRequireDefault(_concesionopolyIndex);

window.Concesionopoly = _concesionopolyIndex2['default'];

},{"./concesionopoly/index":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Chip = (function () {
  function Chip(el) {
    _classCallCheck(this, Chip);

    this.el = el;
    this.set = this.set.bind(this);
  }

  _createClass(Chip, [{
    key: 'set',
    value: function set(position) {
      this.el.setAttribute('data-position', position);
    }
  }]);

  return Chip;
})();

exports['default'] = Chip;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Dices = (function () {
  function Dices(el) {
    _classCallCheck(this, Dices);

    this.dices = [];
    this.el = el;
    this.set = this.set.bind(this);
  }

  _createClass(Dices, [{
    key: 'createDice',
    value: function createDice() {
      var dice = document.createElement('div');
      dice.className = 'dice';[1, 2, 3, 4, 5, 6].forEach(function (v) {
        var side = document.createElement('div');
        side.className = 'side side-' + v;
        dice.appendChild(side);
      });

      this.dices.push(dice);
      this.el.appendChild(dice);
      return dice;
    }
  }, {
    key: 'set',
    value: function set(dices) {
      var _this = this;

      dices.values.forEach(function (value, i) {
        var dice = _this.dices[i] || _this.createDice();
        dice.setAttribute('data-dice-value', value);
      });
    }
  }]);

  return Dices;
})();

exports['default'] = Dices;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _domDelegate = require('dom-delegate');

var _domDelegate2 = _interopRequireDefault(_domDelegate);

var _propertiesList = require('./properties-list');

var _propertiesList2 = _interopRequireDefault(_propertiesList);

var _templates = require('./templates');

var _templates2 = _interopRequireDefault(_templates);

var _engine = require('../engine');

var _engine2 = _interopRequireDefault(_engine);

var _modals = require('./modals');

var _modals2 = _interopRequireDefault(_modals);

var _dices = require('./dices');

var _dices2 = _interopRequireDefault(_dices);

var _chip = require('./chip');

var _chip2 = _interopRequireDefault(_chip);

var Browser = (function () {
  function Browser() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Browser);

    this.el = options.el;

    this.doTurn = this.doTurn.bind(this);

    this.events = new _domDelegate2['default'](this.el);
    this.engine = new _engine2['default']();
    this.templates = new _templates2['default'](this.el.querySelector('[data-templates]'));
    this.dices = new _dices2['default'](this.el.querySelector('[data-dices]'));
    this.chip = new _chip2['default'](this.el.querySelector('[data-chip]'));
    this.modals = new _modals2['default']({
      container: this.el,
      deactivateDelay: 500,
      templates: this.templates
    });
    this.propertiesList = new _propertiesList2['default']({
      el: this.el.querySelector('[data-properties-list]'),
      templates: this.templates
    });

    this.engine.on('property:add', this.propertiesList.add);
    this.engine.on('property:remove', this.propertiesList.remove);

    this.dices.set(this.engine.getDices());
    this.engine.on('dices:change', this.dices.set);

    this.chip.set(this.engine.getPosition());
    this.engine.on('position:change', this.chip.set);

    this.loadHelpModals();

    this.enableTurn();

    this.modals.show('welcome');
  }

  _createClass(Browser, [{
    key: 'loadHelpModals',
    value: function loadHelpModals() {
      var _this = this;

      this.events.on('click', '[data-tile]', function (e, target) {
        var index = target.getAttribute('data-tile');
        if (!index) return;
        var tile = _this.engine.getTile(index);

        if (tile.type === 'property') {
          _this.modals.show('property-info', tile.property);
        }
      });
    }
  }, {
    key: 'enableTurn',
    value: function enableTurn(lastTurn) {
      if (lastTurn && lastTurn.last) {
        var owned = this.engine.state.ownedProperties;
        var count = owned.length;
        var cost = count === 0 ? 0 : count === 1 ? owned[0].price : owned.reduce(function (a, b) {
          return (a.price || a || 0) + b.price;
        });
        this.modals.show('end', {
          count: count,
          countText: 'concesion' + (count !== 1 ? 'es' : ''),
          cost: cost
        });
      } else {
        this.events.on('click', '[data-dices]', this.doTurn);
      }
    }
  }, {
    key: 'disableTurn',
    value: function disableTurn() {
      this.events.off('click', '[data-dices]');
    }
  }, {
    key: 'doTurn',
    value: function doTurn() {
      this.disableTurn();

      var turn = this.engine.doTurn();

      if (turn.type === 'property') {
        return this.renderPropertyTurn(turn);
      }

      if (turn.type === 'extraordinary-tax') {
        if (turn.removedProperty) this.modals.show(turn.type, turn.tile);
      }

      if (turn.type === 'luck') {
        if (turn.addedProperty) this.modals.show(turn.type, turn.tile);
      }

      this.enableTurn(turn);
    }
  }, {
    key: 'renderPropertyTurn',
    value: function renderPropertyTurn(turn) {
      var _this2 = this;

      var modal = this.modals.show('concession', turn.tile);
      var events = new _domDelegate2['default'](modal);

      events.on('click', '[data-price-option]', function (e, button) {
        var selectedPrice = button.getAttribute('data-price-option');
        if (turn.selectOption(parseInt(selectedPrice, 10))) {
          _this2.modals.show('concession-correct', turn.tile, 5000);
        } else {
          _this2.modals.show('concession-incorrect', turn.tile, 5000);
        }
        _this2.enableTurn(turn);
      });
    }
  }]);

  return Browser;
})();

exports['default'] = Browser;
module.exports = exports['default'];

},{"../engine":9,"./chip":2,"./dices":3,"./modals":5,"./properties-list":6,"./templates":7,"dom-delegate":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _domDelegate = require('dom-delegate');

var _domDelegate2 = _interopRequireDefault(_domDelegate);

function defaults() {
  return {
    container: undefined,
    templates: undefined,
    className: 'modals',
    activeClass: 'active',
    overlayClass: 'overlay',
    deactivateDelay: 0
  };
}

var Modals = (function () {
  function Modals() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Modals);

    var o = this.options = (0, _deepmerge2['default'])(defaults(), options);

    this.el = document.createElement('div');
    this.el.className = o.className;

    var overlay = document.createElement('div');
    overlay.className = o.overlayClass;
    this.el.appendChild(overlay);

    this.templates = o.templates;

    this.container = o.container || document.body;

    this.events = new _domDelegate2['default'](this.el);
    this.overlayEvents = new _domDelegate2['default'](overlay);

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this.showing = null;
    this.inserted = false;
  }

  _createClass(Modals, [{
    key: 'insert',
    value: function insert() {
      if (this.inserted) return this;
      this.inserted = true;
      this.container.insertBefore(this.el, this.container.firstChild);

      this.events.on('click', '[data-modal-hide]', this.hide.bind(this));
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (!this.inserted) return this;
      this.events.off();

      this.container.removeChild(this.el);
      this.inserted = false;
    }
  }, {
    key: 'show',
    value: function show(name, data, closeAfter) {
      var _this = this;

      this.insert();
      this.hide();

      var modal = this.showing = this.templates.render(name, data);
      this.el.appendChild(modal);

      var hide = function hide() {
        if (_this.showing === modal) _this.hide();
      };

      if (modal.hasAttribute('data-modal-hide')) {
        (function () {
          var hideAndOff = function hideAndOff() {
            hide();
            _this.overlayEvents.off('click', hideAndOff);
          };
          _this.overlayEvents.on('click', hideAndOff);
        })();
      }

      (0, _domDelegate2['default'])(modal);
      setTimeout(function () {
        _this.el.classList.add(_this.options.activeClass);
        if (closeAfter) setTimeout(hide, closeAfter);
      }, 0);
      return modal;
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      if (!this.showing) return this;
      var modal = this.showing;
      this.showing = null;
      this.el.classList.remove(this.options.activeClass);
      setTimeout(function () {
        _this2.el.removeChild(modal);
        if (_this2.showing) return;
        _this2.remove();
      }, this.options.deactivateDelay);
    }
  }]);

  return Modals;
})();

exports['default'] = Modals;
module.exports = exports['default'];
// this.events.on('click', `[class*="${this.options.overlayClass}"]`, this.hide.bind(this))

},{"deepmerge":12,"dom-delegate":14}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PropertiesList = (function () {
  function PropertiesList() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PropertiesList);

    this.el = options.el;
    this.templates = options.templates;
    this.engine = options.engine;

    this.items = {};
    this.size = 0;

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  _createClass(PropertiesList, [{
    key: 'add',
    value: function add(property) {
      if (this.items[property.id]) throw new Error('Insanity: doing the same thing over and over again and expecting different results.');
      var item = this.templates.render('properties-list-item', property);
      this.items[property.id] = item;
      this.size++;
      if (this.size) this.el.classList.remove('empty');
      this.el.appendChild(item);
    }
  }, {
    key: 'remove',
    value: function remove(property) {
      this.el.removeChild(this.items[property.id]);
      this.size--;
      if (this.size) this.el.classList.add('empty');
    }
  }]);

  return PropertiesList;
})();

exports['default'] = PropertiesList;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _flyTemplate = require('fly-template');

var _flyTemplate2 = _interopRequireDefault(_flyTemplate);

var Templates = (function () {
  function Templates(container) {
    _classCallCheck(this, Templates);

    this.templates = {};
    this.el = container;
  }

  _createClass(Templates, [{
    key: 'render',
    value: function render(name, data) {
      var string = this.template(name)(data);
      var wrapper = document.createElement('div');
      wrapper.innerHTML = string;
      return wrapper.firstChild;
    }
  }, {
    key: 'template',
    value: function template(name) {
      if (this.templates[name]) return this.templates[name];
      var el = this.el.querySelector('[data-template="' + name + '"]');
      if (!el) throw new Error('Template "' + name + '" not found.');
      var template = (0, _flyTemplate2['default'])(el.innerHTML);
      this.templates[name] = template;
      return template;
    }
  }]);

  return Templates;
})();

exports['default'] = Templates;
module.exports = exports['default'];

},{"fly-template":16}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dices = (function () {
  function Dices() {
    var amount = arguments[0] === undefined ? 1 : arguments[0];

    _classCallCheck(this, Dices);

    this.amount = amount;
  }

  _createClass(Dices, [{
    key: "flip",
    value: function flip() {
      var values = [];

      var pending = this.amount;
      while (pending--) values.push(Math.floor(Math.random() * 6 + 1));

      return {
        values: values,
        total: values.reduce(function (a, b) {
          return a + b;
        })
      };
    }
  }]);

  return Dices;
})();

exports["default"] = Dices;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _emitter = require('emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _dices = require('./dices');

var _dices2 = _interopRequireDefault(_dices);

var _tiles = require('./tiles');

var _tiles2 = _interopRequireDefault(_tiles);

var Engine = (function (_Emitter) {
  function Engine() {
    _classCallCheck(this, Engine);

    _get(Object.getPrototypeOf(Engine.prototype), 'constructor', this).call(this);

    this.dices = new _dices2['default'](2);

    this.state = {
      waiting: false,
      ended: false,
      position: 0,
      tile: null,
      dices: this.dices.flip(),
      ownedProperties: []
    };
  }

  _inherits(Engine, _Emitter);

  _createClass(Engine, [{
    key: 'getTile',
    value: function getTile(i) {
      return _tiles2['default'].get(i);
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.state.position;
    }
  }, {
    key: 'getDices',
    value: function getDices() {
      return this.state.dices;
    }
  }, {
    key: 'addProperty',
    value: function addProperty(property) {
      if (!property) return null;
      this.state.ownedProperties.push(property);
      this.emit('property:add', property);
      return property;
    }
  }, {
    key: 'removeLastProperty',
    value: function removeLastProperty() {
      if (!this.state.ownedProperties.length) return null;
      var property = this.state.ownedProperties.pop();
      this.emit('property:remove', property);
      return property;
    }
  }, {
    key: 'flipDices',
    value: function flipDices() {
      var dices = this.dices.flip();
      this.state.dices = dices;
      this.emit('dices:change', dices);
      return dices;
    }
  }, {
    key: 'move',
    value: function move(amount) {
      var position = this.state.position + amount;
      if (position >= _tiles2['default'].size - 1) {
        position = _tiles2['default'].size - 1;
        this.state.ended = true;
      }
      this.state.position = position;
      this.emit('position:change', position);
      return position;
    }
  }, {
    key: 'doTurn',
    value: function doTurn() {
      var _this = this;

      if (this.state.waiting) throw new Error('ansdjknaskdjnask.');
      if (this.state.ended) throw new Error('wut?');

      var dices = this.flipDices();
      var position = this.move(dices.total);
      var tile = _tiles2['default'].get(position);

      this.state.tile = tile;

      var turn = undefined;
      if (tile.type === 'luck') {
        turn = {
          type: 'luck',
          tile: tile,
          last: this.state.ended,
          addedProperty: this.addProperty(tile.property)
        };
      } else if (tile.type === 'extraordinary-tax') {
        turn = {
          type: 'extraordinary-tax',
          tile: tile,
          last: this.state.ended,
          removedProperty: this.removeLastProperty()
        };
      } else if (tile.type === 'property') {
        var selectOption = function selectOption(price) {
          if (!_this.state.waiting) return false;
          _this.state.waiting = false;
          if (tile.property.price === price) {
            _this.addProperty(tile.property);
            return true;
          }
          return false;
        };

        this.state.waiting = true;

        turn = {
          type: 'property',
          tile: tile,
          last: this.state.ended,
          priceOptions: tile.priceOptions,
          selectOption: selectOption
        };
      }

      return turn;
    }
  }]);

  return Engine;
})(_emitter2['default']);

exports['default'] = Engine;
module.exports = exports['default'];

},{"./dices":8,"./tiles":10,"emitter":15}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var tiles = [{
  type: 'property'
}, {
  type: 'property',
  priceOptions: [75000, 35000],
  property: {
    name: 'Canchas de Tenis Parque Sarmiento',
    description: '12 canchas de tenis.|Alquilar una cancha por hora cuesta $160.',
    price: 35000
  }
}, {
  type: 'luck',
  message: 'Tu contacto en el Gobierno te avisa que hay una concesión que no tiene ofertas y consigue un contrato a bajo costo por 99 años.',
  property: {
    name: 'Canchas de Tenis Parque Sarmiento',
    description: '160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales',
    price: 35000
  }
}, {
  type: 'property',
  priceOptions: [177000, 282000],
  property: {
    name: 'Estacionamiento Centro Cultural San Martín',
    description: 'Cuenta con 260 plazas de estacionamiento.|Está abierto las 24 hs.|Sus tarifas son: nocturna $30 el auto y $36 la camioneta; diurna $24 el auto y $30 la camioneta.',
    price: 177000
  }
}, {
  type: 'extraordinary-tax',
  message: 'Perdés la concesión por no seguir la normativa vigente.'
}, {
  type: 'property',
  priceOptions: [14000, 31000],
  property: {
    name: 'Estacionamiento Plazoleta Coroneles Pitta Pedernera',
    description: 'Está abierto las 24 hs.|Sus tarifas son: hora $39; Estadía de 12 hs $160; Estadía de 24 hs $160.',
    price: 14000
  }
}, {
  type: 'property',
  priceOptions: [45000, 90000],
  property: {
    name: 'Autódromo de la Ciudad',
    description: 'Superficie total techada de 3500 mts2.|160 hectáreas que se alquilan para la producción de exposiciones, conciertos, festivales y ferias empresariales.|Estacionamiento para 50 mil autos.',
    price: 45000
  }
}, {
  type: 'luck',
  message: 'El gobierno nacional decreta facilidades para blanquear dólares, decidís poner un boliche en costanera.',
  property: {
    name: 'Canchas de fútbol X BAJO AUTOPISTA 1 - 115B/116',
    description: 'Alquiler de cancha por hora $500 aproximadamente.|7 canchas de césped sintetico.|5 canchas de tenis de polvo de labrillo, cubieras.',
    price: 35000
  }
}, {
  type: 'property',
  priceOptions: [35000, 60000],
  property: {
    name: 'Canchas de fútbol X BAJO AUTOPISTA 1 - 115B/116',
    description: 'Alquiler de cancha por hora $500 aproximadamente.|7 canchas de césped sintetico.|5 canchas de tenis de polvo de labrillo, cubieras.',
    price: 35000
  }
}, {
  type: 'property',
  priceOptions: [12000, 20000],
  property: {
    name: 'Baulera de Palos y Carros del Golf Municipal',
    description: 'Guardar los palos cuesta aproximadamente $200 por mes.',
    price: 12000
  }
}, {
  type: 'property',
  priceOptions: [1400000, 2550000],
  property: {
    name: 'Zoologico de Buenos Aires',
    description: 'Entrada para mayores de 12 años: $150.|18 hectareas en Palermo, donde el m2 vale $2.829,00 dolares, aproximadamente.',
    price: 1400000
  }
}, {
  type: 'property',
  priceOptions: [105000, 6500],
  property: {
    name: 'Estacionamiento Bajo Autopista 6 603 A',
    description: 'Cuenta con 100 plazas de estacionamiento.|Está abierto las 24 hs.|Sus tarifas son: autos hora $10; estadía 12 hs $50; estadía 24 hs $70.',
    price: 6500
  }
}, {
  type: 'property',
  priceOptions: [75000, 120000],
  property: {
    name: 'Restaurant Rodizio',
    description: 'Precio Menú $335 sin bebidas.|300 cubiertos.|5 salones para eventos para 710 cubiertos.',
    price: 75000
  }
}, {
  type: 'property',
  priceOptions: [80000, 110000],
  property: {
    name: 'Restaurant Happening',
    description: 'Precio promedio $350 por persona.|200 cubiertos.|Más de 50 años de funcionamiento, mismos dueños que Gardiner.',
    price: 80000
  }
}, {
  type: 'property',
  priceOptions: [55000, 20000],
  property: {
    name: 'Restaurant El Palacio de la Papa Frita',
    description: 'Precio promedio $250 por persona.|200 cubiertos.|Empresa con 4 sucursales.',
    price: 55000
  }
}, {
  type: 'luck',
  message: 'Sale a concurso una concesión sin indexación por inflación, el canon es irrisorio y la conseguís sin problemas.',
  property: {
    name: 'Restaurant Gardiner',
    description: 'Precio promedio $340 por persona.|250 cubiertos.|Fundado en 1989, mismos dueños que Happening.',
    price: 60000
  }
}, {
  type: 'property',
  priceOptions: [60000, 90000],
  property: {
    name: 'Restaurant Gardiner',
    description: 'Precio promedio $340 por persona.|250 cubiertos.|Fundado en 1989, mismos dueños que Happening.',
    price: 60000
  }
}, {
  type: 'luck',
  message: 'A tu cuñado le deben un favor y te adjudican una concesión.',
  property: {
    name: 'Restaurant La Perla',
    description: 'Precio promedio $100 por persona.|Más de 150 cubiertos.|Empresa con 3 sucursales.',
    price: 5000
  }
}, {
  type: 'property',
  priceOptions: [5000, 35000],
  property: {
    name: 'Restaurant La Perla',
    description: 'Precio promedio $100 por persona.|Más de 150 cubiertos.|Empresa con 3 sucursales.',
    price: 5000
  }
}, {
  type: 'property',
  priceOptions: [50200, 32500],
  property: {
    name: 'Parrilla Siga la Vaca',
    description: 'Precio cena $225 por persona.|200 cubiertos.|Empresa con 6 sucursales',
    price: 32500
  }
}, {
  type: 'property',
  priceOptions: [14000, 7000],
  property: {
    name: 'Cafe del Centro Cultural Recoleta',
    description: 'Un café cuesta $25.|Lugar para 40 personas.',
    price: 7000
  }
}, {
  type: 'property',
  priceOptions: [26000, 58000],
  property: {
    name: 'Disco Tequila',
    description: 'Entrada promedio $200.|Capacidad 300 personas.',
    price: 26000
  }
}, {
  type: 'property',
  priceOptions: [81000, 121000],
  property: {
    name: 'Discoteca Pacha',
    description: 'Capacidad para 3000 personas.|Es un grupo con 18 discotecas alrededor del mundo.|Entrada para noche común $150 aproximadamente.',
    price: 81000
  }
}, {
  type: 'property',
  priceOptions: [8000, 25000],
  property: {
    name: 'Estacionamiento Catalinas Sur',
    description: 'Cuenta con 100 plazas de estacionamiento.|Está abierto las 24 hs.|Sus tarifas para autos son: $30; Estadía 12 hs $100; Estadía 24 hs $150; durante partidos de Boca $120.',
    price: 8000
  }
}, {
  type: 'property',
  priceOptions: [3200, 55000],
  property: {
    name: 'Club Hipico Argentino',
    description: 'Membrecía $350.|8 clases $1.500.|Mantener al caballo $4.500.',
    price: 3200
  }
}, {
  type: 'property',
  priceOptions: [132000, 49000],
  property: {
    name: 'Buenos Aires Design',
    description: 'Posee 140 espacios de estacionamiento.|Cuenta con 72 locales.',
    price: 49000
  }
}, {
  type: 'property',
  priceOptions: [197000, 520000],
  property: {
    name: 'Complejo Costa Salguero',
    description: 'Superficie techada 20.000m2 en 17 hectareas de espacio.|Cuenta con 23 subconcesiones, entre los que se cuentan 4 estacionamientos, 2 centros de convenciones, 3 salones de conferencias y un hotel.',
    price: 197000
  }
}, {
  type: 'property',
  priceOptions: [27000, 56000],
  property: {
    name: 'Resto Pizza Banana',
    description: 'Precio promedio $280 por persona.|Salón de 750m2|Espacio para 1200 personas.',
    price: 27000
  }
}, {
  type: 'property',
  priceOptions: [51000, 23000],
  property: {
    name: 'Kartodromo Argentino',
    description: 'Promedio de alquiler de karting $250.|Derecho de pista $300',
    price: 23000
  }
}, {
  type: 'luck',
  message: 'Tu concesión pasa desapercibida otra vez mas y el gobierno de turno te renueva sin preguntar.',
  property: {
    name: 'Kartodromo Argentino',
    description: 'Promedio de alquiler de karting $250.|Derecho de pista $300',
    price: 23000
  }
}, {
  type: 'property',
  priceOptions: [64000, 22000],
  property: {
    name: 'Golf Club Jose Jurado',
    description: 'Cancha con 18 hoyos.|Cuota de ingreso $1.000.|Cuota mensual $150.',
    price: 64000
  }
}, {
  type: 'extraordinary-tax',
  message: 'Se hace público el canon que pagás mensualmente a causa del Concesionopoly, perdés una concesión.'
}, {
  type: 'property',
  priceOptions: [16000, 30000],
  property: {
    name: 'Playa de estacionamiento X 1-110B',
    description: 'Aproximadamente $35 la hora.|Entran aproximandamente 100 autos.',
    price: 16000
  }
}];

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

tiles.forEach(function (tile) {
  if (tile.property) {
    tile.property.id = guid();

    tile.property.description = tile.property.description.split('|').map(function (s) {
      return '<p>' + s + '</p>';
    }).join('');
  }
});

exports['default'] = {
  get: function get(i) {
    return (0, _deepmerge2['default'])({}, tiles[parseInt(i, 10)]);
  },
  size: tiles.length
};
module.exports = exports['default'];

},{"deepmerge":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Concesionopoly;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _browser = require('./browser');

var _browser2 = _interopRequireDefault(_browser);

function Concesionopoly(options) {
  new _browser2['default'](options);
}

module.exports = exports['default'];

},{"./browser":4}],12:[function(require,module,exports){
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.deepmerge = factory();
    }
}(this, function () {

return function deepmerge(target, src) {
    var array = Array.isArray(src);
    var dst = array && [] || {};

    if (array) {
        target = target || [];
        dst = dst.concat(target);
        src.forEach(function(e, i) {
            if (typeof dst[i] === 'undefined') {
                dst[i] = e;
            } else if (typeof e === 'object') {
                dst[i] = deepmerge(target[i], e);
            } else {
                if (target.indexOf(e) === -1) {
                    dst.push(e);
                }
            }
        });
    } else {
        if (target && typeof target === 'object') {
            Object.keys(target).forEach(function (key) {
                dst[key] = target[key];
            })
        }
        Object.keys(src).forEach(function (key) {
            if (typeof src[key] !== 'object' || !src[key]) {
                dst[key] = src[key];
            }
            else {
                if (!target[key]) {
                    dst[key] = src[key];
                } else {
                    dst[key] = deepmerge(target[key], src[key]);
                }
            }
        });
    }

    return dst;
}

}));

},{}],13:[function(require,module,exports){
/*jshint browser:true, node:true*/

'use strict';

module.exports = Delegate;

/**
 * DOM event delegator
 *
 * The delegator will listen
 * for events that bubble up
 * to the root node.
 *
 * @constructor
 * @param {Node|string} [root] The root node or a selector string matching the root node
 */
function Delegate(root) {

  /**
   * Maintain a map of listener
   * lists, keyed by event name.
   *
   * @type Object
   */
  this.listenerMap = [{}, {}];
  if (root) {
    this.root(root);
  }

  /** @type function() */
  this.handle = Delegate.prototype.handle.bind(this);
}

/**
 * Start listening for events
 * on the provided DOM element
 *
 * @param  {Node|string} [root] The root node or a selector string matching the root node
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.root = function(root) {
  var listenerMap = this.listenerMap;
  var eventType;

  // Remove master event listeners
  if (this.rootElement) {
    for (eventType in listenerMap[1]) {
      if (listenerMap[1].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, true);
      }
    }
    for (eventType in listenerMap[0]) {
      if (listenerMap[0].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, false);
      }
    }
  }

  // If no root or root is not
  // a dom node, then remove internal
  // root reference and exit here
  if (!root || !root.addEventListener) {
    if (this.rootElement) {
      delete this.rootElement;
    }
    return this;
  }

  /**
   * The root node at which
   * listeners are attached.
   *
   * @type Node
   */
  this.rootElement = root;

  // Set up master event listeners
  for (eventType in listenerMap[1]) {
    if (listenerMap[1].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, true);
    }
  }
  for (eventType in listenerMap[0]) {
    if (listenerMap[0].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, false);
    }
  }

  return this;
};

/**
 * @param {string} eventType
 * @returns boolean
 */
Delegate.prototype.captureForType = function(eventType) {
  return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
};

/**
 * Attach a handler to one
 * event for all elements
 * that match the selector,
 * now or in the future
 *
 * The handler function receives
 * three arguments: the DOM event
 * object, the node that matched
 * the selector while the event
 * was bubbling and a reference
 * to itself. Within the handler,
 * 'this' is equal to the second
 * argument.
 *
 * The node that actually received
 * the event can be accessed via
 * 'event.target'.
 *
 * @param {string} eventType Listen for these events
 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
 * @param {function()} handler Handler function - event data passed here will be in event.data
 * @param {Object} [eventData] Data to pass in event.data
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.on = function(eventType, selector, handler, useCapture) {
  var root, listenerMap, matcher, matcherParam;

  if (!eventType) {
    throw new TypeError('Invalid event type: ' + eventType);
  }

  // handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // Fallback to sensible defaults
  // if useCapture not set
  if (useCapture === undefined) {
    useCapture = this.captureForType(eventType);
  }

  if (typeof handler !== 'function') {
    throw new TypeError('Handler must be a type of Function');
  }

  root = this.rootElement;
  listenerMap = this.listenerMap[useCapture ? 1 : 0];

  // Add master handler for type if not created yet
  if (!listenerMap[eventType]) {
    if (root) {
      root.addEventListener(eventType, this.handle, useCapture);
    }
    listenerMap[eventType] = [];
  }

  if (!selector) {
    matcherParam = null;

    // COMPLEX - matchesRoot needs to have access to
    // this.rootElement, so bind the function to this.
    matcher = matchesRoot.bind(this);

  // Compile a matcher for the given selector
  } else if (/^[a-z]+$/i.test(selector)) {
    matcherParam = selector;
    matcher = matchesTag;
  } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
    matcherParam = selector.slice(1);
    matcher = matchesId;
  } else {
    matcherParam = selector;
    matcher = matches;
  }

  // Add to the list of listeners
  listenerMap[eventType].push({
    selector: selector,
    handler: handler,
    matcher: matcher,
    matcherParam: matcherParam
  });

  return this;
};

/**
 * Remove an event handler
 * for elements that match
 * the selector, forever
 *
 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.off = function(eventType, selector, handler, useCapture) {
  var i, listener, listenerMap, listenerList, singleEventType;

  // Handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // If useCapture not set, remove
  // all event listeners
  if (useCapture === undefined) {
    this.off(eventType, selector, handler, true);
    this.off(eventType, selector, handler, false);
    return this;
  }

  listenerMap = this.listenerMap[useCapture ? 1 : 0];
  if (!eventType) {
    for (singleEventType in listenerMap) {
      if (listenerMap.hasOwnProperty(singleEventType)) {
        this.off(singleEventType, selector, handler);
      }
    }

    return this;
  }

  listenerList = listenerMap[eventType];
  if (!listenerList || !listenerList.length) {
    return this;
  }

  // Remove only parameter matches
  // if specified
  for (i = listenerList.length - 1; i >= 0; i--) {
    listener = listenerList[i];

    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
      listenerList.splice(i, 1);
    }
  }

  // All listeners removed
  if (!listenerList.length) {
    delete listenerMap[eventType];

    // Remove the main handler
    if (this.rootElement) {
      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
    }
  }

  return this;
};


/**
 * Handle an arbitrary event.
 *
 * @param {Event} event
 */
Delegate.prototype.handle = function(event) {
  var i, l, type = event.type, root, phase, listener, returned, listenerList = [], target, /** @const */ EVENTIGNORE = 'ftLabsDelegateIgnore';

  if (event[EVENTIGNORE] === true) {
    return;
  }

  target = event.target;

  // Hardcode value of Node.TEXT_NODE
  // as not defined in IE8
  if (target.nodeType === 3) {
    target = target.parentNode;
  }

  root = this.rootElement;

  phase = event.eventPhase || ( event.target !== event.currentTarget ? 3 : 2 );
  
  switch (phase) {
    case 1: //Event.CAPTURING_PHASE:
      listenerList = this.listenerMap[1][type];
    break;
    case 2: //Event.AT_TARGET:
      if (this.listenerMap[0] && this.listenerMap[0][type]) listenerList = listenerList.concat(this.listenerMap[0][type]);
      if (this.listenerMap[1] && this.listenerMap[1][type]) listenerList = listenerList.concat(this.listenerMap[1][type]);
    break;
    case 3: //Event.BUBBLING_PHASE:
      listenerList = this.listenerMap[0][type];
    break;
  }

  // Need to continuously check
  // that the specific list is
  // still populated in case one
  // of the callbacks actually
  // causes the list to be destroyed.
  l = listenerList.length;
  while (target && l) {
    for (i = 0; i < l; i++) {
      listener = listenerList[i];

      // Bail from this loop if
      // the length changed and
      // no more listeners are
      // defined between i and l.
      if (!listener) {
        break;
      }

      // Check for match and fire
      // the event if there's one
      //
      // TODO:MCG:20120117: Need a way
      // to check if event#stopImmediatePropagation
      // was called. If so, break both loops.
      if (listener.matcher.call(target, listener.matcherParam, target)) {
        returned = this.fire(event, target, listener);
      }

      // Stop propagation to subsequent
      // callbacks if the callback returned
      // false
      if (returned === false) {
        event[EVENTIGNORE] = true;
        event.preventDefault();
        return;
      }
    }

    // TODO:MCG:20120117: Need a way to
    // check if event#stopPropagation
    // was called. If so, break looping
    // through the DOM. Stop if the
    // delegation root has been reached
    if (target === root) {
      break;
    }

    l = listenerList.length;
    target = target.parentElement;
  }
};

/**
 * Fire a listener on a target.
 *
 * @param {Event} event
 * @param {Node} target
 * @param {Object} listener
 * @returns {boolean}
 */
Delegate.prototype.fire = function(event, target, listener) {
  return listener.handler.call(target, event, target);
};

/**
 * Check whether an element
 * matches a generic selector.
 *
 * @type function()
 * @param {string} selector A CSS selector
 */
var matches = (function(el) {
  if (!el) return;
  var p = el.prototype;
  return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector);
}(Element));

/**
 * Check whether an element
 * matches a tag selector.
 *
 * Tags are NOT case-sensitive,
 * except in XML (and XML-based
 * languages such as XHTML).
 *
 * @param {string} tagName The tag name to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesTag(tagName, element) {
  return tagName.toLowerCase() === element.tagName.toLowerCase();
}

/**
 * Check whether an element
 * matches the root.
 *
 * @param {?String} selector In this case this is always passed through as null and not used
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesRoot(selector, element) {
  /*jshint validthis:true*/
  if (this.rootElement === window) return element === document;
  return this.rootElement === element;
}

/**
 * Check whether the ID of
 * the element in 'this'
 * matches the given ID.
 *
 * IDs are case-sensitive.
 *
 * @param {string} id The ID to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesId(id, element) {
  return id === element.id;
}

/**
 * Short hand for off()
 * and root(), ie both
 * with no parameters
 *
 * @return void
 */
Delegate.prototype.destroy = function() {
  this.off();
  this.root();
};

},{}],14:[function(require,module,exports){
/*jshint browser:true, node:true*/

'use strict';

/**
 * @preserve Create and manage a DOM event delegator.
 *
 * @version 0.3.0
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
var Delegate = require('./delegate');

module.exports = function(root) {
  return new Delegate(root);
};

module.exports.Delegate = Delegate;

},{"./delegate":13}],15:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

exports.__esModule = true;
/**
 * Creates a new instance of Emitter.
 * @class
 * @returns {Object} Returns a new instance of Emitter.
 * @example
 * // Creates a new instance of Emitter.
 * var Emitter = require('emitter');
 *
 * var emitter = new Emitter();
 */

var Emitter = (function () {
  function Emitter() {
    _classCallCheck(this, Emitter);
  }

  /**
   * Adds a listener to the collection for the specified event.
   * @memberof! Emitter.prototype
   * @function
   * @param {String} event - The event name.
   * @param {Function} listener - A listener function to add.
   * @returns {Object} Returns an instance of Emitter.
   * @example
   * // Add an event listener to "foo" event.
   * emitter.on('foo', listener);
   */

  Emitter.prototype.on = function on(event, listener) {
    // Use the current collection or create it.
    this._eventCollection = this._eventCollection || {};

    // Use the current collection of an event or create it.
    this._eventCollection[event] = this._eventCollection[event] || [];

    // Appends the listener into the collection of the given event
    this._eventCollection[event].push(listener);

    return this;
  };

  /**
   * Adds a listener to the collection for the specified event that will be called only once.
   * @memberof! Emitter.prototype
   * @function
   * @param {String} event - The event name.
   * @param {Function} listener - A listener function to add.
   * @returns {Object} Returns an instance of Emitter.
   * @example
   * // Will add an event handler to "foo" event once.
   * emitter.once('foo', listener);
   */

  Emitter.prototype.once = function once(event, listener) {
    var self = this;

    function fn() {
      self.off(event, fn);
      listener.apply(this, arguments);
    }

    fn.listener = listener;

    this.on(event, fn);

    return this;
  };

  /**
   * Removes a listener from the collection for the specified event.
   * @memberof! Emitter.prototype
   * @function
   * @param {String} event - The event name.
   * @param {Function} listener - A listener function to remove.
   * @returns {Object} Returns an instance of Emitter.
   * @example
   * // Remove a given listener.
   * emitter.off('foo', listener);
   */

  Emitter.prototype.off = function off(event, listener) {

    var listeners = undefined;

    // Defines listeners value.
    if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
      return this;
    }

    listeners.forEach(function (fn, i) {
      if (fn === listener || fn.listener === listener) {
        // Removes the given listener.
        listeners.splice(i, 1);
      }
    });

    // Removes an empty event collection.
    if (listeners.length === 0) {
      delete this._eventCollection[event];
    }

    return this;
  };

  /**
   * Execute each item in the listener collection in order with the specified data.
   * @memberof! Emitter.prototype
   * @function
   * @param {String} event - The name of the event you want to emit.
   * @param {...Object} data - Data to pass to the listeners.
   * @returns {Object} Returns an instance of Emitter.
   * @example
   * // Emits the "foo" event with 'param1' and 'param2' as arguments.
   * emitter.emit('foo', 'param1', 'param2');
   */

  Emitter.prototype.emit = function emit(event) {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var listeners = undefined;

    // Defines listeners value.
    if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
      return this;
    }

    // Clone listeners
    listeners = listeners.slice(0);

    listeners.forEach(function (fn) {
      return fn.apply(_this, args);
    });

    return this;
  };

  return Emitter;
})();

/**
 * Exports Emitter
 */
exports["default"] = Emitter;
module.exports = exports["default"];
},{}],16:[function(require,module,exports){
function parse(str) {
  var i,
      l,
      openCount = 0,
      startExpressionIndex = false,
      startIndex = 0,
      tokens = [];

  for (i = 0, l = str.length; i <= l; i++) {
    if (startExpressionIndex === false) {
      if (str[i] == '$' && str[i+1] == '{') {
        tokens.push({
          type: 'text',
          value: str.substring(startIndex, i)
        });
        startExpressionIndex = i;
      }
      continue;
    }

    if (str[i] == '{') {
      openCount++;
    }

    if (str[i] == '}' && --openCount == 0) {
      tokens.push({
        type: 'expression',
        value: str.substring(startExpressionIndex + 2, i)
      });
      startExpressionIndex = false;
      startIndex = i + 1;
    }
  }

  if (startIndex !== l) {
    tokens.push({
      type: 'text',
      value: str.substring(startIndex, i)
    });
  }

  return tokens;
}

function convert(tokens) {
  var fn = new Function(
    'return ' + tokens.map(function(token) {
      return token.type == 'text' ? JSON.stringify(token.value) : token.value;
    }).join(' + ') + ';'
  );
  return function sync(properties) {
    return fn.call(properties);
  };
}

var API;

API = function(str) {
  return convert(parse(str));
};

API.parse = parse;
API.convert = convert;

module.exports = API;
},{}]},{},[1]);
