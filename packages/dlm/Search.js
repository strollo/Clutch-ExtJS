/**
 */
Ext.define('dlm.Search', {

    requires: ['Ext.data.JsonP'],
        
    mixins : {
        observable : 'Ext.util.Observable'
    },
    singleton : true,

    config : {

        apiUrl : 'http://apify.ifc0nfig.com/tpb/search?id={0}&key=121a959a04d443c8a163f7603c043040',

        topUrl : 'http://apify.ifc0nfig.com/tpb/top?id=all&key=121a959a04d443c8a163f7603c043040'

    },

    constructor : function(config) {
	debugger;
        var me = this;

        me.initConfig(config);

        me.mixins.observable.constructor.call(me, config);
       
    },

    search : function(searchTerm) {
		debugger;
        searchTerm = encodeURIComponent(searchTerm);
        var apiUrl = this.getApiUrl(), url = Ext.String.format(apiUrl, searchTerm);
        var deferred = Ext.create('Deft.promise.Deferred');
        
        Ext.data.JsonP.request({
            url : url,

            success : function(results) {
               var betterResults = [];
                Ext.each(results, function(r) {
                    betterResults.push(this.cleanUpResult(r));
                }, this);
                              
                deferred.resolve(betterResults);
  //              deferred.resolve(results);
               
            },
            scope : this,

            failure : function(response) {
                deferred.reject('Failed to perform search at The DLM');
              }
        });
        
        return deferred.promise;

    },
    getTopResults : function(callingGrid) {
        var url = this.getTopUrl();
        var deferred = Ext.create('Deft.promise.Deferred');
       
        Ext.data.JsonP.request({
            url : url,

            success : function(results) {
                var betterResults = [];
                Ext.each(results, function(r) {
                    betterResults.push(this.cleanUpResult(r));
                }, this);
              
                deferred.resolve(betterResults);

            },
            scope : this,

            failure : function(response) {

                //Clutch.app.fireEvent('searchfail', response, callingGrid);
                deferred.reject('Failed to perform search at The DLM')
            }
        });
        
        return deferred.promise;
    },
    
        cleanUpResult : function(r) {

        var SearchResult = {
            name : r.name,

            category : r.category,

            seeds : r.seeders,

            leechers : r.leechers,

            torrentLink : r.magnet,

            commentsLink : '',

            summaryLink : '',

            provider : 'The DLM',

            pubDate : this.tryParseDate(r.uploaded), //todo convert this crap

            id : r.id,

            size : this.tryParseSize(r.size), //also needs converting,

            downloads : 0,

            comments : 0

        }
        return SearchResult;
    },

    tryParseDate : function(badDate) {
        var prefixYear = (new Date().getYear() + 1900) + " ";
        // Date.getYear() gives the current year - 1900
        var dateFormat1 = "yyyy MM-dd HH:mm";
        var dateFormat2 = "MM-dd yyyy";

        var possGoodDate = new Date(Date.parse(prefixYear + badDate, dateFormat1));
        if (possGoodDate != 'Invalid Date') {//MAKE SURE TO KEEP !=, using !== always returns true
            return possGoodDate;
        }

        possGoodDate = new Date(Date.parse(badDate, dateFormat2));
        if (possGoodDate != 'Invalid Date') {
            return possGoodDate;
        }
        //must be in "Today/Y-Day" format, just return todays date
        return new Date();
    },

    tryParseSize : function(badSize) {
        var split = badSize.split(" "), units = split[1], badValue = split[0], goodValue = 0;
        switch(units) {
            case 'MiB':
                goodValue = badValue * 1024 * 1024;
                break
            case 'GiB':
                goodValue = badValue * 1024 * 1024 * 1024;
                break;
            case 'KiB':
                goodValue = badValue * 1024;
                break;
            case 'B':
                goodValue = badValue * 1;
                break;
            default:
                console.log('Unknown unit: ' + units);
                break;
        }
        return goodValue;

    },
});

