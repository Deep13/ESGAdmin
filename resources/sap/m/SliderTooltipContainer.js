/*!
* OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(['./library','./SliderUtilities','sap/ui/core/Control','sap/ui/core/Popup','./SliderTooltipContainerRenderer',"sap/ui/thirdparty/jquery"],function(L,S,C,P,a,q){"use strict";var b=C.extend("sap.m.SliderTooltipContainer",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"0px"}},associations:{associatedTooltips:{type:"sap.m.SliderTooltipBase",multiple:true}}}});b.prototype.init=function(){this.oPopup=new P();this.oPopup.setShadow(false);this.oPopup.setAutoClose(false);this._scrollListener=this._getScrollListener();this._bClosedFromOverflow=false;this._bRtl=sap.ui.getCore().getConfiguration().getRTL();};b.prototype._handleTabNavigation=function(e){var p=this._oParentSlider instanceof sap.m.RangeSlider;e.preventDefault();this[p?"_handleRangeSliderF2":"_handleSliderF2"].apply(this,arguments);};b.prototype._handleSliderF2=function(){this._oParentSlider.focus();};b.prototype._handleRangeSliderF2=function(e){var h=this._oParentSlider._getHandleForTooltip(e.srcControl);q(h).trigger("focus");};b.prototype.onsaptabnext=b.prototype._handleTabNavigation;b.prototype.onsaptabprevious=b.prototype._handleTabNavigation;b.prototype.onkeydown=function(e){if(e.keyCode===S.CONSTANTS.F2_KEYCODE){this._handleTabNavigation(e);}};b.prototype.show=function(c){this.oPopup.setContent(this);this._$ParentSlider=c.$();this._oParentSlider=c;this.oPopup.open(0,P.Dock.BeginTop,P.Dock.BeginTop,this._$ParentSlider,'0 -24','flip');document.addEventListener("scroll",this._scrollListener,true);};b.prototype._getScrollListener=function(){return function(){clearTimeout(this._scrollDebounce);this._scrollDebounce=setTimeout(this.repositionTooltips.bind(this),0);}.bind(this);};b.prototype.hide=function(){this.oPopup.close();document.removeEventListener("scroll",this._scrollListener,true);};b.prototype.repositionTooltips=function(){var p=this._oParentSlider instanceof sap.m.RangeSlider,t=this._oParentSlider.getUsedTooltips(),T=this.getAssociatedTooltipsAsControls()[0].$().outerHeight(true);if(this.getDomRef()){this[p?"_positionRangeTooltips":"_positionTooltip"].call(this,t,arguments[0],arguments[1]);this.getDomRef().style["top"]=(this._$ParentSlider.offset().top-T)+"px";this._handleOverflow();}};b.prototype._positionTooltip=function(t,m,M){var T=this._getTooltipPosition(t[0].getValue(),m,M),A=this._bRtl?"right":"left";if(T){this.getDomRef().children[0].style[A]=T;}};b.prototype._handleOverflow=function(){var p=this.getDomRef(),s,c;if(p){s=S.getElementScrollableParent(this._$ParentSlider[0].parentNode);c=S.isScrolledIntoView(this._$ParentSlider[0],s);if(!c){this._bClosedFromOverflow=true;this.hide();}}};b.prototype._positionRangeTooltips=function(t,m,M){var r=this._bRtl,A=r?"right":"left",s=r?"left":"right",R=this._oParentSlider.getRange(),f=S.getPercentOfValue(R[0]>R[1]?R[1]:R[0],m,M),e=S.getPercentOfValue(R[0]>R[1]?R[0]:R[1],m,M),T=this.getAssociatedTooltipsAsControls()[0].$().outerWidth(),i=S.getPercentOfValue(+(t[0].getValue()),m,M),E=S.getPercentOfValue(+(t[1].getValue()),m,M),p=this._oParentSlider.$("progress"),c=this.$("container"),d=this._$ParentSlider.width(),o=false,g=T-S.CONSTANTS.TOOLTIP_SIDE_PADDING,h=(((g+S.CONSTANTS.CHARACTER_WIDTH_PX)/2)/d)*100,j=f-(h)-(h*2-(e-f))/2,k={"min-width":(2*T)+(S.CONSTANTS.TOOLTIP_BORDER*2)+"px"},l;k[A]="calc("+i+"%"+" - "+((T/2)-S.CONSTANTS.HANDLE_HALF_WIDTH)+"px)";k[s]="calc("+(100-E)+"% "+"- "+(T-((T/2)-S.CONSTANTS.HANDLE_HALF_WIDTH-S.CONSTANTS.TOOLTIP_BORDER))+"px)";if(p.outerWidth()<=(T/2)+(T-S.CONSTANTS.HANDLE_HALF_WIDTH)){k[A]="calc("+j+"%"+" + "+S.CONSTANTS.HANDLE_HALF_WIDTH+"px)";o=true;}c.css(k);l=this._$ParentSlider.offset();if((c.offset().left+c.outerWidth())>(l.left+this._$ParentSlider.outerWidth())){k=this[r?"_getStickedToStart":"_getStickedToEnd"].call(this,k,A,s,o);}if((c.offset().left<=l.left)){k=this[r?"_getStickedToEnd":"_getStickedToStart"].call(this,k,A,s,o);}c.css(k);};b.prototype._getStickedToStart=function(c,A){c[A]="0";return c;};b.prototype._getStickedToEnd=function(c,A,s,o){var t=this.getAssociatedTooltipsAsControls()[0].$().outerWidth();c[s]="calc(0% - "+(2*S.CONSTANTS.HANDLE_HALF_WIDTH)+"px)";if(o){c[A]="calc(100% - "+(t+(t-2*S.CONSTANTS.HANDLE_HALF_WIDTH))+"px)";}return c;};b.prototype._getTooltipPosition=function(t,m,M){var p=S.getPercentOfValue(+(t),m,M),T=this.getAssociatedTooltipsAsControls()[0].$().outerWidth(),s=this._$ParentSlider.outerWidth(),f=(100*S.CONSTANTS.SLIDER_SIDE_PADDING)/s,c=((100*T)/s);if(p+f<(c/2)){return"0";}else if(p-f>100-(c/2)){return"calc(100% - "+(T-(S.CONSTANTS.HANDLE_HALF_WIDTH*2))+"px)";}else{return"calc("+p+"% - "+((T/2)-S.CONSTANTS.HANDLE_HALF_WIDTH)+"px)";}};b.prototype.setWidth=function(w){if(this.getDomRef()){this.$().width(w);}return this.setProperty("width",w,true);};b.prototype.getAssociatedTooltipsAsControls=function(){var A=this.getAssociation("associatedTooltips")||[];return A.map(function(t){return sap.ui.getCore().byId(t);});};b.prototype.onmouseout=function(e){var s=q.contains(this._oParentSlider.getDomRef(),document.activeElement),c=q.contains(this.getDomRef(),document.activeElement),t=q.contains(this._oParentSlider.getDomRef(),e.toElement),T=q.contains(this.getDomRef(),e.toElement);if(s||c||t||T){return;}this.hide();};b.prototype.onfocusout=function(e){if(q.contains(this._$ParentSlider[0],e.relatedTarget)||q.contains(this.getDomRef(),e.relatedTarget)){return;}if(this._bClosedFromOverflow){this._oParentSlider.focus();this._bClosedFromOverflow=false;}this.hide();};b.prototype.onBeforeRendering=function(){this._bRtl=sap.ui.getCore().getConfiguration().getRTL();};b.prototype.exit=function(){this._oParentSlider=null;this._$ParentSlider=null;document.removeEventListener("scroll",this._scrollListener,true);};return b;});
