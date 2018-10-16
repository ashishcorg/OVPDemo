sap.ui.define([
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
], function (Filter, MessageToast) {
	"use strict";

	// controller for custom filter, navigation param, action(quick view and global filter), navigation target 
	return sap.ui.controller("demo.ovp.BusinessOverview.ext.custom", {

		/************************* Handler for custom navigation ************************************************
		 
		 * This function takes the standard navigation entry details (if present) for a particular card and context
		 * and return a new/modified custom navigation entry to the core. The core will then use the custom
		 * navigation entry to perform navigation
		 * @param sCardId  : Card id as defined in manifest for a card
		 * @param oContext : Context of line item that is clicked (empty for header click)
		 * @param oNavigationEntry : Custom navigation entry to be used for navigation
		 * @returns {object} : Properties are {type, semanticObject, action, url, label}
		 * @public
		 **/

		doCustomNavigation: function (sCardId, oContext, oNavigationEntry) {
			var oCustomNavigationEntry;
		    var oEntity = oContext && oContext.sPath && oContext.getProperty && oContext.getProperty(oContext.sPath);
		    if (sCardId === "card001" && oEntity && oEntity.PurchaseOrder === "4500003575") {
		        oCustomNavigationEntry = {};
		        oCustomNavigationEntry.type = "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";
		        oCustomNavigationEntry.semanticObject = "Action";
		        oCustomNavigationEntry.action = "toappnavsample";
		        oCustomNavigationEntry.url = ""; //Only required when type is DataFieldWithUrl
		        oCustomNavigationEntry.label = ""; //Optional
		    }
		    return oCustomNavigationEntry;

		},

		/*************************** Handler for custom filter *******************************************************
		 
		 * This method returns a filter object to the OVP library. If there are multiple filters, they should be clubbed into single Filter object.
		 * sample code for referance
		    var oValue1 = this.oView.byId("ProductID").getValue();
		    var oValue2 = this.oView.byId("SalesOrderID").getValue();
		    
		    var aFilters = [], oFilter1, oFilter2;

		    if (oValue1) {
		        oFilter1 = new Filter({
		            path: "ProductID",
		            operator: "EQ",
		            value1: oValue1
		        });
		        aFilters.push(oFilter1);
		    }

		    if (oValue2) {
		        oFilter2 = new Filter({
		            path: "SalesOrderID",
		            operator: "EQ",
		            value1: oValue2
		        });
		        aFilters.push(oFilter2);
		    }

		    if (aFilters && aFilters.length > 0) {
		        return (new Filter(aFilters, true));
		    }
		 */

		getCustomFilters: function () {
			var oValue1 = this.oView.byId("ProductID").getValue();
			var oValue2 = this.oView.byId("SalesOrderID").getValue();

			var aFilters = [],
				oFilter1, oFilter2;

			if (oValue1) {
				oFilter1 = new Filter({
					path: "ProductID",
					operator: "EQ",
					value1: oValue1
				});
				aFilters.push(oFilter1);
			}

			if (oValue2) {
				oFilter2 = new Filter({
					path: "SalesOrderID",
					operator: "EQ",
					value1: oValue2
				});
				aFilters.push(oFilter2);
			}

			if (aFilters && aFilters.length > 0) {
				return (new Filter(aFilters, true));
			}
		},

		/*************************** Handler to store custom app state data ******************************************************
		 
		 * the content of the custom field shall be stored in the app state, so that it can be restored later again e.g. after a back navigation.
		 * The developer has to ensure, that the content of the field is stored in the object that is returned by this method.
		 * @param oCustomData  : referance to the custome data expected by OVP library
		 * sample code for referance
		    var oCustomField1 = this.oView.byId("ProductID");
            var oCustomField2 = this.oView.byId("SalesOrderID");
            if (oCustomField1) {
                oCustomData.ProductID = oCustomField1.getValue();
            }
            if (oCustomField2) {
                oCustomData.SalesOrderID = oCustomField2.getValue();
            }
            return oCustomData;
		*/

		getCustomAppStateDataExtension: function (oCustomData) {
			var oCustomField1 = this.oView.byId("ProductID");
			var oCustomField2 = this.oView.byId("SalesOrderID");
			if (oCustomField1) {
				oCustomData.ProductID = oCustomField1.getValue();
			}
			if (oCustomField2) {
				oCustomData.SalesOrderID = oCustomField2.getValue();
			}
			return oCustomData;
		},

		/*************************** Handler to restore custom app state data ******************************************************
		 
		 * in order to to restore the content of the custom field in the filter bar e.g. after a back navigation,
		 * The developer has to ensure, that the content of the field is stored in the object that is returned by this method.
		 * also, empty properties have to be set
		 * @param oCustomData  : referance to the custome data expected from OVP library
		 * sample code for referance
		     var oCustomField1 = this.oView.byId("ProductID");
            oCustomField1.setValue();

            var oCustomField2 = this.oView.byId("SalesOrderID");
            oCustomField2.setValue();

            if (oCustomData) {

                if (oCustomData.ProductID) {
                    oCustomField1.setValue(oCustomData.ProductID);
                }

                if (oCustomData.SalesOrderID) {
                    oCustomField2.setValue(oCustomData.SalesOrderID);
                }
            }
		*/

		restoreCustomAppStateDataExtension: function (oCustomData) {
			var oCustomField1 = this.oView.byId("ProductID");
			oCustomField1.setValue();

			var oCustomField2 = this.oView.byId("SalesOrderID");
			oCustomField2.setValue();

			if (oCustomData) {

				if (oCustomData.ProductID) {
					oCustomField1.setValue(oCustomData.ProductID);
				}

				if (oCustomData.SalesOrderID) {
					oCustomField2.setValue(oCustomData.SalesOrderID);
				}
			}
		},

		/*************************** Handler to modify the selection varient to be set to the smart filter bar *******************************
         
		 * Modifies the selection variant to be set to the SFB
		 * @param oCustomData  : referance to the custom selection variant expected by OVP library
		 * sample code for referance
		     oCustomSelectionVariant.addSelectOption("SupplierName", "I", "EQ", "Talpa");
		*/

		modifyStartupExtension: function (oCustomSelectionVariant) {
			oCustomSelectionVariant.addSelectOption("SupplierName", "I", "EQ", "Talpa");
		},

		/*************************** Handler for custom action in quick view card *******************************
         
		 * handles the custom action in quick view card
		 * @param sCustomAction : press handler as a string
         * @returns  : press handler function defined in this custom controller
		 * sample code for referance
		     onCustomActionPress: function(sCustomAction) {
		            if (sCustomAction === "press1") {
		                return this.press1;
		            } else if (sCustomAction === "press2") {
		                return this.press2;
		            }
		        },
		
		        press1: function(oEvent) {
		            window.open("https://www.google.co.in");
		        },
		
		        press2: function(oEvent) {
		            window.open("http://www.sap.com/index.html");
		        },
		*/

		onCustomActionPress: function (sCustomAction) {
				if (sCustomAction === "press1") {
		                return this.press1;
		            } else if (sCustomAction === "press2") {
		                return this.press2;
		            }
		},
		
		press1: function(oEvent) {
		            window.open("https://www.google.co.in");
		        },
		
		        press2: function(oEvent) {
		            window.open("http://www.sap.com/index.html");
		        },

		/*************************** Handler for custom navigation parameter *******************************
         
		 * @param sCustomAction : name of the custom parameter function
         * @returns  : same custom parameter function function defined in this custom controller
		 * sample code for referance
		    onCustomParams: function(sCustomParams) {
	            if (sCustomParams === "getParameters") {
	                return this.getParameters;
	            } else if (sCustomParams === "param2") {
	                return this.param2;
	            }
	        },
	        */
		    getParameters: function(oNavigateParams,oSelectionVariantParams) {
            var aCustomSelectionVariant = [];
            var aSelectOptions = oSelectionVariantParams.getSelectOptionsPropertyNames();
            if(aSelectOptions.indexOf("SupplierName")!=-1) {
                var aSupplierFilter = oSelectionVariantParams.getSelectOption("SupplierName");
                var sSupplierFilterValue = aSupplierFilter[0].Low;
                aSupplierFilter[0].Low = "";
            }
            var oSupplierName = {
              path: "SupplierName",
                operator: "EQ",
                value1: "",
                value2: null,
                sign: "I"
            };
            var oLandFilter = {
              path: "Land1",
                operator: "EQ",
                value1: sSupplierFilterValue,
                value2: null,
                sign: "I"
            };
            var oCustomSelectionVariant = {
                path: "TaxTarifCode",
                operator: "EQ",
                value1: 5,
                value2: null,
                sign: "I"
            };
            aCustomSelectionVariant.push(oCustomSelectionVariant);
            aCustomSelectionVariant.push(oLandFilter);
            aCustomSelectionVariant.push(oSupplierName);
            return {
                selectionVariant: aCustomSelectionVariant,
                ignoreEmptyString: true
            };
        },

        param2: function(oNavigateParams) {
            oNavigateParams.TaxTarifCode = '3';
            return oNavigateParams;
        },
		
		onCustomParams: function (sCustomParams) {
			if (sCustomParams === "getParameters") {
	                return this.getParameters;
	            } else if (sCustomParams === "param2") {
	                return this.param2;
	            }
		},

		/*************************** Handler for custom global action *******************************
         
		 * hadles the custom global action 
		 * sample code for referance
		    handleCustomAction : function() {
	            var msg = 'Custom Global Action clicked';
	            MessageToast.show(msg);
            }
		 */

		handleCustomAction: function () {
			var msg = 'Custom Global Action clicked';
			MessageToast.show(msg);
		}

	});
});