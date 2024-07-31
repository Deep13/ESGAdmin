/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Core','sap/ui/core/Control','sap/ui/core/Element','sap/ui/Device','./ListItemBase','./Button','./ToolbarSeparator','sap/m/OverflowToolbar','sap/m/OverflowToolbarLayoutData','sap/ui/core/IconPool','sap/ui/core/Icon','sap/ui/core/library'],function(l,C,a,E,D,L,B,T,O,b,I,c,d){'use strict';var P=d.Priority;var e=l.ButtonType;var f=l.OverflowToolbarPriority;var r=C.getLibraryResourceBundle('sap.m'),g=r.getText('NOTIFICATION_LIST_ITEM_CLOSE'),h=r.getText('NOTIFICATION_LIST_GROUP_CLOSE');var N=L.extend('sap.m.NotificationListBase',{metadata:{library:'sap.m',"abstract":true,properties:{priority:{type:'sap.ui.core.Priority',group:'Appearance',defaultValue:P.None},title:{type:'string',group:'Appearance',defaultValue:''},datetime:{type:'string',group:'Appearance',defaultValue:''},showButtons:{type:'boolean',group:'Behavior',defaultValue:true},showCloseButton:{type:'boolean',group:'Behavior',defaultValue:true},authorName:{type:'string',group:'Appearance',defaultValue:''},authorPicture:{type:'sap.ui.core.URI'}},aggregations:{buttons:{type:'sap.m.Button',multiple:true},_closeButton:{type:'sap.m.Button',multiple:false,visibility:"hidden"},_overflowToolbar:{type:'sap.m.OverflowToolbar',multiple:false,visibility:"hidden"},_priorityIcon:{type:'sap.ui.core.Icon',multiple:false,visibility:"hidden"}},events:{close:{}}},renderer:null});N.prototype._activeHandling=function(){};N.prototype.updateSelectedDOM=function(){};N.prototype.getAccessibilityText=function(){return'';};N.prototype.getButtons=function(){var i=this._getCloseButton(),t=this._getToolbarSeparator();return this._getOverflowToolbar().getContent().filter(function(j){return j!==i&&j!==t;},this);};N.prototype.addButton=function(o){var i=this._getOverflowToolbar(),j=i.getContent().length;if(D.system.phone){j-=2;}i.insertContent(o,j);this.invalidate();return this;};N.prototype.insertButton=function(o,i){this._getOverflowToolbar().insertContent(o,i);this.invalidate();return this;};N.prototype.removeButton=function(o){var i=this._getOverflowToolbar().removeContent(o.getId());this.invalidate();return i;};N.prototype.removeAllButtons=function(){var o=this._getOverflowToolbar(),i=this.getButtons();i.forEach(function(j){o.removeContent(j.getId());});this.invalidate();return this;};N.prototype.destroyButtons=function(){var i=this.getButtons();i.forEach(function(j){j.destroy();});this.invalidate();return this;};N.prototype.clone=function(){var i=L.prototype.clone.apply(this,arguments);i.destroyAggregation('_overflowToolbar');var o=this.getAggregation('_overflowToolbar');if(o){i.setAggregation("_overflowToolbar",o.clone(),true);}return i;};N.prototype._getOverflowToolbar=function(){var o=this.getAggregation('_overflowToolbar'),t,i;if(!o){o=new O(this.getId()+'-overflowToolbar',{});this.setAggregation("_overflowToolbar",o,true);if(D.system.phone){i=this._getCloseButton();i.setLayoutData(new b({priority:f.AlwaysOverflow}));t=new T();t.setLayoutData(new b({priority:f.AlwaysOverflow}));o.addContent(t);o.addContent(i);}}return o;};N.prototype._getCloseButton=function(){var i,o,j,k;if(D.system.phone){o=this._getOverflowToolbar();j=o.getContent();if(o&&j.length){k=j.length-1;i=j[k];}}else{i=this.getAggregation("_closeButton");}if(!i){if(D.system.phone){i=new B(this.getId()+'-closeButtonOverflow',{text:this.isA("sap.m.NotificationListItem")?g:h,type:e.Default,press:function(){this.close();}.bind(this)});}else{i=new B(this.getId()+'-closeButtonX',{icon:I.getIconURI('decline'),type:e.Transparent,tooltip:this.isA("sap.m.NotificationListItem")?g:h,press:function(){this.close();}.bind(this)});this.setAggregation("_closeButton",i);}}return i;};N.prototype._getToolbarSeparator=function(){if(!D.system.phone){return null;}var t,o=this._getOverflowToolbar(),i=o.getContent(),j;if(o&&i.length){j=i.length-2;t=i[j];}return t;};N.prototype.exit=function(){};N.prototype._hasActionButtons=function(){return this.getShowButtons()&&this.getButtons().length;};N.prototype._shouldRenderCloseButton=function(){return!D.system.phone&&this.getShowCloseButton();};N.prototype._shouldRenderOverflowToolbar=function(){var i=this._hasActionButtons();if(D.system.phone){return i||this.getShowCloseButton();}return i;};N.prototype.onBeforeRendering=function(){var j=this.getButtons(),k,m;if(D.system.phone){this._updatePhoneButtons();return;}k=j.length>1?f.AlwaysOverflow:f.NeverOverflow;for(var i=0;i<j.length;i++){m=j[i];m.setLayoutData(new b({priority:i===0?k:f.AlwaysOverflow}));}};N.prototype._updatePhoneButtons=function(){var i=this._getCloseButton(),j=this.isA("sap.m.NotificationListGroup"),k=j?h:g,m=j&&this.getCollapsed(),n=!m&&this._hasActionButtons(),s=this.getShowCloseButton(),t=this._getToolbarSeparator(),p;this.getButtons().forEach(function(o){if(n){p=f.AlwaysOverflow;o.removeStyleClass('sapMNLIBHiddenButton');}else{p=f.NeverOverflow;o.addStyleClass('sapMNLIBHiddenButton');}o.setLayoutData(new b({priority:p}));});if(!s){i.setVisible(false);t.setVisible(false);return;}i.setVisible(true);if(n){i.setText(k);i.setTooltip('');i.setType(e.Default);i.setIcon('');i.setLayoutData(new b({priority:f.AlwaysOverflow}));t.setVisible(true);}else{i.setText('');i.setTooltip(k);i.setType(e.Transparent);i.setIcon(I.getIconURI('decline'));i.setLayoutData(new b({priority:f.NeverOverflow}));t.setVisible(false);}};N.prototype.close=function(){var p=this.getParent();this.fireClose();var H=!!this.getParent();if(!H&&p&&p instanceof E){var i={onAfterRendering:function(){p.focus();p.removeEventDelegate(i);}};p.addEventDelegate(i);}};N.prototype._getPriorityIcon=function(){var p=this.getAggregation('_priorityIcon');if(!p){p=new c({src:'sap-icon://message-error',useIconTooltip:false});this.setAggregation("_priorityIcon",p,true);}return p;};return N;});
