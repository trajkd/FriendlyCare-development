"use strict"
const video = document.getElementById("videoElement");
const canvas = document.getElementById("imageContainer");
const context = canvas.getContext("2d");
const constraints = {audio:false, video:{width:1600, height:1200,facingMode:"user"}}

// var visible = 'bar'
// $("#switch").on('click', function() {
// 	if (visible == 'bar') {
// 		$("#bar").css({"visibility":"hidden"});
// 		$("#chart").css({"visibility":"visible"});
// 		visible = 'chart'
// 	} else {
// 		$("#bar").css({"visibility":"visible"});
// 		$("#chart").css({"visibility":"hidden"});
// 		visible = 'bar'
// 	}
// });

var level = 0;
var layout = {
  xaxis: {
    title: {
      text: 'Tempo',
      font: {
        family: 'Verdana, monospace',
        size: 18
      }
    },
  },
  yaxis: {
    title: {
      text: 'Grado di felicità',
      font: {
        family: 'Verdana, monospace',
        size: 18
      }
    }
  }
};
Plotly.plot("chart", [{
	y:[level],
	type: 'line'
}],
layout);
var cnt = 0;

var stanco = 0;
var rilassato = 0;
var motivato = 0;
Plotly.newPlot("bar", [
  {
    x: ['Stanco', 'Rilassato', 'Motivato'],
    y: [stanco, rilassato, motivato],
    marker:{color: ['red', 'yellow', 'green']},
    type: 'bar'
  }
],{yaxis: {
    title: 'Frequenza',
    titlefont: {size: 16}}});

// var CloudVisionApi = require('cloud_vision_api');
// var defaultClient = CloudVisionApi.ApiClient.instance;

// // Configure API key authorization: ApiKey
// var ApiKey = defaultClient.authentications['ApiKey'];
// ApiKey.apiKey = "izz6sXoXn00q6TqYt6VmtWUCqBpznsPy"

// var api = new CloudVisionApi.ImagesApi()

window.setInterval(function(){
  	context.drawImage(video, 0, 0, canvas.width, canvas.height);
	// var opts = { 
	//   'body': JSON.stringify({"requests":[{"image":{"content":canvas.toDataURL("image/tiff")},"features":[{"type":"FACE_DETECTION"}]}]}), // {{BatchAnnotateImagesRequest}} 
	//   'callback': callback_example, // {{String}} JSONP
	//   'alt': "json", // {{String}} Data format for response.
	//   'prettyPrint': true // {{Boolean}} Returns response with indentations and line breaks.
	// };
	// var callback = function(error, data, response) {
	//   if (error) {
	//     console.error(error);
	//   } else {
	//     console.log('API called successfully. Returned data: ' + data);
	//   }
	// };
	// api.visionImagesAnnotate(opts, callback);

	// $.post("https://hackathon.tim.it/gcloudvision/v1/images:annotate?uploadType=&fields=&callback=&$.xgafv=&alt=&upload_protocol=",
	// {
	// 	label: "video capture",
	// 	content: canvas.toDataURL("image/png")
	// },
	// function(data, status){
	// data 
	// }
    var settings = {
		"url": "https://hackathon.tim.it/gcloudvision/v1/images:annotate",
		"method": "POST",
		"timeout": 0,
		"headers": {
		// Put your API key
		"apikey": "",
		"Content-Type": "application/json"
		},
		"data": JSON.stringify({"requests":[{"image":{"content":canvas.toDataURL("image/png").split(",")[1]},"features":[{"type":"FACE_DETECTION"}]}]}),
	};

	$.ajax(settings).done(function (response) {
		console.log(response['responses']['0']['faceAnnotations']['0']['sorrowLikelihood']);
		if(response['responses']['0']['faceAnnotations']['0']['joyLikelihood'] == "VERY_UNLIKELY") {
			$("#emoji").css({"transform":"scale(0)"})
			$("#emoji").attr("src","../static/img/happy.gif");

			if(response['responses']['0']['faceAnnotations']['0']['sorrowLikelihood'] == "VERY_UNLIKELY") {
				$("#emoji").css({"transform":"scale(0)"})
				$("#emoji").attr("src","../static/img/angry.gif");
				level = 0;
				rilassato++;
			}
			if(response['responses']['0']['faceAnnotations']['0']['sorrowLikelihood'] == "UNLIKELY" || response['responses']['0']['faceAnnotations']['0']['sorrowLikelihood'] == "POSSIBLE") {
				$("#emoji").css({"transform":"scale(0.5)"})
				$("#emoji").attr("src","../static/img/angry.gif");
				level = -0.5;
				stanco++;
			}
			if(response['responses']['0']['faceAnnotations']['0']['sorrowLikelihood'] == "LIKELY" || response['responses']['0']['faceAnnotations']['0']['sorrowLikelihood'] == "VERY_LIKELY") {
				$("#emoji").css({"transform":"scale(1)"})
				$("#emoji").attr("src","../static/img/angry.gif");
				level = -1;
				stanco++;
			}
		}
		if(response['responses']['0']['faceAnnotations']['0']['joyLikelihood'] == "UNLIKELY" || response['responses']['0']['faceAnnotations']['0']['joyLikelihood'] == "POSSIBLE") {
			$("#emoji").css({"transform":"scale(0.5)"})
			$("#emoji").attr("src","../static/img/happy.gif");
			level = 0.5;
			motivato++;
		}
		if(response['responses']['0']['faceAnnotations']['0']['joyLikelihood'] == "LIKELY" || response['responses']['0']['faceAnnotations']['0']['joyLikelihood'] == "VERY_LIKELY") {
			$("#emoji").css({"transform":"scale(1)"})
			$("#emoji").attr("src","../static/img/happy.gif");
			level = 1;
			motivato++;
		}

		Plotly.extendTraces('chart', {y:[[level]]}, [0]);
		Plotly.newPlot("bar", [
		  {
		    x: ['Stanco', 'Rilassato', 'Motivato'],
		    y: [stanco, rilassato, motivato],
		    marker:{color: ['red', 'yellow', 'green']},
		    type: 'bar'
		  }
		],{yaxis: {
		    title: 'Frequenza',
		    titlefont: {size: 16}}});
		cnt++;
		if(cnt>20) {
			Plotly.relayout('chart', {
				xaxis: {
					range: [cnt-20,cnt]
				}
			});
		}

		var data = {'joyLikelihood': response['responses']['0']['faceAnnotations']['0']['joyLikelihood'],
				'sorrowLikelihood': response['responses']['0']['faceAnnotations']['0']['sorrowLikelihood']}

		var settings2 = {
			// Change to your appspot URL
			"url": "https://friendlycare.uc.r.appspot.com/json",
			// "url": "http://localhost:8080/json",
			"contentType": "application/json",
			"method": "POST",
			"data": data,
		};

		$.ajax(settings2).done(function (response) {
		});
	});
}, 2000);

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
	video.srcObject = mediaStream;
});