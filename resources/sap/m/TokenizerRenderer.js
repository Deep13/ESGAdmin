/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device','sap/ui/core/InvisibleText'],function(D,I){"use strict";var T={apiVersion:2};T.render=function(r,c){if(c.getParent()&&(c.getParent()instanceof sap.m.MultiInput||c.getParent()instanceof sap.m.MultiComboBox)){r.openStart("div",c);}else{r.openStart("div",c).attr("tabindex","0");}r.class("sapMTokenizer");if(!c.getEditable()){r.class("sapMTokenizerReadonly");}if(!c.getEnabled()){r.class("sapMTokenizerDisabled");}var t=c.getTokens();if(!t.length){r.class("sapMTokenizerEmpty");}r.style("max-width",c.getMaxWidth());var p=c.getWidth();if(p){r.style("width",p);}var a={role:"listbox"};a.labelledby={value:I.getStaticId("sap.m","TOKENIZER_ARIA_LABEL"),append:true};r.accessibilityState(c,a);r.openEnd();r.renderControl(c.getAggregation("_tokensInfo"));c._bCopyToClipboardSupport=false;if((D.system.desktop||D.system.combi)&&t.length){r.openStart("div",c.getId()+"-clip").class("sapMTokenizerClip");if(window.clipboardData){r.attr("contenteditable","true");r.attr("tabindex","-1");}r.openEnd();r.unsafeHtml("&nbsp");r.close("div");c._bCopyToClipboardSupport=true;}r.openStart("div",c.getId()+"-scrollContainer");r.class("sapMTokenizerScrollContainer");r.openEnd();T._renderTokens(r,c);r.close("div");T._renderIndicator(r,c);r.close("div");};T._renderTokens=function(r,c){var i=0,t=c.getTokens(),l=t.length;for(i=0;i<l;i++){r.renderControl(t[i]);}};T._renderIndicator=function(r,c){r.openStart("span");r.class("sapMTokenizerIndicator");if(c.getHiddenTokensCount()===0){r.class("sapUiHidden");}r.openEnd().close("span");};return T;},true);
