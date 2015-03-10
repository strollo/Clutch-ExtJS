Ext.define('Clutch.view.Viewport', {

	renderTo : Ext.getBody(),

	extend : 'Ext.container.Viewport',

	requires : [
		'Clutch.view.torrent.TorrentsPanel',
		'JTSD.SearchPanel',
		'Clutch.view.BottomToolbar',
		'Ext.layout.container.Border',
		'Clutch.view.MainToolbar',
		'Clutch.view.torrent.TorrentsGrid'],

	layout : {
		type : 'border'
	},

	items : [{
			region : 'north',
			xtype : 'torrenttoolbar'

		}, {
			xtype : 'bottomtoolbar',
			region : 'south'
		}, {
			region : 'center',
			xtype : 'tabpanel',

			items : [
			{
				xtype : 'torrentspanel'
			},
	/* 
			{
				xtype : 'jtsdsearchpanel'
			}
	*/
			]
		}
	]

});
