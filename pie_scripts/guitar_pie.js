var pie = new d3pie("pieChart", {
	"size": {
		"canvasHeight": 315,
		"canvasWidth": 246,
		"pieOuterRadius": "100%"
	},
	"data": {
		"sortOrder": "value-desc",
		"content": [
			{
				"label": "Air Guitar",
				"value": 266379,
				"color": "#ce2aeb"
			},
			{
				"label": "Actual Guitar",
				"value": 171241,
				"color": "#d1c87f"
			}
		]
	},
	"labels": {
		"outer": {
			"format": "none",
			"pieDistance": 32
		},
		"inner": {
			"format": "label-percentage2",
			"hideWhenLessThanPercentage": 3
		},
		"mainLabel": {
			"color": "#ffffff",
			"fontSize": 16
		},
		"percentage": {
			"color": "#ffffff",
			"fontSize": 14,
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 11
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"tooltips": {
		"enabled": true,
		"type": "placeholder",
		"string": "{monkey}: {12}, {30}%"
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
});