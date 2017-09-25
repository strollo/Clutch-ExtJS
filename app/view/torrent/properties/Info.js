Ext.define('Clutch.view.torrent.properties.Info', {

    extend : 'Ext.form.Panel',
    
    requires : ['Clutch.view.field.TorrentStateField', 'Clutch.view.field.BytesField','Clutch.view.field.TextTimeField','Clutch.view.field.TimestampField'],
    
    alias : 'widget.torrentinfo',
    
    layout : 'column',
	autoScroll: true,

    items : [
	{
        xtype : 'fieldset',
		columnWidth: 0.5,
        layout: 'anchor',		
		border: 0,
        /* title : 'Activity', */
        defaults : {
            xtype : 'textfield',
            readOnly : true,
            width : 400,
			anchor: '100%'
        },
        items : [{            
            fieldLabel : 'Availability',
            name : 'metadataPercentComplete'
        }, {
            fieldLabel : 'Downloaded',
            xtype : 'bytesfield',
            name : 'downloadedEver'
        }, {
            fieldLabel : 'Uploaded',
            name : 'uploadedEver',
            xtype : 'bytesfield'
        }, {
            fieldLabel : 'State',
            name : 'status',
            xtype : 'torrentstatefield'
        }, {
            fieldLabel : 'Running Time',
            name : 'secondsDownloading',
            xtype : 'secondsfield'
        }, {
            fieldLabel : 'Remaining Time',
            name : 'eta',
            xtype : 'secondsfield'
        }, {
            fieldLabel : 'Last Activity',
            tooltip : 'The last time we uploaded or downloaded piece data on this torrent',
            name : 'activityDate',
            xtype : 'timestampfield'
        }, {
            fieldLabel : 'Errors',
            name : 'error'
        }]
    }, 
	{
        xtype : 'fieldset',
        /* title : 'Details', */
		border: 0,
		xtype : 'fieldset',
		columnWidth: 0.5,
        layout: 'anchor',		
        defaults : {
            xtype : 'textfield',
            readOnly : true,
            width : 400,			
			anchor: '100%',
			border: 0,
        },
        items : [{
            fieldLabel : 'Size',
            name : 'sizeWhenDone',
            xtype : 'bytesfield'
        }, {
            fieldLabel : 'Location',
            name : 'downloadDir'
        }, {
            fieldLabel : 'Hash',
            name : 'hashString'
        }, {
            fieldLabel : 'Privacy',
            name : 'isPrivate'
        }, {
            fieldLabel : 'Origin',
            name : 'creator'
        }, {
            fieldLabel : 'Comment',
            name : 'comment'
        }]

    }],

    config : {

    },

    setValue : function(torrentData) {
        this.loadRecord(torrentData);
    }
});

/*1.18 MB of 497.6 MB (0.35%), 589.8 kB Unverified
 Activity

 Availability: 100%
 Downloaded:  815.1 kB
 Uploaded: 3.11 MB (Ratio: 3.81)
 State: Downloading
 Running Time: 4 minutes
 Remaining Time:  17 hours
 Last Activity: Active now
 Error: None

 Details

 Size: 497.6 MB (1,899 pieces @ 256.0 KiB)
 Location: /home/whitcombecr/Downloads
 Hash: 63db3c2bedc40505d1f548c3a8b3b05597420190
 Privacy: Public torrent
 Origin: Created by ruTorrent (PHP Class - Adrien Gibrat) on Mon Feb 18 2013
 Comment: Torrent downloaded from <a target="_blank" href="http://www.btscene.eu">http://www.btscene.eu</a>
 */