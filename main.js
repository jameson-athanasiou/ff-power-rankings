fetch('https://hooks.slack.com/services/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', {
            method: 'post',
            'Content-type': 'application/json',
            body: JSON.stringify({
				'attachments': [{
'fallback': 'A textual representation of your table data',
'fields': [
{
'title': 'field1',
'value': 'data1',
'short': true
},
{
'title': 'field2',
'value': 'data2',
'short': true
}
]
}]
			})
        })
