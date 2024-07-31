/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/DataType','sap/base/util/ObjectPath','sap/ui/core/library','sap/ui/layout/library','sap/ui/unified/library'],function(D,O){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.commons",version:"1.84.3",dependencies:["sap.ui.core","sap.ui.layout","sap.ui.unified"],types:["sap.ui.commons.ButtonStyle","sap.ui.commons.HorizontalDividerHeight","sap.ui.commons.HorizontalDividerType","sap.ui.commons.LabelDesign","sap.ui.commons.MenuBarDesign","sap.ui.commons.MessageType","sap.ui.commons.PaginatorEvent","sap.ui.commons.RatingIndicatorVisualMode","sap.ui.commons.RowRepeaterDesign","sap.ui.commons.SplitterSize","sap.ui.commons.TextViewColor","sap.ui.commons.TextViewDesign","sap.ui.commons.TitleLevel","sap.ui.commons.ToolbarDesign","sap.ui.commons.ToolbarSeparatorDesign","sap.ui.commons.TreeSelectionMode","sap.ui.commons.TriStateCheckBoxState","sap.ui.commons.enums.AreaDesign","sap.ui.commons.enums.BorderDesign","sap.ui.commons.enums.Orientation","sap.ui.commons.form.GridElementCells","sap.ui.commons.form.SimpleFormLayout","sap.ui.commons.layout.BackgroundDesign","sap.ui.commons.layout.BorderLayoutAreaTypes","sap.ui.commons.layout.HAlign","sap.ui.commons.layout.Padding","sap.ui.commons.layout.Separation","sap.ui.commons.layout.VAlign","sap.ui.commons.ColorPickerMode"],interfaces:["sap.ui.commons.FormattedTextViewControl","sap.ui.commons.ToolbarItem"],controls:["sap.ui.commons.Accordion","sap.ui.commons.ApplicationHeader","sap.ui.commons.AutoComplete","sap.ui.commons.Button","sap.ui.commons.Callout","sap.ui.commons.CalloutBase","sap.ui.commons.Carousel","sap.ui.commons.CheckBox","sap.ui.commons.ColorPicker","sap.ui.commons.ComboBox","sap.ui.commons.DatePicker","sap.ui.commons.Dialog","sap.ui.commons.DropdownBox","sap.ui.commons.FileUploader","sap.ui.commons.FormattedTextView","sap.ui.commons.HorizontalDivider","sap.ui.commons.Image","sap.ui.commons.ImageMap","sap.ui.commons.InPlaceEdit","sap.ui.commons.Label","sap.ui.commons.Link","sap.ui.commons.ListBox","sap.ui.commons.Menu","sap.ui.commons.MenuBar","sap.ui.commons.MenuButton","sap.ui.commons.Message","sap.ui.commons.MessageBar","sap.ui.commons.MessageList","sap.ui.commons.MessageToast","sap.ui.commons.Paginator","sap.ui.commons.Panel","sap.ui.commons.PasswordField","sap.ui.commons.ProgressIndicator","sap.ui.commons.RadioButton","sap.ui.commons.RadioButtonGroup","sap.ui.commons.RangeSlider","sap.ui.commons.RatingIndicator","sap.ui.commons.ResponsiveContainer","sap.ui.commons.RichTooltip","sap.ui.commons.RoadMap","sap.ui.commons.RowRepeater","sap.ui.commons.SearchField","sap.ui.commons.SegmentedButton","sap.ui.commons.Slider","sap.ui.commons.Splitter","sap.ui.commons.Tab","sap.ui.commons.TabStrip","sap.ui.commons.TextArea","sap.ui.commons.TextField","sap.ui.commons.TextView","sap.ui.commons.ToggleButton","sap.ui.commons.Toolbar","sap.ui.commons.Tree","sap.ui.commons.TriStateCheckBox","sap.ui.commons.ValueHelpField","sap.ui.commons.form.Form","sap.ui.commons.form.FormLayout","sap.ui.commons.form.GridLayout","sap.ui.commons.form.ResponsiveLayout","sap.ui.commons.form.SimpleForm","sap.ui.commons.layout.AbsoluteLayout","sap.ui.commons.layout.BorderLayout","sap.ui.commons.layout.HorizontalLayout","sap.ui.commons.layout.MatrixLayout","sap.ui.commons.layout.ResponsiveFlowLayout","sap.ui.commons.layout.VerticalLayout"],elements:["sap.ui.commons.AccordionSection","sap.ui.commons.Area","sap.ui.commons.FileUploaderParameter","sap.ui.commons.MenuItem","sap.ui.commons.MenuItemBase","sap.ui.commons.MenuTextFieldItem","sap.ui.commons.ResponsiveContainerRange","sap.ui.commons.RoadMapStep","sap.ui.commons.RowRepeaterFilter","sap.ui.commons.RowRepeaterSorter","sap.ui.commons.SearchProvider","sap.ui.commons.Title","sap.ui.commons.ToolbarSeparator","sap.ui.commons.TreeNode","sap.ui.commons.form.FormContainer","sap.ui.commons.form.FormElement","sap.ui.commons.form.GridContainerData","sap.ui.commons.form.GridElementData","sap.ui.commons.layout.BorderLayoutArea","sap.ui.commons.layout.MatrixLayoutCell","sap.ui.commons.layout.MatrixLayoutRow","sap.ui.commons.layout.PositionContainer","sap.ui.commons.layout.ResponsiveFlowLayoutData"]});sap.ui.commons.ButtonStyle={Emph:"Emph",Accept:"Accept",Reject:"Reject",Default:"Default"};sap.ui.commons.ColorPickerMode=sap.ui.unified.ColorPickerMode;sap.ui.commons.HorizontalDividerHeight={Ruleheight:"Ruleheight",Small:"Small",Medium:"Medium",Large:"Large"};sap.ui.commons.HorizontalDividerType={Area:"Area",Page:"Page"};sap.ui.commons.LabelDesign={Bold:"Bold",Standard:"Standard"};sap.ui.commons.MenuBarDesign={Standard:"Standard",Header:"Header"};sap.ui.commons.MessageType={Error:"Error",Warning:"Warning",Success:"Success"};sap.ui.commons.PaginatorEvent={First:"First",Previous:"Previous",Goto:"Goto",Next:"Next",Last:"Last"};sap.ui.commons.RatingIndicatorVisualMode={Full:"Full",Half:"Half",Continuous:"Continuous"};sap.ui.commons.RowRepeaterDesign={Standard:"Standard",Transparent:"Transparent",BareShell:"BareShell"};sap.ui.commons.SplitterSize=D.createType('sap.ui.commons.SplitterSize',{isValid:function(v){return/^((0*|([0-9]+|[0-9]*\.[0-9]+)([pP][xX]|%)))$/.test(v);}},D.getType('string'));sap.ui.commons.TextViewColor={Default:"Default",Positive:"Positive",Negative:"Negative",Critical:"Critical"};sap.ui.commons.TextViewDesign={Standard:"Standard",Bold:"Bold",H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6",Italic:"Italic",Small:"Small",Monospace:"Monospace",Underline:"Underline"};sap.ui.commons.TitleLevel=sap.ui.core.TitleLevel;sap.ui.commons.ToolbarDesign={Standard:"Standard",Transparent:"Transparent",Flat:"Flat"};sap.ui.commons.ToolbarSeparatorDesign={Standard:"Standard",FullHeight:"FullHeight"};sap.ui.commons.TreeSelectionMode={Multi:"Multi",Single:"Single",None:"None",Legacy:"Legacy"};sap.ui.commons.TriStateCheckBoxState={Unchecked:"Unchecked",Mixed:"Mixed",Checked:"Checked"};sap.ui.commons.enums=sap.ui.commons.enums||{};sap.ui.commons.enums.AreaDesign={Plain:"Plain",Fill:"Fill",Transparent:"Transparent"};sap.ui.commons.enums.BorderDesign={Box:"Box",None:"None"};sap.ui.commons.enums.Orientation={horizontal:"horizontal",vertical:"vertical"};sap.ui.commons.form=sap.ui.commons.form||{};sap.ui.commons.form.GridElementCells=sap.ui.layout.form.GridElementCells;sap.ui.commons.form.SimpleFormLayout=sap.ui.layout.form.SimpleFormLayout;sap.ui.commons.layout=sap.ui.commons.layout||{};sap.ui.commons.layout.BackgroundDesign={Border:"Border",Fill1:"Fill1",Fill2:"Fill2",Fill3:"Fill3",Header:"Header",Plain:"Plain",Transparent:"Transparent"};sap.ui.commons.layout.BorderLayoutAreaTypes={top:"top",begin:"begin",center:"center",end:"end",bottom:"bottom"};sap.ui.commons.layout.HAlign={Begin:"Begin",Center:"Center",End:"End",Left:"Left",Right:"Right"};sap.ui.commons.layout.Padding={None:"None",Begin:"Begin",End:"End",Both:"Both",Neither:"Neither"};sap.ui.commons.layout.Separation={None:"None",Small:"Small",SmallWithLine:"SmallWithLine",Medium:"Medium",MediumWithLine:"MediumWithLine",Large:"Large",LargeWithLine:"LargeWithLine"};sap.ui.commons.layout.VAlign={Bottom:"Bottom",Middle:"Middle",Top:"Top"};sap.ui.lazyRequire("sap.ui.commons.MessageBox","alert confirm show");sap.ui.lazyRequire("sap.ui.commons.MenuItemBase","new extend getMetadata");sap.ui.commons.Orientation={"Vertical":sap.ui.core.Orientation.Vertical,"Horizontal":sap.ui.core.Orientation.Horizontal,"vertical":sap.ui.core.Orientation.Vertical,"horizontal":sap.ui.core.Orientation.Horizontal};if(!sap.ui.unified.ColorPickerHelper||!sap.ui.unified.ColorPickerHelper.bFinal){sap.ui.unified.ColorPickerHelper={isResponsive:function(){return false;},factory:{createLabel:function(c){return new sap.ui.commons.Label(c);},createInput:function(i,c){return new sap.ui.commons.TextField(i,c);},createSlider:function(i,c){if(c&&c.step){c.smallStepWidth=c.step;delete c.step;}return new sap.ui.commons.Slider(i,c);},createRadioButtonGroup:function(c){if(c&&c.buttons){c.items=c.buttons;delete c.buttons;}return new sap.ui.commons.RadioButtonGroup(c);},createRadioButtonItem:function(c){return new sap.ui.core.Item(c);}},bFinal:false};}if(!sap.ui.layout.form.FormHelper||!sap.ui.layout.form.FormHelper.bFinal){sap.ui.layout.form.FormHelper={createLabel:function(T,i){return new sap.ui.commons.Label(i,{text:T});},createButton:function(i,p,c){var a=this;var _=function(B){var o=new B(i,{lite:true});o.attachEvent('press',p,a);c.call(a,o);};var b=sap.ui.require("sap/ui/commons/Button");if(b){_(b);}else{sap.ui.require(["sap/ui/commons/Button"],_);}},setButtonContent:function(b,T,s,i,I){b.setText(T);b.setTooltip(s);b.setIcon(i);b.setIconHovered(I);},addFormClass:function(){return null;},setToolbar:function(T){return T;},getToolbarTitle:function(T){return T&&T.getId();},bArrowKeySupport:true,bFinal:false};}if(!sap.ui.unified.FileUploaderHelper||!sap.ui.unified.FileUploaderHelper.bFinal){sap.ui.unified.FileUploaderHelper={createTextField:function(i){var T=new sap.ui.commons.TextField(i);return T;},setTextFieldContent:function(T,w){T.setWidth(w);},createButton:function(i){var b=new sap.ui.commons.Button(i);return b;},addFormClass:function(){return"sapUiCFUM";},bFinal:false};}var t=O.get("sap.ui.table.TableHelper");if(!t||!t.bFinal){O.set("sap.ui.table.TableHelper",{createLabel:function(c){return new sap.ui.commons.Label(c);},createTextView:function(c){if(c&&!c.wrapping){c.wrapping=false;}return new sap.ui.commons.TextView(c);},addTableClass:function(){return"sapUiTableCommons";},bFinal:false});}if(!sap.ui.layout.GridHelper||!sap.ui.layout.GridHelper.bFinal){sap.ui.layout.GridHelper={getLibrarySpecificClass:function(){return"sapUiRespGridOverflowHidden";},bFinal:false};}return sap.ui.commons;});
