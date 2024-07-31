/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device","sap/ui/core/InvisibleText"],function(l,D,I){"use strict";var F=l.FacetFilterType;var a={apiVersion:2};a.render=function(r,c){if(c.getType()===F.Light||c.getShowSummaryBar()){a.renderSummaryBar(r,c);}else{a.renderSimpleFlow(r,c);}};a.renderSimpleFlow=function(r,c){r.openStart("div",c);r.class("sapMFF");r.accessibilityState({role:"toolbar",roledescription:c._bundle.getText("FACETFILTER_TITLE")});if(c._lastScrolling){r.class("sapMFFScrolling");}else{r.class("sapMFFNoScrolling");}if(c.getShowReset()){r.class("sapMFFResetSpacer");}r.openEnd();if(D.system.desktop){r.renderControl(c._getScrollingArrow("left"));}r.openStart("div",c.getId()+"-head");r.class("sapMFFHead");r.openEnd();a.renderFacetFilterListButtons(c,r);if(c.getShowPersonalization()){a.renderAddFilterButton(c,r);}r.close("div");if(D.system.desktop){r.renderControl(c._getScrollingArrow("right"));}if(c.getShowReset()){r.openStart("div");r.class("sapMFFResetDiv");r.openEnd();r.renderControl(c.getAggregation("resetButton"));r.close("div");}r.close("div");};a.renderSummaryBar=function(r,c){r.openStart("div",c);r.class("sapMFF");r.openEnd();r.renderControl(c.getAggregation("summaryBar"));r.close("div");};a.getAriaAnnouncement=function(k,b){return I.getStaticId("sap.m",b||"FACETFILTER_"+k.toUpperCase());};a.renderFacetFilterListButtons=function(c,r){var L=c._getSequencedLists(),b=L.length,s=c.getShowPersonalization(),A=s&&(c.getType()===F.Simple),f=A?b+1:b,B,i;for(i=0;i<b;i++){var d=L[i].getItems().length>0,e=L[i].getActive(),g=c._bCheckForAddListBtn&&(d||e);if(!c._bCheckForAddListBtn||g){B=c._getButtonForList(L[i]);a.addPositionInfoForButton(c,B,i+1,f);if(s){B.addAriaDescribedBy(a.getAriaAnnouncement("ARIA_REMOVE"));}r.renderControl(B);if(s){r.renderControl(c._getFacetRemoveIcon(L[i]));}}}return this;};a.renderAddFilterButton=function(c,r){var A=c.getAggregation("addFacetButton"),b=c._getSequencedLists().length+1;a.addPositionInfoForButton(c,A,b,b);r.renderControl(A);return this;};a.addPositionInfoForButton=function(c,b,p,s){var S=a.createStaticPositioningLabel(c,p,s);a.clearOldPositioningLabels(c,b);b.addAriaDescribedBy(S);return this;};a.clearOldPositioningLabels=function(c,b){var o=b.removeAllAriaDescribedBy(),r=this.getAriaAnnouncement("ARIA_REMOVE"),i;o.forEach(function(s){if(r===s){return;}i=sap.ui.getCore().byId(s);i&&i.destroy();});return this;};a.createStaticPositioningLabel=function(c,p,s){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m"),f=r.getText("FACETFILTER_ARIA_FACET_FILTER"),P=r.getText("FACETFILTERLIST_ARIA_POSITION",[p,s]),S=new I({text:f+" "+P}).toStatic();c._aOwnedLabels.push(S.getId());return S;};return a;},true);
