/**
 */
Ext.define('dlm.Search', {

	requires : ['Ext.data.JsonP'],

	mixins : {
		observable : 'Ext.util.Observable'
	},
	singleton : true,

	config : {
		apiUrl : 'http://localhost:8080/search/Search.php?what={0}',
		topUrl : 'http://apify.ifc0nfig.com/tpb/top?id=all&key=121a959a04d443c8a163f7603c043040'
	},

	constructor : function (config) {
		var me = this;
		me.initConfig(config);
		me.mixins.observable.constructor.call(me, config);
	},

	search : function (searchTerm) {
		searchTerm = encodeURIComponent(searchTerm);
		var apiUrl = this.getApiUrl(),
		url = Ext.String.format(apiUrl, searchTerm);
		var deferred = Ext.create('Deft.promise.Deferred');

		Ext.data.JsonP.request({
			url : url,

			success : function (results) {
				var betterResults = [];
				Ext.each(results.data, function (r) {
					betterResults.push(this.cleanUpResult(r));
				}, this);
				deferred.resolve(betterResults);
			},
			scope : this,

			failure : function (response) {
				deferred.reject('Failed to perform search at The DLM');
			}
		});

		return deferred.promise;

	},
	
	cleanUpResult : function (r) {
		elem = r;
		var SearchResult = {
			plugin: elem.plugin,
			name : elem.title,
			category : elem.category,
			seeds : elem.seeds,
			leechers : elem.leechs,
			torrentLink : elem.download,
			commentsLink : '',
			summaryLink : '',
			pubDate : this.tryParseDate(elem.datetime), //todo convert this crap
			id : elem.hash,
			// size : this.tryParseSize(elem.size), //also needs converting,
			size: elem.size, //also needs converting,
			downloads : 0,
			comments : 0
		}
		return SearchResult;
	},

	tryParseDate : function (badDate) {
		var prefixYear = (new Date().getYear() + 1900) + " ";
		// Date.getYear() gives the current year - 1900
		var dateFormat1 = "yyyy MM-dd HH:mm";
		var dateFormat2 = "yyyy-MM-dd";

		var possGoodDate = new Date(Date.parse(prefixYear + badDate, dateFormat1));
		if (possGoodDate != 'Invalid Date') { //MAKE SURE TO KEEP !=, using !== always returns true
			return possGoodDate;
		}

		possGoodDate = new Date(Date.parse(badDate, dateFormat2));
		if (possGoodDate != 'Invalid Date') {
			return possGoodDate;
		}
		//must be in "Today/Y-Day" format, just return todays date
		return new Date();
	},

	tryParseSize : function (badSize) {
		var currVal = badSize;
		var currLbl = 'B';
		if (currVal / 1000 > 1) {
			currLbl = 'Kb';
			currVal = currVal / 1000;
		} else {
			return parseFloat(currVal).toFixed(2).toString() + ' ' + currLbl;
		}
		if (currVal / 1000 > 1) {
			currLbl = 'Mb';
			currVal = currVal / 1000;
		} else {
			return parseFloat(currVal).toFixed(2).toString() + ' ' + currLbl;
		}
		if (currVal / 1000 > 1) {
			currLbl = 'Gb';
			currVal = currVal / 1000;
		} else {
			return parseFloat(currVal).toFixed(2).toString() + ' ' + currLbl;
		}
		return parseFloat(currVal).toFixed(2).toString() + ' ' + currLbl;
	},
});
