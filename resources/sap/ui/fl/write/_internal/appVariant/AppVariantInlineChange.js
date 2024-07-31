/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/ManagedObject","sap/ui/fl/descriptorRelated/internal/Utils","sap/base/Log"],function(q,M,U,L){"use strict";var A=M.extend("sap.ui.fl.write._internal.appVariant.AppVariantInlineChange",{metadata:{library:"sap.ui.fl"},constructor:function(p){M.apply(this);if(!q.isPlainObject(p)){L.error("Constructor : sap.ui.fl.write._internal.appVariant.AppVariantInlineChange: mPropertyBag is not defined");}U.checkTexts(p.texts);this._oDefinition=p;return this;}});A.prototype._getChangeType=function(){return this._oDefinition.changeType;};A.prototype.getMap=function(){return this._oDefinition;};A.prototype.getContent=function(){return this._oDefinition.content;};A.prototype.getTexts=function(){return this._oDefinition.texts;};A.prototype.getHostingIdSuffix=function(){return this._sHostingIdSuffix;};A.prototype.setHostingIdSuffix=function(h){this._sHostingIdSuffix=h;};A.prototype.replaceHostingIdForTextKey=function(n,o,c,t){var C=JSON.stringify(c);if(t){Object.keys(t).forEach(function(T){var s;if(T.indexOf(o)===0){s=n+T.substring(o.length);this._oDefinition.texts[s]=this._oDefinition.texts[T];delete this._oDefinition.texts[T];C=C.split("{{"+T+"}}").join("{{"+s+"}}");}},this);this._oDefinition.content=JSON.parse(C);}};A.prototype.setHostingIdForTextKey=function(h){if(this.getHostingIdSuffix()){var t=h+this.getHostingIdSuffix();if(this._oDefinition.texts){this._oDefinition.texts[t]=this._oDefinition.texts[""];delete this._oDefinition.texts[""];}}};return A;},true);
