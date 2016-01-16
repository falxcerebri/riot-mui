riot.tag2("material-button",'<material-waves onclick="{click}" onmousedown="{launch}" center="{opts.wavesCenter}" rounded="{opts.rounded}" opacity="{opts.wavesOpacity}" color="{opts.wavesColor}" duration="{opts[\'waves-duration\']}"></material-waves> <div class="content"><yield></yield></div>',"","",function(t){var e=this;this.dynamicAttributes=["disabled"],this.disabled=t.disabled||!1,this.launch=function(t){e.disabled||e.tags["material-waves"].trigger("launch",t)},this.click=function(){t.link&&(window.location.href=t.link),e.trigger("click")},this.mixin("dynamicAttributes")}),riot.tag2("material-card",'<div class="title" if="{titleExist}"> <content select=".material-card-title"></content> </div> <yield></yield>',"","",function(t){var e=this;this.titleExist=!1,this.on("mount",function(){e.update({titleExist:!!e.root.querySelector(".material-card-title")})}),this.mixin("content")}),riot.tag2("material-checkbox",'<div class="{checkbox:true,checked:checked}" onclick="{toggle}"> <div class="checkmark"></div> </div> <div class="label" onclick="{toggle}"><yield></yield></div> <input type="hidden" name="{opts.name}" value="{checked}">',"","",function(t){var e=this;this.checked=t.checked||!1,this.disabled=t.disabled||!1,this.toggle=function(){return e.disabled?!1:(e.update({checked:!e.checked}),void e.trigger("toggle",e.checked))}}),riot.tag2("material-dropdown",'<div name="dropdown" class="{dropdown:true,opening:opening}" if="{opened}"> <yield></yield> </div>',"","",function(t){var e=this;this.opened=t.opened||!1,this.dropdown.classList.add(t.animation||"top"),this.open=function(){e.update({opened:!0,opening:!0}),setTimeout(function(){e.update({opening:!1})},0)},this.close=function(){e.update({opening:!0}),setTimeout(function(){e.update({opened:!1})},200)}}),riot.tag2("material-combo",'<material-input name="input"></material-input> <material-dropdown-list selected="{opts.selected}" name="dropdown"></material-dropdown-list> <input type="hidden" value="{value}" name="{opts.name || \'combo\'}"> <div name="options" hidden if="{!isParsed}"> <yield></yield> </div>',"","",function(opts){var _this=this;if(this.items=[],this.isParsed=!0,this.title=null,this.getOptions=function(){Array.prototype.forEach.call(_this.options.children,function(t,e){if("option"==t.tagName.toLowerCase()){var i={title:t.innerHTML,value:t.getAttribute("value")};_this.items.push(i),null!=t.getAttribute("isSelected")&&(_this.tags.dropdown.update({selected:e}),_this.update({value:i.value||i.title}),_this.title=i.title)}}),_this.tags.dropdown.update({items:_this.items}),_this.tags.dropdown.selected&&_this.update({hValue:_this.tags.dropdown.items[_this.tags.dropdown.selected].value||_this.tags.dropdown.items[_this.tags.dropdown.selected].title}),_this.update({isParsed:!0})},this.getOptions(),opts.items)try{this.items=eval(opts.items)||[],this.items.length&&this.tags.dropdown.update({items:this.items})}catch(e){console.error("Something wrong with your items. For details look at it - "+e)}this.on("mount",function(){_this.tags.dropdown.root.style.top=_this.tags.input.root.getBoundingClientRect().height+"px",_this.tags.input.update({value:_this.title||opts.defaulttext||"Choose item"})}),this.tags.dropdown.on("selectChanged",function(t){console.log(t),_this.update({value:_this.tags.dropdown.items[t].value||_this.tags.dropdown.items[t].title}),_this.tags.input.update({value:_this.tags.dropdown.items[t].title}),setTimeout(function(){_this.tags.dropdown.update({items:_this.items})},200)}),this.tags.input.on("valueChanged",function(t){_this.tags.dropdown.update({items:_this.filter("items",{title:t})})}),this.tags.input.on("focusChanged",function(t){_this.tags.input.value==(opts.defaulttext||"Choose item")&&t&&_this.tags.input.update({value:""}),""!=_this.tags.input.value||t||_this.tags.input.update({value:opts.defaulttext||"Choose item"}),t?_this.tags.dropdown.open():null}),this.mixin("collection")}),riot.tag2("material-dropdown-list",'<ul class="{dropdown-content:true,opening:opening}" if="{opened}"> <li each="{item,key in items}" class="{selected:parent.selected==key}"> <span if="{!item.link}" onclick="{parent.select}">{item.title}</span> <a if="{item.link}" href="{item.link}" onclick="{parent.select}" title="{item.title}">{item.title}</a> </li> </ul> <div name="overlay" if="{opts.extraclose && opened}" onclick="{close}" class="material-dropdown-list-overlay"></div>',"","",function(opts){var _this=this;if(this.opened=!1,opts.items){try{this.items=eval(opts.items)||[]}catch(e){console.error("Something wrong with your items. For details look at it - "+e)}this.update({items:this.items})}opts.selected&&this.update({selected:opts.selected}),this.select=function(t){return _this.update({selected:t.item.key}),_this.close(),_this.trigger("selectChanged",t.item.key,t.item.item),!0},this.open=function(){_this.update({opened:!0,opening:!0}),_this.opts.extraclose&&document.body.appendChild(_this.overlay),setTimeout(function(){_this.update({opening:!1})},0)},this.close=function(){_this.update({opening:!0}),setTimeout(function(){_this.update({opened:!1})},200)}}),riot.tag2("material-input",'<div class="label-placeholder"></div> <div class="{input-content:true,not-empty:value,error:error}"> <label for="input" name="label" if="{opts.label}">{opts.label}</label> <input type="{opts.type || \'text\'}" disabled="{disabled}" placeholder="{opts.placeholder}" onkeyup="{changeValue}" value="{value}" autocomplete="off" name="input"> <div class="iconWrapper" name="iconWrapper" if="{opts.icon}"> <material-button name="iconButton" center="true" waves-center="true" waves-color="{opts[\'waves-color\']||\'#fff\'}" rounded="true" waves-opacity="{opts[\'waves-opacity\']||\'0.6\'}" waves-duration="{opts[\'waves-duration\']||\'600\'}"> <yield></yield> </material-button> </div> </div> <div class="{underline:true,focused:focused,error:error}"> <div class="unfocused-line"></div> <div class="focused-line"></div> </div>',"","",function(t){var e=this;if(this.update({value:t.value||""}),this.opts=t,this.disabled=t.disabled||!1,this.name=t.name||"input",this.notSupportedTypes=["date","color","datetime","month","range","time"],-1!=this.notSupportedTypes.indexOf(t.type))throw new Error("Sorry but we not support "+date+" type yet!");this.update({showIcon:!1}),this.on("mount",function(){e.input.name=e.name||"textarea"}),this.changeFocus=function(t){return e.disabled?!1:(e.update({focused:e.input==document.activeElement}),void e.trigger("focusChanged",e.focused,t))},this.changeValue=function(t){e.update({value:e.input.value}),e.trigger("valueChanged",e.input.value,t)},this.input.addEventListener("focus",this.changeFocus),this.input.addEventListener("blur",this.changeFocus),this.on("update",function(t){t&&void 0!=t.value&&e.validationType&&e.isValid(e.validate(t.value))}),this.isValid=function(t){e.update({error:!t})},this.mixin("validate")}),riot.tag2("material-navbar",'<div class="nav-wrapper"> <yield></yield> </div>',"",'role="toolbar"',function(t){}),riot.tag2("material-pane",'<material-navbar style="height:{opts.materialNavbarHeight || \'60px\'};line-height: {opts.materialNavbarHeight || \'60px\'};background-color:{opts.materialNavbarColor || \'#ccc\'}"> <content select=".material-pane-left-bar"></content> <content select=".material-pane-title"></content> <content select=".material-pane-right-bar"></content> </material-navbar> <div class="content"> <content select=".material-pane-content"></content> <yield></yield> </div>',"","",function(t){this.mixin("content")}),riot.tag2("material-popup",'<div name="popup" class="{popup:true,opening:opening}" if="{opened}"> <div class="content"> <content select=".material-popup-title"></content> <div class="close" onclick="{close}"> <i class="material-icons">close</i> </div> <yield></yield> </div> </div> <div class="overlay" onclick="{close}" if="{opened}"></div>',"","",function(t){var e=this;this.opened=t.opened||!1,this.popup.classList.add(t.animation||"top"),this.on("mount",function(){document.body.appendChild(e.root)}),this.open=function(){e.update({opened:!0,opening:!0}),setTimeout(function(){e.update({opening:!1})},0)},this.close=function(){e.update({opening:!0}),setTimeout(function(){e.update({opened:!1})},200)},this.mixin("content")}),riot.tag2("material-snackbar",'<div class="{toast:true,error:toast.isError,opening:toast.opening}" onclick="{parent.removeToastByClick}" each="{toast,key in toasts}"> {toast.message} </div>',"","",function(t){var e=this;this.toasts=[],this.intervals={},this.addToast=function(i,n){var a=e.toastID=Math.random().toString(36).substring(7);e.toasts.push(Object.assign(i,{opening:!0,_id:a})),e.update({toasts:e.toasts}),setTimeout(function(){e.toasts[e.findToastKeyByID(a)].opening=!1,e.update({toasts:e.toasts})},50),e.intervals[a]=setTimeout(function(){e.removeToast(a)},t.duration||n||5e3)},this.removeToastAfterDurationEnding=function(t){e.removeToast(t)},this.findToastKeyByID=function(t){var i=null;return e.toasts.forEach(function(e,n){e._id==t&&(i=n)}),i},this.removeToastByClick=function(t){var i=t.item.toast._id;clearInterval(e.intervals[i]),e.removeToast(i)},this.removeToast=function(t){null!=e.findToastKeyByID(t)&&(e.toasts[e.findToastKeyByID(t)].opening=!0,e.update({toasts:e.toasts}),setTimeout(function(){e.toasts.splice(e.findToastKeyByID(t),1),e.update({toasts:e.toasts})},200))}}),riot.tag2("material-spinner",'<rp-loader> <svg class="loader-circular" height="50" width="50"> <circle class="loader-path" cx="25" cy="25.2" r="19.9" fill="none" stroke-width="{opts.strokewidth||3}" stroke-miterlimit="10"></circle> </svg> </rp-loader>',"","",function(t){}),riot.tag2("material-tabs",'<material-button each="{tab,k in tabs}" onclick="{parent.onChangeTab}" class="{selected:parent.selected==k}" waves-opacity="{parent.opts.wavesOpacity}" waves-duration="{parent.opts.wavesDuration}" waves-center="{parent.opts.wavesCenter}" waves-color="{parent.opts.wavesColor}"> <div class="text" title="{tab.title}">{parent.opts.cut ? parent.cut(tab.title) : tab.title}</div> </material-button> <div class="line-wrapper" if="{opts.useline}"> <div class="line" name="line"></div> </div> <yield></yield>',"","",function(opts){var _this=this;if(this.selected=0,this.tabs=[],opts.tabs){var tabs=[];try{tabs=opts.tabs?eval(opts.tabs):[],this.tabs=tabs}catch(e){}}this.on("mount",function(){_this.setWidth(),_this.setLinePosition()}),this.setWidth=function(){[].forEach.call(_this.root.querySelectorAll("material-button"),function(t){t.style.width=_this.line.style.width=(100/_this.tabs.length).toFixed(2)+"%"})},this.onChangeTab=function(t){var e=_this.tabs.indexOf(t.item.tab);_this.changeTab(e)},this.changeTab=function(t){_this.update({selected:t}),_this.setLinePosition(),_this.trigger("tabChanged",_this.tabs[t],t)},this.setLinePosition=function(){_this.line.style.left=_this.line.getBoundingClientRect().width*_this.selected+"px"},this.cut=function(t){return t.length>opts.cut?t.substr(0,opts.cut)+"...":t}}),riot.tag2("material-textarea",'<div class="label-placeholder"></div> <div class="{textarea-content:true,not-empty:value,error:error}"> <label for="textarea" name="label" if="{opts.label}">{opts.label}</label> <div class="mirror" name="mirror"></div> <div class="textarea-container"> <textarea disabled="{disabled}" name="textarea" value="{value}"></textarea> </div> </div> <div class="{underline:true,focused:focused,error:error}"> <div class="unfocused-line"></div> <div class="focused-line"></div> </div>',"","",function(t){var e=this;this.textarea.scrollTop=this.textarea.scrollHeight,this.opts=t,this.disabled=t.disabled||!1,this.on("mount",function(){t.maxRows&&(e.mirror.style.maxHeight=t.maxRows*e.textarea.getBoundingClientRect().height+"px"),e.input.name=t.name||"textarea"}),this.changeFocus=function(t){if(e.disabled)return!1;var i=e.textarea==document.activeElement;e.update({focused:i}),e.trigger("focusChanged",i)},this.inputHandler=function(t){var i=e.textarea.value;e.mirror.innerHTML=e.format(i),e.update({value:i}),e.trigger("valueChanged",i)},this.textarea.addEventListener("focus",this.changeFocus),this.textarea.addEventListener("blur",this.changeFocus),this.textarea.addEventListener("input",this.inputHandler),this.on("update",function(t){t&&void 0!=t.value&&e.validationType&&e.isValid(e.validate(t.value))}),this.isValid=function(t){e.update({error:!t})},this.format=function(t){return t.replace(/\n/g,"<br/>&nbsp;")},this.mixin("validate")}),riot.tag2("material-waves",'<div id="waves" name="waves"></div>',"","",function(t){function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var n=this,a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=function(t,e,i){for(var n=!0;n;){var a=t,s=e,o=i;n=!1,null===a&&(a=Function.prototype);var r=Object.getOwnPropertyDescriptor(a,s);if(void 0!==r){if("value"in r)return r.value;var l=r.get;return void 0===l?void 0:l.call(o)}var d=Object.getPrototypeOf(a);if(null===d)return void 0;t=d,e=s,i=o,n=!0,r=d=void 0}},o=riot.mixin("Bound"),r=function(t){function n(t,i,a){e(this,n),s(Object.getPrototypeOf(n.prototype),"constructor",this).call(this),t||console.error("You should to set container to the wave!"),this.container=t,this.maxOpacity=i.opacity||.6,this.duration=i.duration||750,this.color=i.color||"#fff",this.center=i.center||!1,this.event=a,this.containerBound=this.receiveBound(),this.maxScale=this.containerBound.size/100*10,this.created=Date.now(),this.start={},this.createNode(),this.waveIn()}return i(n,t),a(n,[{key:"createNode",value:function(){this.wave=document.createElement("div"),this.wave.classList.add("wave"),this.container.appendChild(this.wave)}},{key:"waveIn",value:function(){var t=this;this.center&&!this.event&&console.error("Setup at least mouse event... Or just set center attribute"),this.start.x=this.center?this.containerBound.height/2:this.event.pageY-this.containerBound.offsetTop,this.start.y=this.center?this.containerBound.width/2:this.event.pageX-this.containerBound.offsetLeft;var e=-1!==window.navigator.userAgent.indexOf("Trident");setTimeout(function(){return t.setStyles(t.maxOpacity)},e?50:0)}},{key:"waveOut",value:function(){var t=this,e=Date.now()-this.created,i=Math.round(this.duration/2)-e,n=i>0?i:0;setTimeout(function(){t.setStyles(0),setTimeout(function(){t.wave.parentNode===t.container&&t.container.removeChild(t.wave)},t.duration)},n)}},{key:"setStyles",value:function(t){this.wave.setAttribute("style",this.convertStyle({top:this.start.x+"px",left:this.start.y+"px",transform:"scale("+this.maxScale+")","transition-duration":this.duration+"ms","transition-timing-function":"cubic-bezier(0.250, 0.460, 0.450, 0.940)",background:this.color,opacity:t}))}},{key:"convertStyle",value:function(t){var e="";return Object.keys(t).forEach(function(i){t.hasOwnProperty(i)&&(e+=i+":"+t[i]+";")}),e}}]),n}(o);this._waves=[],this._events=[],this.on("launch",function(e){n._waves.push(new r(n.waves,t,e)),n._events.length||(n._events.push(e.target.addEventListener("mouseup",function(){return n.trigger("hold")})),n._events.push(e.target.addEventListener("mouseleave",function(){return n.trigger("hold")})))}),this.on("hold",function(){n._waves[n._waves.length-1]&&n._waves[n._waves.length-1].waveOut(),n._waves[n._waves.length-1]&&n._waves.slice(n._waves.length-1,1)})});