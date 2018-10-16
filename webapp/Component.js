(function () {
	"use strict";
	/*global sap, jQuery */

	/**
	 * @fileOverview Application component to display information on entities from the GWSAMPLE_BASIC
	 *   OData service.
	 * @version @version@
	 */
	jQuery.sap.declare("demo.ovp.BusinessOverview.Component");

	jQuery.sap.require("sap.ovp.app.Component");
	
	/**
	 * addiotnal code to use mock data as real data starts
	 **/

	var sNamespace = "demo.ovp.BusinessOverview";
	sNamespace = sNamespace.replace(/\./g, "/");
	sap.ui.require([
		sNamespace + "/localService/mockserver"
	], function (server) {
		// set up test service for local testing
		server.init();

		// initialize the ushell sandbox component
		sap.ushell.Container.createRenderer().placeAt("content");
	});
	
	/**
	 * addiotnal code to use mock data as real data ends
	 **/

	sap.ovp.app.Component.extend("demo.ovp.BusinessOverview.Component", {
		metadata: {
			manifest: "json"
		}
	});
}());