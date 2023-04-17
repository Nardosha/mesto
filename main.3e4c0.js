(()=>{"use strict";var t="popup_opened",e=document.querySelector(".profile__edit-button"),n=document.querySelector(".profile__add-button");function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function t(e,n,r){var o=e.name,i=e.link;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.description=o,this.link=i,this._isLiked=!1,this.templateSelector=n,this._handleCardClick=r}var e,n;return e=t,(n=[{key:"generateCardElement",value:function(){return this._setCardElement(),this._setEventListeners(),this._imageElement.src=this.link,this._imageElement.alt=this.link,this.descriptionElement.textContent=this.description,this._cardElement}},{key:"_setCardElement",value:function(){this._cardElement=this._getTemplate(),this._imageElement=this._cardElement.querySelector(".photo-item__img"),this.descriptionElement=this._cardElement.querySelector(".photo-item__description"),this._buttonLikeElement=this._cardElement.querySelector(".photo-item__button-like"),this._buttonDeleteElement=this._cardElement.querySelector(".photo-item__button-delete")}},{key:"_getTemplate",value:function(){return document.querySelector(this.templateSelector).content.querySelector(".photo-item").cloneNode(!0)}},{key:"_setEventListeners",value:function(){this._buttonLikeElement.addEventListener("click",this._toggleLike.bind(this)),this._buttonDeleteElement.addEventListener("click",this._handleDelete.bind(this)),this._imageElement.addEventListener("click",this._handleCardClick.bind(this))}},{key:"_toggleLike",value:function(){this._buttonLikeElement.classList.toggle("photo-item__button-like_active"),this._isLiked=!this._isLiked}},{key:"_handleDelete",value:function(){this._cardElement.remove()}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}var l=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.formElement=n,this._options=e,this._buttonSubmit=this.formElement.querySelector(this._options.formButtonSubmitSelector),this._inputList=Array.from(this.formElement.querySelectorAll(this._options.formInputSelector)),this.__errorContainerList=this._setErrorElements(),this._isValidInputs=!0}var e,n;return e=t,(n=[{key:"enableValidation",value:function(){this._toggleButtonState(),this._setEventListeners()}},{key:"resetValidation",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){t._hideError(e)}))}},{key:"_setErrorElements",value:function(){var t=this;return this._inputList.reduce((function(e,n){var r=t.formElement.querySelector("#".concat(n.id,"-error"));return e[n.name]||(e[n.name]=r),e}),{})}},{key:"_setEventListeners",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._toggleInputState(e),t._toggleButtonState()}))}))}},{key:"_toggleInputState",value:function(t){var e=t.validity.valid;this._setInputState(t,e)}},{key:"_showError",value:function(t){t.classList.add(this._options.formInputTypeErrorClass),this.__errorContainerList[t.name].classList.add(this._options.formInputErrorActiveClass),this.__errorContainerList[t.name].textContent=t.validationMessage}},{key:"_hideError",value:function(t){t.classList.remove(this._options.formInputTypeErrorClass),this.__errorContainerList[t.name].classList.remove(this._options.formInputErrorActiveClass),this.__errorContainerList[t.name].textContent=""}},{key:"_setInputState",value:function(t,e){e?this._hideError(t):this._showError(t)}},{key:"_validateInputs",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_disableButtonSubmit",value:function(){this._buttonSubmit.setAttribute("disabled","disabled"),this._buttonSubmit.classList.add(this._options.formButtonSubmitTypeDisabledClass)}},{key:"_enableButtonSubmit",value:function(){this._buttonSubmit.removeAttribute("disabled"),this._buttonSubmit.classList.remove(this._options.formButtonSubmitTypeDisabledClass)}},{key:"_toggleButtonState",value:function(){this._isValidInputs=!this._validateInputs(),this._isValidInputs?this._enableButtonSubmit():this._disableButtonSubmit()}}])&&s(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==a(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==a(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===a(o)?o:String(o)),r)}var o}var p=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._closeButton=this._popup.querySelector(".popup__button-close"),this._handleEscClose=this._handleEscClose.bind(this),this._closeByClick=this._closeByClick.bind(this)}var n,r;return n=e,(r=[{key:"open",value:function(){this._popup.classList.add(t),this._popup.addEventListener("mousedown",this._closeByClick),document.addEventListener("keyup",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove(t),this._removeEventListeners()}},{key:"_handleEscClose",value:function(t){"Escape"===t.code&&this.close()}},{key:"_closeByClick",value:function(e){var n=e.target;null!=n&&n.classList.contains(t)&&this.close()}},{key:"setEventListeners",value:function(){this._closeButton.addEventListener("click",this.close.bind(this))}},{key:"_removeEventListeners",value:function(){this._popup.removeEventListener("mousedown",this._closeByClick),document.removeEventListener("keyup",this._handleEscClose)}}])&&c(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==f(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==f(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===f(o)?o:String(o)),r)}var o}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=v(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},y.apply(this,arguments)}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=v(r);if(o){var n=v(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===f(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._imagePopup=e._popup.querySelector(".popup-show-photo__photo"),e._imageDescription=e._popup.querySelector(".popup-show-photo__description"),e}return e=u,(n=[{key:"open",value:function(t){var e=t.name,n=t.link;this._imagePopup.src=n,this._imagePopup.alt=e,this._imageDescription.textContent=e,y(v(u.prototype),"open",this).call(this)}}])&&m(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(p);function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function _(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==d(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===d(o)?o:String(o)),r)}var o}var S=function(){function t(e,n){var r=e.items,o=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"_clean",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(){var t=this;this._clean(),this._items.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(t){this._container.prepend(t)}}])&&_(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==E(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==E(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===E(o)?o:String(o)),r)}var o}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=j(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},k.apply(this,arguments)}function w(t,e){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},w(t,e)}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}var L=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=j(r);if(o){var n=j(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===E(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._handlerSubmit=e,n._form=n._popup.querySelector(".form"),n._inputList=Array.from(n._popup.querySelectorAll(".form__input")),n}return e=u,(n=[{key:"_getInputValues",value:function(){var t=this;return this._inputValues={},this._inputList.forEach((function(e){var n;null!==(n=t._inputValues)&&void 0!==n&&n[e.name]||(t._inputValues[e.name]=e.value)})),this._inputValues}},{key:"setInputValues",value:function(t){this._inputList.forEach((function(e){e.value=t[e.name]}))}},{key:"_submitForm",value:function(t){t.preventDefault();var e=this._getInputValues();this._handlerSubmit(e)}},{key:"setEventListeners",value:function(){this._form.addEventListener("submit",this._submitForm.bind(this)),k(j(u.prototype),"setEventListeners",this).call(this)}},{key:"getFormName",value:function(){return this._form.getAttribute("name")}},{key:"close",value:function(){this._form.reset(),k(j(u.prototype),"close",this).call(this)}}])&&g(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(p);function C(t){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(t)}function O(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==C(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==C(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===C(o)?o:String(o)),r)}var o}var P=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._nameElement=document.querySelector(e),this._descriptionElement=document.querySelector(n)}var e,n;return e=t,(n=[{key:"setUserInfo",value:function(t){var e=t.name,n=t.description;this._nameElement.textContent=e,this._descriptionElement.textContent=n}},{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,description:this._descriptionElement.textContent}}}])&&O(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),I={},T=new b(".popup-show-photo");T.setEventListeners();var B=function(t){var e,n,r,o=(n=(e=t).name,r=e.link,new i({name:n,link:r},".photo-template",(function(){T.open({name:n,link:r})})).generateCardElement());D.addItem(o)},q=new P(".profile__full-name",".profile__description"),x=new L(".popup_add-photo",(function(t){B(t),x.close()}));x.setEventListeners();var R=new L(".popup_edit",(function(t){q.setUserInfo(t),R.close()}));R.setEventListeners();var V,D=new S({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(t){return B(t)}},".content-photos__list");D.renderItems(),V={popupOpenedSelector:".popup_opened",popupForm:".popup__form",formSelector:".form",formInputsSelector:".form__inputs",formInputSelector:".form__input",formInputClass:"form__input",formInputTypeErrorClass:"form__input_type_error",formInputErrorActiveClass:"form__input-error_active",formButtonSubmitSelector:".form__button-submit",formButtonSubmitClass:"form__button-submit",formButtonSubmitTypeDisabledClass:"form__button-submit_type_disabled"},Array.from(document.querySelectorAll(V.formSelector)).forEach((function(t){var e=new l(V,t),n=e.formElement.getAttribute("name");I[n]||(I[n]=e),e.enableValidation()})),e.addEventListener("click",(function(){var t=R.getFormName();I[t].resetValidation();var e=q.getUserInfo();R.setInputValues(e),R.open()})),n.addEventListener("click",(function(){var t=x.getFormName();I[t].resetValidation(),x.open()}))})();
//# sourceMappingURL=main.3e4c0.js.map