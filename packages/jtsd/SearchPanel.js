Ext.define('JTSD.SearchPanel', {
    requires : [
		'JTSD.SearchResultGrid', 
		'Clutch.view.search.SearchTree', 
		'Clutch.view.search.properties.DetailsPanel', 
		'JTSD.Search'
	],
    extend : 'Ext.panel.Panel',
    controller : 'JTSD.Controller',
    alias : 'widget.jtsdsearchpanel',
    layout : 'border',
    title : 'JTSD Search',
    selectable : true,

    items : [{
        xtype : 'searchtree',
        region : 'west',
        collapsible : true,
        split : true
    }, {
        xtype : 'panel',
        
        layout : 'fit',
        
        region : 'center',
        tbar : Ext.create('Clutch.view.search.SearchToolbar', {
            searchEmptyText : 'Search The JTSD'
        }),
        items : [{
            xtype : 'jtsdsearchresultgrid',
        }]
    }
	]

});

