Ext.define('Clutch.controller.DlmController', {
    extend : 'Deft.mvc.ViewController',
    inject : ['rpcService', 'dlmService'],
    config : {
        rpcService : null,
        dlmService : null
    },

    control : {
        searchField : {
            selector : 'searchtoolbarbase searchfield',
            live : true,
            listeners : {
                specialkey : 'doSearchFromEnterKey'
            }
        },
        btnGo : {
            selector : '#gobutton',
            live : true,
            listeners : {
                click : 'doSearch'
            }
        },
        contextMenu : {
            selector : 'searchcontextmenu',
            live : true,
            listeners : {
                click : 'onContextMenuClick'
            }
        },
        searchGrid : {
            selector : 'searchresultgridbase',
            listeners : {
                beforeitemcontextmenu : 'onContextMenu',
                afterrender : 'onAfterRender',
                topresultsloaded : 'onAfterSearch'
            }
        },
        btnDownloadSelected : {
            selector : '#downloadselected',
            live : true,
            listeners : {
                click : 'onDownloadSelectedClick'
            }
        },
        searchTree : {
            selector : 'searchtree',
            listeners : {
                itemclick : 'onTreeNodeClick'
            }
        },
        btnRefresh : {
            selector : '#btnRefresh',
            live : true,
            listeners : {
                click : 'onRefreshBtnClick'
            }
        },
    },
    onRefreshBtnClick : function() {
         this.getSearchGrid().loadResults();
    },
    doSearch : function() {
		debugger;
		console.log('doSearch');
        this.beforeSearch();
        var searchTerm = this.getSearchField().getValue();
        this.getDlmService().search(searchTerm).then({
            success : function(results) {
				console.log('onAfterSearch');
                this.onAfterSearch(results);
            },
            failure : function(response) {
                this.onSearchFail();
            },
            scope : this
        })
    },

    doSearchFromEnterKey : function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doSearch();
        }
    },
    onDownloadSelectedClick : function(btn) {
        var grid = this.getSearchGrid();
        debugger;
        grid.downloadSelectedTorrents();

    },
    beforeSearch : function() {
        var grid = this.getSearchGrid();
        grid.setFilterCat('all');
        grid.setLoading(true);
    },
    onAfterSearch : function(searchResults) {
		console.log('after search');
        var searchTree = this.getSearchTree(), cats = [], grid = this.getSearchGrid();
        grid.setLoading(false);
        Ext.each(searchResults, function(res) {
            Ext.Array.include(cats, res.category);
        });
        searchTree.setCategories(cats);
        grid.setResults(searchResults);
    },

    onSearchFail : function(response, grid) {
        grid.setLoading(false);
        Ext.Msg.alert('Error', 'Error performing search: ' + response.error);
    },

    onTreeNodeClick : function(treeview, record, item, index, e, eOpts) {
        var grid = this.getSearchGrid();
        grid.setFilterCat(record.raw.filter);

    },

    onAfterRender : function(gridPanel) {
        gridPanel.contextMenu.gridPanel = gridPanel;
    },

    onContextMenu : function(view, record, item, index, e) {
        e.stopEvent();
        var grid = this.getSearchGrid();
        grid.contextMenu.record = record;
        grid.contextMenu.showAt(e.getXY());
    },

    onContextMenuClick : function(menu, item, e, eOpts) {
        var grid = menu.gridPanel;
        if (!item) {
            return;
        }
        switch (item.action) {
            case 'download':
                grid.downloadSelectedTorrents();
                break;
            case 'view':
                grid.openTorrentUrl();
                break;
        }
    },

    openHomeUrl : function(grid) {
        var selected = grid.getSelectionModel().getSelection()[0];
        if (selected) {
            window.open(selected.get('link'));
        }
    },

    onSearchFieldEnterPress : function(field, e) {
        if (e.getKey() === e.ENTER) {
            var grid = field.up('gridpanel');
            grid.setSearchTerm(field.getValue());
        }
    },

    onSearchGoButtonClick : function(btn) {
		console.log('onSearchGoButtonClick');
        var grid = btn.up('gridpanel'), field = grid.down('searchfield');
        grid.setSearchTerm(field.getValue());
	},

});
