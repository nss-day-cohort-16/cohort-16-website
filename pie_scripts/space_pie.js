var pie = new d3pie("spacePieChart", {
	"size": {
		"canvasHeight": 315,
		"canvasWidth": 246,
		"pieOuterRadius": "100%"
		},
    "data": {
    "sortOrder": "value-desc",
    "content": [
        {
        "label": "Two Space",
        "value": 247343,
        "color": "#ce2aeb"
        },
        {
        "label": "Four Space",
        "value": 190277,
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