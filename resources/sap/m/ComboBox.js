/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ComboBoxTextField','./ComboBoxBase','./List','./library','sap/ui/Device','sap/ui/core/Item','./StandardListItem','./ComboBoxRenderer','sap/ui/base/ManagedObjectObserver',"sap/ui/dom/containsOrEquals","sap/m/inputUtils/scrollToItem","sap/m/inputUtils/inputsDefaultFilter","sap/ui/events/KeyCodes","./Toolbar","sap/base/assert","sap/base/security/encodeXML","sap/ui/core/Core","sap/base/Log","sap/ui/dom/jquery/control"],function(C,a,L,l,D,I,S,b,M,c,s,d,K,T,f,g,h,j,q){"use strict";var k=l.ListType;var m=l.ListMode;var n=a.extend("sap.m.ComboBox",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ComboBox.designtime",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},filterSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{change:{parameters:{value:{type:"string"},itemPressed:{type:"boolean"}}},selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},dnd:{draggable:false,droppable:true}}});function H(e,i){if(!i){return;}var r=e.getFocusDomRef(),t=e._getSelectionRange().start,u=r.value.substring(0,r.selectionStart),v=e._shouldResetSelectionStart(i),w=e.getSelectedItem(),G=i.isA("sap.ui.core.SeparatorItem"),x=e.getListItem(i);e.handleListItemsVisualFocus(x);e.setSelection(i);if(i!==w&&!G){e.updateDomValue(i.getText());e.fireSelectionChange({selectedItem:i});i=e.getSelectedItem();x=e.getListItem(i);if(v){t=0;}e.selectText(t,r.value.length);e._bIsLastFocusedItemHeader=false;}if(G){e.setSelectedItem(null);e.fireSelectionChange({selectedItem:null});e.updateDomValue(u);e._bIsLastFocusedItemHeader=true;e._getGroupHeaderInvisibleText().setText(e._oRb.getText("LIST_ITEM_GROUP_HEADER")+" "+i.getText());}if(e.isOpen()){e.removeStyleClass("sapMFocus");e._getList().addStyleClass("sapMListFocus");}else{e.addStyleClass("sapMFocus");}s(x,e.getPicker());}function o(i,e){if(document.activeElement===this.getFocusDomRef()){this.selectText(i,e);}}function p(i){var e=this.getSelectedItem(),r=this.getListItem(e),t=e&&r&&r.getDomRef(),u=t&&t.offsetTop,v=t&&t.offsetHeight,P=this.getPicker(),w=P.getDomRef("cont"),x=w.clientHeight;if(e&&((u+v)>(x))){if(!i){this._getList().$().css("visibility","hidden");}else{w.scrollTop=u-v/2;this._getList().$().css("visibility","visible");}}}n.prototype._getSelectedItemText=function(i){i=i||this.getSelectedItem();if(!i){i=this.getDefaultSelectedItem();}if(i){return i.getText();}return"";};n.prototype.setSelectedIndex=function(i,_){var e;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);e=_[i];if(e){this.setSelection(e);}};n.prototype.revertSelection=function(){var P,e=this.getPickerTextField();this.setSelectedItem(this._oSelectedItemBeforeOpen);this.setValue(this._sValueBeforeOpen);if(this.getSelectedItem()===null){P=this._sValueBeforeOpen;}else{P=this._oSelectedItemBeforeOpen.getText();}e&&e.setValue(P);};n.prototype.filterItems=function(O){var e,i=this.getItems(),F=[],r=[],t=O.properties.indexOf("additionalText")>-1,u=this.fnFilter||d,G=[],v=false;this._oFirstItemTextMatched=null;i.forEach(function(w){if(w.isA("sap.ui.core.SeparatorItem")){G.push({header:w,visible:false});v=true;e=this.getListItem(w);e&&e.setVisible(false);return;}var x=u.call(this,O.value,w,t);if(x&&v&&G.length){G[G.length-1].visible=true;v=false;}if(x){r.push(w);F.push(w);}}.bind(this));i.forEach(function(w){if(w.isA("sap.ui.core.SeparatorItem")){return;}var x=F.indexOf(w)>-1;var y=r.indexOf(w)>-1;if(!this._oFirstItemTextMatched&&y){this._oFirstItemTextMatched=w;}e=this.getListItem(w);e&&e.setVisible(x);},this);G.forEach(function(w){if(w.visible){e=this.getListItem(w.header);e&&e.setVisible(true);}}.bind(this));return F;};n.prototype._filterStartsWithItems=function(i,e){var r=i.toLowerCase();var t=this.getItems(),F=t.filter(function(u){return u[e]&&u[e]().toLowerCase().startsWith(r);});return F;};n.prototype._getFilters=function(){return this.getFilterSecondaryValues()?["text","additionalText"]:["text"];};n.prototype.getNextFocusableItem=function(e){var A=this.getSelectableItems(),i=this.getNonSeparatorSelectableItems(A),F=this.hasStyleClass("sapMFocus"),r=this.getSelectedItem()||this._getItemByListItem(this._oLastFocusedListItem),t=this.getFormattedTextFocused(),N;if((F&&this.isOpen())||t){N=A[0];}else if(F&&!this.getValueStateLinks().length){N=i[i.indexOf(r)+(e?1:-1)];}else{N=A[A.indexOf(r)+(e?1:-1)];}if(t||(!t&&r===A[0]&&!e&&this.getValueStateLinks().length)){this.setProperty("formattedTextFocused",!t);}return N;};n.prototype.getNonSeparatorSelectableItems=function(i){return i.filter(function(e){return!e.isA("sap.ui.core.SeparatorItem");});};n.prototype._itemsTextStartsWithTypedValue=function(i,t){if(!i||typeof t!="string"||t==""){return false;}return i.getText().toLowerCase().startsWith(t.toLowerCase());};n.prototype._shouldResetSelectionStart=function(i){var e=this.getFocusDomRef(),r=this._getSelectionRange(),t=r.start!==r.end,u=e.value.substring(0,r.start),v=this._itemsTextStartsWithTypedValue(i,u);return!(v&&(t||this._bIsLastFocusedItemHeader));};n.prototype._getSelectionRange=function(){var e=this.getFocusDomRef(),v=this.getValue(),i=e.selectionStart,r=e.selectionEnd,R={start:i,end:r};if(!(D.browser.msie||D.browser.edge)){return R;}if(this._bIsLastFocusedItemHeader){R.start=v.length;R.end=v.length;}return R;};n.prototype.handleListItemsVisualFocus=function(e){if(this._oLastFocusedListItem){this._oLastFocusedListItem.removeStyleClass("sapMLIBFocused");this._oLastFocusedListItem=null;}else if(this.isOpen()&&this.getFocusDomRef()){this.getFocusDomRef().setAttribute("aria-activedescendant",e.getId());}if(e){this._oLastFocusedListItem=e;e.addStyleClass("sapMLIBFocused");}};n.prototype.setSelection=function(i){var e=this._getList(),r=this._getSuggestionsPopover(),t,u;this.setAssociation("selectedItem",i);this._setPropertyProtected("selectedItemId",(i instanceof I)?i.getId():i,true);if(typeof i==="string"){i=h.byId(i);}if(e){t=this.getListItem(i);if(t){e.setSelectedItem(t,true);}else{e.removeSelections(true);}}u=i?i.getKey():"";this._setPropertyProtected("selectedKey",u);if(r){r._iPopupListSelectedIndex=this.getItems().indexOf(i);}};n.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};n.prototype._mapItemToListItem=function(i){var e,r,t,A;var R=this.getRenderer();if(!i){return null;}A=(i.getAdditionalText&&this.getShowSecondaryValues())?i.getAdditionalText():"";r=R.CSS_CLASS_COMBOBOXBASE+"Item";t=(this.isItemSelected(i))?r+"Selected":"";if(i.isA("sap.ui.core.SeparatorItem")){e=this._mapSeparatorItemToGroupHeader(i,R);}else{e=new S({type:k.Active,info:A,visible:i.getEnabled()}).addStyleClass(r+" "+t);}e.setTitle(i.getText());this.setSelectable(i,i.getEnabled());e.setTooltip(i.getTooltip());i.data(R.CSS_CLASS_COMBOBOXBASE+"ListItem",e);i.getCustomData().forEach(function(u){e.addCustomData(u.clone());});this._oItemObserver.observe(i,{properties:["text","additionalText","enabled","tooltip"]});return e;};n.prototype._forwardItemProperties=function(P){var i=P.object,e=i.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"ListItem"),r={text:"title",enabled:"visible",tooltip:"tooltip"},A,t,u;if(Object.keys(r).indexOf(P.name)>-1){t=r[P.name];u="set"+t.charAt(0).toUpperCase()+t.slice(1);e[u](P.current);}if(P.name==="additionalText"){A=this.getShowSecondaryValues()?P.current:"";e.setInfo(A);}};n.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};n.prototype.setAssociation=function(A,i,e){var r=this._getList();if(r&&(A==="selectedItem")){if(!(i instanceof I)){i=this.findItem("id",i);}r.setSelectedItem(this.getListItem(i),true);}return a.prototype.setAssociation.apply(this,arguments);};n.prototype.removeAllAssociation=function(A,e){var i=this._getList();if(i&&(A==="selectedItem")){L.prototype.removeAllAssociation.apply(i,arguments);}return a.prototype.removeAllAssociation.apply(this,arguments);};n.prototype.init=function(){this._oRb=h.getLibraryResourceBundle("sap.m");a.prototype.init.apply(this,arguments);this.bOpenValueStateMessage=true;this._sValueBeforeOpen="";this._sInputValueBeforeOpen="";this._oSelectedItemBeforeOpen=null;this._oFirstItemTextMatched=null;this.bIsFocused=false;if(D.system.phone){this.attachEvent("_change",this.onPropertyChange,this);}this._oLastFocusedListItem=null;this._bIsLastFocusedItemHeader=null;this._oItemObserver=new M(this._forwardItemProperties.bind(this));};n.prototype.onBeforeRendering=function(){a.prototype.onBeforeRendering.apply(this,arguments);var e=this.getSelectedItem(),i=this._getList(),r=e&&this.getListItem(e),F=this.getProperty("formattedTextFocused"),t=this.getPicker()&&this.getPicker().getCustomHeader(),P=(D.browser.msie&&t&&t.getFormattedText)?t.getFormattedText():t;this.synchronizeSelection();if(!this.getOpen()&&document.activeElement===this.getFocusDomRef()){this.addStyleClass("sapMFocus");}if(F){P.addStyleClass("sapMPseudoFocus");i.removeStyleClass("sapMListFocus");r.removeStyleClass("sapMLIBFocused");this.removeStyleClass("sapMFocus");}else if(P){P.removeStyleClass("sapMPseudoFocus");}};n.prototype._fillList=function(){var e=this._getList(),r,t,u,i,v;if(!e){return;}if(this._oLastFocusedListItem){v=this._getItemByListItem(this._oLastFocusedListItem);}e.destroyItems();r=this.getItems();if(this._sInputValueBeforeOpen){r=this.filterItems({properties:this._getFilters(),value:this._sInputValueBeforeOpen});}for(i=0,u=r.length;i<u;i++){t=this._mapItemToListItem(r[i]);e.addAggregation("items",t,true);}if(v){this._oLastFocusedListItem=this.getListItem(v);}};n.prototype.exit=function(){a.prototype.exit.apply(this,arguments);this._oRb=null;this._oSelectedItemBeforeOpen=null;this._oFirstItemTextMatched=null;this._oLastFocusedListItem=null;if(this._oSuggestionPopover){if(this._oPickerCustomHeader){this._oPickerCustomHeader.destroy();this._oPickerCustomHeader=null;}this._oSuggestionPopover.destroy();this._oSuggestionPopover=null;}if(this._oItemObserver){this._oItemObserver.disconnect();this._oItemObserver=null;}};n.prototype.onBeforeRenderingPicker=function(){var O=this["onBeforeRendering"+this.getPickerType()];O&&O.call(this);};n.prototype.onBeforeRenderingDropdown=function(){var P=this.getPicker(),w=(this.$().outerWidth()/parseFloat(l.BaseFontSize))+"rem";if(P){P.setContentMinWidth(w);}};n.prototype.onBeforeRenderingList=function(){if(this.bProcessingLoadItemsEvent){var e=this._getList(),F=this.getFocusDomRef();if(e){e.setBusy(true);}if(F){F.setAttribute("aria-busy","true");}}};n.prototype.onAfterRenderingPicker=function(){var O=this["onAfterRendering"+this.getPickerType()];O&&O.call(this);p.call(this,false);};n.prototype.onAfterRenderingList=function(){var e=this.getSelectedItem(),i=this.getListItem(e);if(this.bProcessingLoadItemsEvent&&(this.getItems().length===0)){return;}var r=this._getList(),F=this.getFocusDomRef();this.highlightList(this._sInputValueBeforeOpen);if(e){r.setSelectedItem(i);this.handleListItemsVisualFocus(i);}if(r){r.setBusy(false);}if(F){F.removeAttribute("aria-busy");}};n.prototype.oninput=function(e){a.prototype.oninput.apply(this,arguments);this.syncPickerContent();if(e.isMarked("invalid")){return;}this.loadItems(function(){this.handleInputValidation(e,this.isComposingCharacter());},{name:"input",busyIndicator:false});if(this.bProcessingLoadItemsEvent&&(this.getPickerType()==="Dropdown")){this.open();}if(this._oLastFocusedListItem){this._oLastFocusedListItem.removeStyleClass("sapMLIBFocused");this._oLastFocusedListItem=null;}this.setFormattedTextFocused(false);this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus");if(this._getItemsShownWithFilter()){this.toggleIconPressedStyle(true);}};n.prototype.handleInputValidation=function(e,i){var v,r,F,t,u,w=this.getSelectedItem(),V=e.target.value,E=V==="",x=e.srcControl,y=(this.getPickerType()==="Dropdown"),z=this.getListItem(w);if(E&&!this.bOpenedByKeyboardOrButton&&!this.isPickerDialog()){v=this.getItems();}else{v=this.filterItems({properties:this._getFilters(),value:V});}F=v[0];t=v.some(function(A){return A.getKey()===this.getSelectedKey();},this);r=this.intersectItems(this._filterStartsWithItems(V,'getText'),v);u=!E&&F&&F.getEnabled();if(F&&this.getSelectedKey()&&!t){this.setSelection(null);}if(u&&x&&x._bDoTypeAhead){this.handleTypeAhead(x,v,V,i);}else if(u&&r[0]&&V===r[0].getText()){this.setSelection(r[0]);}else{this.setSelection(null);}if(w!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});z=this.getListItem(this.getSelectedItem());}this._sInputValueBeforeOpen=V;if(this.isOpen()){setTimeout(function(){this.highlightList(V);}.bind(this));}if(F){if(E&&!this.bOpenedByKeyboardOrButton){this.close();}else if(y){this.open();s(z,this.getPicker());}}else if(this.isOpen()){if(y&&!this.bOpenedByKeyboardOrButton){this.close();}}else{this.clearFilter();}};n.prototype.handleTypeAhead=function(i,e,v,r){var t=this.intersectItems(this._filterStartsWithItems(v,'getText'),e);var u=this.getFilterSecondaryValues();var w=D.system.desktop;var x=this.intersectItems(this._filterStartsWithItems(v,'getAdditionalText'),e);if(u&&!t[0]&&x[0]){!r&&i.updateDomValue(x[0].getAdditionalText());this.setSelection(x[0]);}else if(t[0]){!r&&i.updateDomValue(t[0].getText());this.setSelection(t[0]);}if(w){o.call(i,v.length,i.getValue().length);}else{setTimeout(o.bind(i,v.length,i.getValue().length),0);}this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus");};n.prototype.onSelectionChange=function(e){var i=this._getItemByListItem(e.getParameter("listItem")),P=this.getChangeEventParams(),r=(i!==this.getSelectedItem());this.updateDomValue(i.getText());this.setSelection(i);this.fireSelectionChange({selectedItem:this.getSelectedItem()});if(r){P.itemPressed=true;this.onChange(null,P);}};n.prototype.onItemPress=function(e){var i=e.getParameter("listItem"),t=i.getTitle(),P=this.getChangeEventParams(),r=(i!==this.getListItem(this.getSelectedItem()));if(i.isA("sap.m.GroupHeaderListItem")){return;}this.handleListItemsVisualFocus(i);this.updateDomValue(t);if(!r){P.itemPressed=true;this.onChange(null,P);}this._setPropertyProtected("value",t,true);if(this.getPickerType()==="Dropdown"&&!this.isPlatformTablet()){this.selectText.bind(this,this.getValue().length,this.getValue().length);}this.close();};n.prototype.onBeforeOpen=function(){a.prototype.onBeforeOpen.apply(this,arguments);var P=this["onBeforeOpen"+this.getPickerType()],e=this.getFocusDomRef();this.setProperty("open",true);if(this.hasLoadItemsEventListeners()&&!this.bProcessingLoadItemsEvent){this.loadItems();}if(e){e.setAttribute("aria-controls",this.getPicker().getId());}this.addContent();P&&P.call(this);};n.prototype.onBeforeOpenDialog=function(){var P=this.getPickerTextField();this._oSelectedItemBeforeOpen=this.getSelectedItem();this._sValueBeforeOpen=this.getValue();if(this.getSelectedItem()){this.filterItems({properties:this._getFilters(),value:""});}P.setValue(this._sValueBeforeOpen);};n.prototype.onAfterOpen=function(){var i=this.getSelectedItem(),e=this._getSelectionRange(),t=this.isPlatformTablet();this.closeValueStateMessage();p.call(this,true);if(!t&&i&&e.start===e.end&&e.start>1){setTimeout(function(){this.selectText(0,e.end);}.bind(this),0);}};n.prototype.onBeforeClose=function(){a.prototype.onBeforeClose.apply(this,arguments);var e=this.getFocusDomRef();this.setProperty("open",false);this.setProperty("formattedTextFocused",false);if(e){e.removeAttribute("aria-controls");}this.toggleIconPressedStyle(false);};n.prototype.onAfterClose=function(){this.clearFilter();this._sInputValueBeforeOpen="";if(this.isPickerDialog()){a.prototype.closeValueStateMessage.apply(this,arguments);}};n.prototype.onItemChange=function(e){var i=this.getAssociation("selectedItem"),N=e.getParameter("newValue"),P=e.getParameter("name");if(i===e.getParameter("id")){switch(P){case"text":if(!this.isBound("value")){this.setValue(N);}break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(N);}break;}}};n.prototype.onkeydown=function(e){var i=e.srcControl;a.prototype.onkeydown.apply(i,arguments);if(!i.getEnabled()||!i.getEditable()){return;}var r=K;i._bDoTypeAhead=!D.os.android&&(e.which!==r.BACKSPACE)&&(e.which!==r.DELETE);};n.prototype.oncut=function(e){var i=e.srcControl;a.prototype.oncut.apply(i,arguments);i._bDoTypeAhead=false;};n.prototype.onsapenter=function(e){var i=e.srcControl,r=i.getSelectedItem();if(r&&this.getFilterSecondaryValues()){i.updateDomValue(r.getText());}a.prototype.onsapenter.apply(i,arguments);if(!i.getEnabled()||!i.getEditable()){return;}if(i.isOpen()&&!this.isComposingCharacter()){i.close();}};n.prototype.onsapdown=function(e){var i=e.srcControl;if(!i.getEnabled()||!i.getEditable()){return;}this.syncPickerContent();e.setMarked();e.preventDefault();this.loadItems(function r(){H.call(this,i,this.getNextFocusableItem(true));});};n.prototype.onsapup=function(e){var i=e.srcControl;if(!i.getEnabled()||!i.getEditable()){return;}this.syncPickerContent();e.setMarked();e.preventDefault();this.loadItems(function r(){H.call(this,i,this.getNextFocusableItem(false));});};n.prototype.onsaphome=function(e){var i=e.srcControl;if(!i.getEnabled()||!i.getEditable()){return;}this.syncPickerContent();e.setMarked();if(this.getValueStateLinks().length){this.setProperty("formattedTextFocused",true);}e.preventDefault();this.loadItems(function r(){var F=this.getSelectableItems()[0];H.call(this,i,F);});};n.prototype.onsapend=function(e){var i=e.srcControl;if(!i.getEnabled()||!i.getEditable()){return;}this.syncPickerContent();e.setMarked();e.preventDefault();if(this.getValueStateLinks().length&&this.getFormattedTextFocused()){this.setProperty("formattedTextFocused",false);}this.loadItems(function t(){var r=this.findLastEnabledItem(this.getSelectableItems());H.call(this,i,r);});};n.prototype.onsappagedown=function(e){var i=e.srcControl;if(!i.getEnabled()||!i.getEditable()){return;}this.syncPickerContent();e.setMarked();e.preventDefault();if(this.getValueStateLinks().length&&this.getFormattedTextFocused()){this.setProperty("formattedTextFocused",false);}this.loadItems(function(){var r=this.getNonSeparatorSelectableItems(this.getSelectableItems()),t=r.indexOf(this.getSelectedItem())+10,u;t=(t>r.length-1)?r.length-1:Math.max(0,t);u=r[t];H.call(this,i,u);});};n.prototype.onsappageup=function(e){var i=e.srcControl;if(!i.getEnabled()||!i.getEditable()){return;}this.syncPickerContent();e.setMarked();e.preventDefault();this.loadItems(function(){var r=this.getNonSeparatorSelectableItems(this.getSelectableItems()),t=r.indexOf(this.getSelectedItem())-10,u;t=(t>r.length-1)?r.length-1:Math.max(0,t);u=r[t];H.call(this,i,u);});};n.prototype.onsapshow=function(e){var i,r,E=this.getEditable(),t;a.prototype.onsapshow.apply(this,arguments);this.syncPickerContent();if(!this.getValue()&&E){i=this.getSelectableItems();r=this.getNonSeparatorSelectableItems(i)[0];if(r){t=this.getListItem(r);if(this.isOpen()){this.removeStyleClass("sapMFocus");this._getList().addStyleClass("sapMListFocus");this.handleListItemsVisualFocus(t);}else{this.addStyleClass("sapMFocus");}this.setSelection(r);this.updateDomValue(r.getText());this.fireSelectionChange({selectedItem:r});setTimeout(function(){this.selectText(0,r.getText().length);}.bind(this),0);}}};n.prototype.onsaphide=n.prototype.onsapshow;n.prototype.ontap=function(e){var i=this.getFocusDomRef(),A="aria-activedescendant";this.addStyleClass("sapMFocus");if(this.getFormattedTextFocused()){this.setFormattedTextFocused(false);}else if((this.getOpen()&&this._getList().hasStyleClass("sapMListFocus"))||this._oLastFocusedListItem){this._getList().removeStyleClass("sapMListFocus");this._oLastFocusedListItem.removeStyleClass("sapMLIBFocused");this._oLastFocusedListItem=null;i.removeAttribute(A);}};n.prototype.onfocusin=function(e){var i=this.getPickerType()==="Dropdown";if(this._bIsBeingDestroyed){return;}if(e.target===this.getOpenArea()){this.bOpenValueStateMessage=false;if(i&&!this.isPlatformTablet()){this.focus();}}else{if(i){setTimeout(function(){if(document.activeElement===this.getFocusDomRef()&&!this.bIsFocused&&!this.bFocusoutDueRendering&&!this.getSelectedText()){this.selectText(0,this.getValue().length);}this.bIsFocused=true;}.bind(this),0);}if(!this.isOpen()&&this.bOpenValueStateMessage&&this.shouldValueStateMessageBeOpened()){this.openValueStateMessage();}this.bOpenValueStateMessage=true;}if(this.getEnabled()&&(!this.isOpen()||!this.getSelectedItem()||!this._getList().hasStyleClass("sapMListFocus"))){this.addStyleClass("sapMFocus");}};n.prototype.onsapfocusleave=function(e){this.bIsFocused=false;var t,P,r,F,i=this.getSelectedItem();if(i&&this.getFilterSecondaryValues()){this.updateDomValue(i.getText());}a.prototype.onsapfocusleave.apply(this,arguments);if(this.isPickerDialog()){return;}P=this.getPicker();if(!e.relatedControlId||!P){return;}t=this.isPlatformTablet();r=h.byId(e.relatedControlId);F=r&&r.getFocusDomRef();if(c(P.getFocusDomRef(),F)&&!t&&!this.getFormattedTextFocused()){this.focus();}};n.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return;}var e=this.getSelectedKey(),i=this.getItemByKey(""+e);if(i&&(e!=="")){this.setAssociation("selectedItem",i,true);this._setPropertyProtected("selectedItemId",i.getId(),true);this.setValue(i.getText());this._sValue=this.getValue();}};n.prototype.configPicker=function(P){var r=this.getRenderer(),e=r.CSS_CLASS_COMBOBOXBASE;P.setHorizontalScrolling(false).addStyleClass(e+"Picker").addStyleClass(e+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this);};n.prototype._configureList=function(e){var r=this.getRenderer();if(!e){return;}e.setMode(m.SingleSelectMaster).addStyleClass(r.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(r.CSS_CLASS_COMBOBOX+"List");e.attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this);e.addEventDelegate({onBeforeRendering:this.onBeforeRenderingList,onAfterRendering:this.onAfterRenderingList},this);};n.prototype.destroyItems=function(){this.destroyAggregation("items");if(this._getList()){this._getList().destroyItems();}return this;};n.prototype.getDefaultSelectedItem=function(){return null;};n.prototype.getChangeEventParams=function(){return{itemPressed:false};};n.prototype.clearSelection=function(){this.setSelection(null);};n.prototype.selectText=function(i,e){a.prototype.selectText.apply(this,arguments);this.textSelectionStart=i;this.textSelectionEnd=e;return this;};n.prototype.removeAllItems=function(){var i=a.prototype.removeAllItems.apply(this,arguments);this._fillList();return i;};n.prototype.clone=function(i){var e=a.prototype.clone.apply(this,arguments),r=this._getList();if(!this.isBound("items")&&r){e.syncPickerContent();e.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));}return e;};n.prototype.open=function(){this.syncPickerContent();var e=this._getList();a.prototype.open.call(this);if(this.getSelectedItem()){e.addStyleClass("sapMListFocus");this.removeStyleClass("sapMFocus");}return this;};n.prototype.syncPickerContent=function(){var P,e=this.getPicker(),i=this.getInputForwardableProperties();if(!e){var r,G;e=this.createPicker(this.getPickerType());P=this.getPickerTextField();this._fillList();if(P){i.forEach(function(t){t=t.charAt(0).toUpperCase()+t.slice(1);r="set"+t;G="get"+t;if(P[r]){P[r](this[G]());}},this);}this._getSuggestionsPopover().updateValueState(this.getValueState(),this.getValueStateText(),this.getShowValueStateMessage());}this.synchronizeSelection();return e;};n.prototype.findAggregatedObjects=function(){var e=this._getList();if(e){return L.prototype.findAggregatedObjects.apply(e,arguments);}return[];};n.prototype.setSelectedItem=function(i){if(typeof i==="string"){this.setAssociation("selectedItem",i,true);i=h.byId(i);}if(!(i instanceof I)&&i!==null){return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText(i));return this;};n.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);i=this.getSelectedItem();this.setValue(this._getSelectedItemText(i));return this;};n.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);var i=(e===""),r=this.isBound("selectedKey")&&this.isBound("value")&&this.getBindingInfo("selectedKey").skipModelUpdate;if(i){this.setSelection(null);if(!r){this.setValue("");}return this;}var t=this.getItemByKey(e);if(t){this.setSelection(t);if(!r){this.setValue(this._getSelectedItemText(t));}return this;}this._sValue=this.getValue();return this._setPropertyProtected("selectedKey",e);};n.prototype._setPropertyProtected=function(P,v,i){try{return this.setProperty(P,v,i);}catch(e){j.warning("setSelectedKey update failed due to exception. Loggable in support mode log",null,null,function(){return{exception:e};});}};n.prototype.getSelectedItem=function(){var v=this.getAssociation("selectedItem");return(v===null)?null:h.byId(v)||null;};n.prototype.removeItem=function(i){i=a.prototype.removeItem.apply(this,arguments);var e;if(this._getList()){this._getList().removeItem(i&&this.getListItem(i));}if(this.isBound("items")&&!this.bItemsUpdated){return i;}var v=this.getValue();if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){e=this.getDefaultSelectedItem();this.setSelection(e);this.setValue(v);}return i;};n.prototype._modifyPopupInput=function(i){a.prototype._modifyPopupInput.apply(this,arguments);i.addEventDelegate({onsapenter:function(){var t=i.getValue();this.updateDomValue(t);this.onChange();if(t){this.updateDomValue(t);this.onChange();this.close();}}},this);return i;};n.prototype.applyShowItemsFilters=function(){var P,e;this.syncPickerContent();P=this.getPicker();e=function(){P.detachBeforeOpen(e,this);P=null;this.filterItems({value:this.getValue()||"_",properties:this._getFilters()});};P.attachBeforeOpen(e,this);};n.prototype.showItems=function(F){var e,i=Array.prototype.slice.call(arguments),r=this.fnFilter,t=function(){this.setFilterFunction(F||function(){return true;});e=this.filterItems({value:this.getValue()||"_",properties:this._getFilters()});this.setFilterFunction(r);if(e&&e.length){a.prototype.showItems.apply(this,i);}}.bind(this);this.attachLoadItems(t);this.loadItems(t);};n.prototype._getFormattedValueStateText=function(){if(this.isOpen()){return this._getSuggestionsPopover()._getValueStateHeader().getFormattedText();}else{return C.prototype.getFormattedValueStateText.call(this);}};return n;});
