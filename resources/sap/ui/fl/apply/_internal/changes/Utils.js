/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/Utils","sap/ui/fl/registry/ChangeHandlerRegistration","sap/ui/fl/registry/ChangeRegistry"],function(F,a,C,b){"use strict";var U={getControlIfTemplateAffected:function(c,o,p){var m=p.modifier;var d=c.getDefinition();var e={originalControl:o};var O=d.dependentSelector&&d.dependentSelector.originalSelector;if(c.getContent().boundAggregation&&O){e.control=m.bySelector(O,p.appComponent,p.view);e.controlType=m.getControlType(e.control);e.bTemplateAffected=true;}else{e.control=o;e.controlType=m.getControlType(o);e.bTemplateAffected=false;}return e;},getChangeHandler:function(c,m,p){var l=p.modifier.getLibraryName(m.control);var w=new a.FakePromise();if(C.isChangeHandlerRegistrationInProgress(l)){w=C.waitForChangeHandlerRegistration(l);}return w.then(function(){var s=c.getChangeType();var L=c.getLayer();var o=b.getInstance();o.initSettings();return o.getChangeHandler(s,m.controlType,m.control,p.modifier,L);});},checkIfDependencyIsStillValid:function(A,m,c,s){var o=a.getChangeFromChangesMap(c.mChanges,s);var d=m.bySelector(o.getSelector(),A);if(F.hasChangeApplyFinishedCustomData(d,o,m)||o.hasApplyProcessStarted()){return false;}return true;}};return U;});
