/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Focusable"],function(l,C,K,q){"use strict";var Q=C.extend("sap.m.QuickViewBase",{metadata:{library:"sap.m",properties:{},defaultAggregation:"pages",aggregations:{pages:{type:"sap.m.QuickViewPage",multiple:true,singularName:"page",bindable:"bindable"}},events:{navigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"},navOrigin:{type:"sap.ui.core.Control"}}},afterNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"},isTopPage:{type:"boolean"},navOrigin:{type:"sap.ui.core.Control"}}}}},renderer:{apiVersion:2,render:function(){}}});Q.prototype.navigateBack=function(){if(!this._oNavContainer.currentPageIsTopPage()){this._setNavOrigin(null);this._oNavContainer.back();}};Q.prototype.getNavContainer=function(){return this._oNavContainer;};Q.prototype._initPages=function(){var n=this._oNavContainer;n.destroyPages();n.init();var p=this.getAggregation("pages");if(!p){return;}var I=this.getId();for(var i=0;i<p.length;i++){var o=p[i];o._oPage=null;var N={hasBackButton:i>0,popover:this._oPopover,navContainer:n,quickViewId:I,quickView:this};o.setNavContext(N);var P=this._createPage(o);this._oNavContainer.addPage(P);}};Q.prototype._processKeyboard=function(e){if(e.shiftKey&&e.which===K.ENTER){this.navigateBack();e.preventDefault();}};Q.prototype._createPage=function(o){return o;};Q.prototype._navigate=function(e){var t=e.getParameter('to');var f=e.getParameter('from');var T=e.getParameter('toId');var F=e.getParameter('fromId');var i=q(document.getElementById(F)).index();var a=q(document.getElementById(T)).index();if(a==-1||a>i){t.addStyleClass('sapMNavItemOffset');}else{f.addStyleClass('sapMNavItemOffset');}f.$().parents('.sapMPanelContent').scrollTop(0);var p=e.getParameters();if(this._navOrigin){p.navOrigin=this._navOrigin;}this.fireNavigate(p);};Q.prototype._afterNavigate=function(e){var t=e.getParameter('to');var f=e.getParameter('from');var T=e.getParameter('toId');var F=e.getParameter('fromId');var i=q(document.getElementById(F)).index();var a=q(document.getElementById(T)).index();if(a>i){t.removeStyleClass('sapMNavItemOffset');}else{f.removeStyleClass('sapMNavItemOffset');}var p=e.getParameters();p.isTopPage=this._oNavContainer.currentPageIsTopPage();if(this._navOrigin){p.navOrigin=this._navOrigin;}this.fireAfterNavigate(p);this._setLinkWidth();setTimeout(this._restoreFocus.bind(this),0);};Q.prototype._restoreFocus=function(){var p=this._oNavContainer.getCurrentPage();var f=this._oNavContainer._mFocusObject[p.getId()];if(!f){var c=p.getContent();if(c&&c.length>1){f=c[1].$().firstFocusableDomRef();}}if(f){f.focus();}};Q.prototype._setLinkWidth=function(){};Q.prototype._setNavOrigin=function(c){this._navOrigin=c;};return Q;});