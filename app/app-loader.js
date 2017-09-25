Ext.Loader.setConfig({
  enabled: true,
  paths: {
    "Clutch": "app",
	"JTSD": "packages/jtsd"
  }
});

Ext.syncRequire(["Ext.Component", "Ext.ComponentManager", "Ext.ComponentQuery"]);