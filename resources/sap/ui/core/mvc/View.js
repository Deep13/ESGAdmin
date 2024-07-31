/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/ManagedObject','sap/ui/core/Control','sap/ui/core/mvc/Controller','sap/base/util/merge','sap/ui/core/library',"./ViewRenderer","sap/base/assert","sap/base/Log","sap/base/util/extend"],function(M,C,a,m,b,V,c,L,d){"use strict";var f=b.mvc.ViewType;var g=C.extend("sap.ui.core.mvc.View",{metadata:{interfaces:["sap.ui.core.IDScope"],library:"sap.ui.core",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},viewName:{type:"string",group:"Misc",defaultValue:null},displayBlock:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{afterInit:{},beforeExit:{},afterRendering:{},beforeRendering:{}},specialSettings:{controller:'sap.ui.core.mvc.Controller',controllerName:'string',preprocessors:'Object',resourceBundleName:'string',resourceBundleUrl:'sap.ui.core.URI',resourceBundleLocale:'string',resourceBundleAlias:'string',type:'string',definition:'any',viewContent:{type:'any',deprecated:true},viewData:'any',async:{type:"boolean",defaultValue:false}},designtime:"sap/ui/core/designtime/mvc/View.designtime"}});g._mPreprocessors={};function h(P){P._settings={};for(var e in P){if(e.indexOf("_")!==0){P._settings[e]=P[e];}}}function k(P,A){var e;if(typeof P.preprocessor==="string"){var i=P.preprocessor.replace(/\./g,"/");if(A){return new Promise(function(j,l){sap.ui.require([i],function(e){j(e);},l);});}else{return sap.ui.requireSync(i);}}else if(typeof P.preprocessor==="function"&&!P.preprocessor.process){e={process:P.preprocessor};}else{e=P.preprocessor;}if(A){return Promise.resolve(e);}else{return e;}}function n(e,T){var j=this.mPreprocessors[T]||[],G=[],i,l,O,P=[];if(g._mPreprocessors[e]&&g._mPreprocessors[e][T]){G=g._mPreprocessors[e][T].map(function(x){return Object.assign({},x);});}for(i=0,l=G.length;i<l;i++){if(G[i]._onDemand){O=G[i];}else{P.push(G[i]);}}for(i=0,l=j.length;i<l;i++){var I=!j[i].preprocessor;if(I&&O){P.unshift(d(j[i],O));}else if(!I){P.push(j[i]);}}return P;}function o(e,S){var i=e.getMetadata().getClass();function j(P){P.preprocessor=k(P,S.async);}e.mPreprocessors=Object.assign({},S.preprocessors);for(var _ in i.PreprocessorType){var T=i.PreprocessorType[_];if(e.mPreprocessors[T]&&!Array.isArray(e.mPreprocessors[T])){e.mPreprocessors[T]=[e.mPreprocessors[T]];}else if(!e.mPreprocessors[T]){e.mPreprocessors[T]=[];}e.mPreprocessors[T].forEach(h);e.mPreprocessors[T]=n.call(e,i._sType,T);e.mPreprocessors[T].forEach(j);}}function p(e){e.oAsyncState={};e.oAsyncState.promise=null;}var q=function(T,S){if(!sap.ui.getCore().getConfiguration().getControllerCodeDeactivated()){var e=S.controller,N=e&&typeof e.getMetadata==="function"&&e.getMetadata().getName(),A=S.async;if(!e&&T.getControllerName){var i=T.getControllerName();if(i){var j=sap.ui.require('sap/ui/core/CustomizingConfiguration');var l=j&&j.getControllerReplacement(i,M._sOwnerId);if(l){i=typeof l==="string"?l:l.controllerName;}if(A){e=a.create({name:i});}else{e=sap.ui.controller(i,true);}}}else if(e){var O=M._sOwnerId;if(!e._isExtended()){if(A){e=a.extendByCustomizing(e,N,O,A).then(function(e){return a.extendByProvider(e,N,O,A);});}else{e=a.extendByCustomizing(e,N,O,A);e=a.extendByProvider(e,N,O,A);}}else if(A){e=Promise.resolve(e);}}if(e){var x=function(e){T.oController=e;e.oView=T;};if(A){if(!T.oAsyncState){throw new Error("The view "+T.sViewName+" runs in sync mode and therefore cannot use async controller extensions!");}return e.then(x);}else{x(e);}}}else{sap.ui.controller("sap.ui.core.mvc.EmptyControllerImpl",{"_sap.ui.core.mvc.EmptyControllerImpl":true});T.oController=sap.ui.controller("sap.ui.core.mvc.EmptyControllerImpl");}};g.prototype._initCompositeSupport=function(S){c(!S.preprocessors||this.getMetadata().getName().indexOf("XMLView"),"Preprocessors only available for XMLView");this.oViewData=S.viewData;this.sViewName=S.viewName;var i=this;o(this,S);if(S.async){p(this);}var j=sap.ui.require('sap/ui/core/CustomizingConfiguration');if(j&&j.hasCustomProperties(this.sViewName,this)){this._fnSettingsPreprocessor=function(S){var I=this.getId();if(j&&I){if(i.isPrefixedId(I)){I=I.substring((i.getId()+"--").length);}var e=j.getCustomProperties(i.sViewName,I,i);if(e){S=d(S,e);}}};}var P=function(e,l){c(typeof e==="function","fn must be a function");var x=sap.ui.require("sap/ui/core/Component");var O=x&&x.getOwnerComponentFor(i);if(O){if(l){i.fnScopedRunWithOwner=i.fnScopedRunWithOwner||function(y){return O.runAsOwner(y);};}return O.runAsOwner(e);}return e();};var A=function(e){if(e.oController&&e.oController.connectToView){return e.oController.connectToView(e);}};var F=function(){if(i.onControllerConnected){return i.onControllerConnected(i.oController);}};if(this.initViewSettings){if(S.async){this.oAsyncState.promise=this.initViewSettings(S).then(function(){return P(q.bind(null,i,S),true);}).then(function(){return P(F,true);}).then(function(){return A(i);}).then(function(){return i.runPreprocessor("controls",i,false);}).then(function(){return P(i.fireAfterInit.bind(i),true);}).then(function(){return i;}).catch(function(e){this.deregister();throw e;}.bind(this));}else{this.initViewSettings(S);q(this,S);F();A(this);this.runPreprocessor("controls",this,true);this.fireAfterInit();}}};g.prototype.getController=function(){return this.oController;};g.prototype.byId=function(i){return sap.ui.getCore().byId(this.createId(i));};g.prototype.createId=function(i){if(!this.isPrefixedId(i)){i=this.getId()+"--"+i;}return i;};g.prototype.getLocalId=function(i){var P=this.getId()+"--";return(i&&i.indexOf(P)===0)?i.slice(P.length):null;};g.prototype.isPrefixedId=function(i){return!!(i&&i.indexOf(this.getId()+"--")===0);};g.prototype.getViewData=function(){return this.oViewData;};function r(){this.oAsyncState=null;}g.prototype.exit=function(){this.fireBeforeExit();delete this.oController;delete this.oPreprocessorInfo;if(this.oAsyncState){var D=r.bind(this);this.oAsyncState.promise.then(D,D);}};g.prototype.onAfterRendering=function(){this.fireAfterRendering();};g.prototype.onBeforeRendering=function(){this.fireBeforeRendering();};g.prototype.clone=function(i,l){var S={},K,e;for(K in this.mProperties&&!(this.isBound&&this.isBound(K))){if(this.mProperties.hasOwnProperty(K)){S[K]=this.mProperties[K];}}e=C.prototype.clone.call(this,i,l,{cloneChildren:false,cloneBindings:true});var E,x,j;for(E in e.mEventRegistry){x=e.mEventRegistry[E];for(j=x.length-1;j>=0;j--){if(x[j].oListener===this.getController()){x[j]={oListener:e.getController(),fFunction:x[j].fFunction,oData:x[j].oData};}}}e.applySettings(S);return e;};g.prototype.getPreprocessors=function(){return this.mPreprocessors;};g.prototype.getPreprocessorInfo=function(S){if(!this.oPreprocessorInfo){this.oPreprocessorInfo={name:this.sViewName,componentId:this._sOwnerId,id:this.getId(),caller:this+" ("+this.sViewName+")",sync:!!S};}if(g._supportInfo){this.oPreprocessorInfo._supportInfo=g._supportInfo;}return this.oPreprocessorInfo;};g.prototype.runPreprocessor=function(T,S,e){var j=this.getPreprocessorInfo(e),P=this.mPreprocessors&&this.mPreprocessors[T]||[],x,A,y;if(!e){A=function(j,z){return function(S){return z.preprocessor.then(function(B){return B.process(S,j,z._settings);});};};y=Promise.resolve(S);}for(var i=0,l=P.length;i<l;i++){if(e&&P[i]._syncSupport===true){x=P[i].preprocessor.process;S=x(S,j,P[i]._settings);}else if(!e){y=y.then(A(j,P[i]));}else{L.debug("Async \""+T+"\"-preprocessor was skipped in sync view execution for "+this.getMetadata().getClass()._sType+"View",this.getId());}}return e?S:y;};function s(T,e){if(!g._mPreprocessors[e]){g._mPreprocessors[e]={};}if(!g._mPreprocessors[e][T]){g._mPreprocessors[e][T]=[];}}function t(e,i,T){g._mPreprocessors[i][T].forEach(function(P){if(P._onDemand){L.error("Registration for \""+T+"\" failed, only one on-demand-preprocessor allowed",e.getMetadata().getName());return false;}});return true;}g.registerPreprocessor=function(T,P,e,S,O,i){if(typeof O!=="boolean"){i=O;O=false;}if(P){s(T,e);if(O&&!t(this,e,T)){return;}g._mPreprocessors[e][T].push({preprocessor:P,_onDemand:O,_syncSupport:S,_settings:i});L.debug("Registered "+(O?"on-demand-":"")+"preprocessor for \""+T+"\""+(S?" with syncSupport":""),this.getMetadata().getName());}else{L.error("Registration for \""+T+"\" failed, no preprocessor specified",this.getMetadata().getName());}};g.prototype.hasPreprocessor=function(T){return!!this.mPreprocessors[T].length;};g.create=function(O){var P=m({},O);P.async=true;P.viewContent=P.definition;var e=sap.ui.require("sap/ui/core/Component");var i;if(e&&M._sOwnerId){i=e.get(M._sOwnerId);}function w(){return v(P.id,P,P.type).loaded();}return new Promise(function(j,l){var x=u(P);sap.ui.require([x],function(y){j(y);},l);}).then(function(j){if(j.getMetadata().isA("sap.ui.core.mvc.XMLView")){P.processingMode="sequential";}if(i){return i.runAsOwner(w);}else{return w();}});};g._legacyCreate=v;sap.ui.view=function(i,e,T){var l=function(j){var N="";if(typeof i=="object"){N=i.viewName;}N=N||(e&&e.name);L[j]("Do not use deprecated view factory functions ("+N+"). "+"Use the static create function on the view module instead: [XML|JS|HTML|JSON|]View.create().","sap.ui.view",null,function(){return{type:"sap.ui.view",name:N};});};if(e&&e.async){l("info");}else{l("warning");}return v(i,e,T);};function v(i,e,T){var j=null,l={};if(typeof i==="object"||typeof i==="string"&&e===undefined){e=i;i=undefined;}if(e){if(typeof e==="string"){l.viewName=e;}else{l=e;}}c(!l.async||typeof l.async==="boolean","sap.ui.view factory: Special setting async has to be of the type 'boolean'!");if(i){l.id=i;}if(T){l.type=T;}var x=sap.ui.require('sap/ui/core/CustomizingConfiguration');if(x){var y=x.getViewReplacement(l.viewName,M._sOwnerId);if(y){L.info("Customizing: View replacement for view '"+l.viewName+"' found and applied: "+y.viewName+" (type: "+y.type+")");d(l,y);}else{L.debug("Customizing: no View replacement found for view '"+l.viewName+"'.");}}var z=u(l);j=w(z,l);return j;}function u(e){var i;if(!e.type){throw new Error("No view type specified.");}else if(e.type===f.JS){i='sap/ui/core/mvc/JSView';}else if(e.type===f.JSON){i='sap/ui/core/mvc/JSONView';}else if(e.type===f.XML){i='sap/ui/core/mvc/XMLView';}else if(e.type===f.HTML){i='sap/ui/core/mvc/HTMLView';}else if(e.type===f.Template){i='sap/ui/core/mvc/TemplateView';}else{throw new Error("Unknown view type "+e.type+" specified.");}return i;}function w(e,i){var j=sap.ui.require(e);if(!j){j=sap.ui.requireSync(e);if(i.async){L.warning("sap.ui.view was called without requiring the according view class.");}}return new j(i);}g.prototype.loaded=function(){if(this.oAsyncState&&this.oAsyncState.promise){return this.oAsyncState.promise;}else{return Promise.resolve(this);}};return g;});
