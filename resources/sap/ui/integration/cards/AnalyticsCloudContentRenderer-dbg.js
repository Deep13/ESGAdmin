/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(["./BaseContentRenderer"], function (BaseContentRenderer) {
	"use strict";

	/**
	 * AnalyticsCloudContentRenderer renderer.
	 * @author SAP SE
	 * @namespace
	 */
	var AnalyticsCloudContentRenderer = BaseContentRenderer.extend("sap.ui.integration.cards.AnalyticsCloudContentRenderer");

	/**
	 * @override
	 */
	AnalyticsCloudContentRenderer.getMinHeight = function (oConfiguration, oContent) {
		var MIN_ANALYTICS_CLOUD_CONTENT_HEIGHT = "14rem";

		return MIN_ANALYTICS_CLOUD_CONTENT_HEIGHT;
	};

	return AnalyticsCloudContentRenderer;
});
