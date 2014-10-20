Ext.define('Clutch.view.search.dlm.SearchPanel', {

    requires : ['Clutch.view.search.dlm.SearchResultGrid', 'Clutch.view.search.SearchTree', 'Clutch.view.search.properties.DetailsPanel', 'Dlm.Search'],

    extend : 'Ext.panel.Panel',

    controller : 'Clutch.controller.DlmController',

    alias : 'widget.dlmsearchpanel',

    layout : 'border',

    title : 'DLM Search',

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
            searchEmptyText : 'Search The DLM'
        }),

        items : [{
            xtype : 'dlmsearchresultgrid',

        }]
    }, {
        xtype : 'searchresultdetailspanel',
        region : 'east',
        collapsed : true,
        collapsible : true,
        split : true,
        width : 400,
        hideComments : true
    }]

});

