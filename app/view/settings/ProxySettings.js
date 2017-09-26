Ext.define('Clutch.view.settings.ProxySettings', {
	
    extend : 'Clutch.view.settings.SettingsCardBase',
    title : 'Proxy',

    config : {
        fields : ['proxy-server-enabled', 'proxy-type', 'proxy-server', 'proxy-port', 'proxy-authentication-required', 'proxy-authentication', 'proxy-username']
    },

    alias : 'widget.proxysettings',

    items : [{
        xtype : 'fieldset',
        title : 'Bandwidth',
        items : [{
            xtype : 'fieldset',
            title : 'Normal Mode',
            items : [
			{
                fieldLabel : 'Proxy enabled',
                allowBlank : false,
                xtype : 'checkbox',
                name : 'proxy-server-enabled'
            },
			{
				fieldLabel : 'Proxy Type',
				xtype: 'combobox',
				displayField: 'label',
				valueField: 'value',
				store: Ext.create('Ext.data.Store', {
					type : 'json',
					proxy : {
						type : 'memory'
					},
					data: [
						{label: 'HTTP', value: 0},
						{label: 'SOCKS4', value: 1},
						{label: 'SOCKS5', value: 2}
					]						
				}),
				name : 'proxy-type'
			},			
			{
                fieldLabel : 'Proxy server',
                allowBlank : false,
                xtype : 'textfield',
                name : 'proxy-server'
            },
			{
                fieldLabel : 'Proxy port',
                allowBlank : false,
                xtype : 'numberfield',
                name : 'proxy-port'
            },
			{
                boxLabel : 'Authentication required',
                xtype : 'checkbox',
                name : 'proxy-authentication-required'
            },
			{
                fieldLabel : 'Proxy Authentication',
                allowBlank : false,
                xtype : 'textfield',
                name : 'proxy-authentication'
            }, 
			{
                fieldLabel : 'Proxy Username',
                allowBlank : false,
                xtype : 'textfield',
                name : 'proxy-username'
            }
          ]
		}]
	}]
});