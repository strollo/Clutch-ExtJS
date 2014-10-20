Ext.define('Clutch.view.search.dlm.SearchPanel', {
    
    requires : ['Clutch.view.search.dlm.SearchResultGrid','Clutch.view.search.SearchTree', 'Clutch.view.search.properties.DetailsPanel'],
    
    extend : 'Ext.panel.Panel',

    alias : 'widget.dlmsearchpanel',

    layout : 'border',

    title : 'DLM Search',

    selectable : true,

    items : [{
        xtype : 'searchtree',
        region : 'west'
        
    }, {
        xtype : 'dlmsearchresultgrid',
        region : 'center',
        title : 'DLM Search Results'
    }, {
        xtype : 'searchresultdetailspanel',
        region : 'east'
        
    }]

});

