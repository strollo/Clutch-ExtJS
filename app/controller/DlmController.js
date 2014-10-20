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
                itemdblclick : 'onSearchResultDoubleClick',
                itemclick : 'onSearchResultSingleClick',
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
          btnTopDownloadSelected : {
            selector : '#btnTopDownloadselected',
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
        // commentsGrid : {
        // selector : 'commentsgrid',
        // listeners : {
        // show : 'onCommentsGridShow'
        // }
        // },

        movieGrid : {
            selector : 'movieinfo gridpanel',
            listeners : {
                select : 'onMovieResultChange'
            }
        },

        btnMovieGo : {
            selector : 'movieinfo toolbar button[action=go]',
            listeners : {
                click : 'onManualMovieSearchClick'
            }
        },
        movieSearchField : {
            selector : 'movieinfo toolbar #moviesearchtext',
            listeners : {
                specialkey : 'onMovieTextFieldSpecialKey'
            }
        },
        btnViewOnImdb : {
            selector : 'movieinfo toolbar button[action=viewimdblink]',
            listeners : {
                click : 'onViewImdbClick'
            }
        },
        btnViewOnRottenTomatoes : {
            selector : 'movieinfo toolbar button[action=viewrtlink]',
            listeners : {
                click : 'onViewRtClick'
            }
        }

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

    onMovieTextFieldSpecialKey : function(field, e) {
        if (e.getKey() === e.ENTER) {
            var grid = field.up('movieinfo');
            grid.doManualSearch();
        }
    },

    onDownloadSelectedClick : function(btn) {
        var grid = this.getSearchGrid();
        debugger;
        grid.downloadSelectedTorrents();

    },

    onViewImdbClick : function(btn) {
        btn.up('movieinfo').openIMDB();
    },

    onViewRtClick : function(btn) {
        btn.up('movieinfo').openRottenTomatoes();
    },

    onManualMovieSearchClick : function(btn) {
        var moviePanel = btn.up('movieinfo');
        moviePanel.doManualSearch();
    },

    onMovieResultChange : function(sm, record, item, index, e, eOpts) {
        var panel = sm.view.ownerCt.up('movieinfo');
        panel.loadRecord(record);
    },

    onAfterRenderPirateBayTop : function(topGrid) {
		console.log('FIXME');
        topGrid.loadResults();
    },

    onCommentsGridShow : function(commentsGrid) {
        var url = commentsGrid.getValue();
        commentsGrid.loadComments(url);
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
            case 'showmovieinfo':
                grid.showMovieInfo();
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
        grid.setSearchTerm(field.getValue());},

    onSearchResultSingleClick : function(view, record, item, index, e, eOpts) {

        var grid = view.up('gridpanel'), detailsPanel = this.getView().down('searchresultdetailspanel');
        // selection = grid.getSelectionModel().getSelection()[0];
        //detailsPanel.expand();
        detailsPanel.setValue(record);
    },

    onSearchResultDoubleClick : function(view, record, item, index, e, eOpts) {

        var detailsPanel = this.getView().down('searchresultdetailspanel');
        detailsPanel.expand();
        // this.downloadTorrent(url);

    }
});
