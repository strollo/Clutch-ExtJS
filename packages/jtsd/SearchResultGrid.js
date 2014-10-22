Ext.define('JTSD.SearchResultGrid', {
    alias : 'widget.jtsdsearchresultgrid',
    extend : 'Clutch.view.search.SearchResultGridBase',
    requires : ['Clutch.view.search.SearchToolbar'],
    store : Ext.create('Clutch.store.SearchResult'),

    columns : [
	{
        header : 'Plugin',
        width : 30,
        dataIndex : 'plugin',
		renderer : function(v, m, r) {
			//debugger;
			return '<img width="22" src="dlmicons/' + v + '.png">';
		}
    },
	{
        header : 'Name',
        flex : 2,
        dataIndex : 'name'
    }, {
        header : 'Seeds',
        width : 70,
        dataIndex : 'seeds'
    }, {
        header : 'Leechers',
        width : 70,
        dataIndex : 'leechers'
    }, {
        header : 'Size',
        dataIndex : 'size',
        xtype : 'sizecolumn'
    }, {
        header : 'Date Added',
        xtype : 'datecolumn',
        dataIndex : 'pubDate',
        //format : 'F j, Y, g:i a',
		format : 'Y/m/d',
        width : 100
    }, {
        header : 'Category',
        dataIndex : 'category',
        //flex : 1
    }],

	constructor : function(cfg) {
		debugger;
        this.callParent(arguments);        
        this.getView().selModel = Ext.create('Ext.selection.RowModel', {
            mode : 'MULTI'
        });
        this.contextMenu = Ext.create('Clutch.view.search.SearchContextMenu', { gridPanel : this });
        this.initConfig(cfg);
    },

    applySearchTerm : function(v, oldValue) {
		// debugger;
        // dlmService.search(v, this);
        return this.callParent(arguments);
    }
});
