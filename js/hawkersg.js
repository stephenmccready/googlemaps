var gmarkers = [];

function initialize() {
            
            var infowindow = new google.maps.InfoWindow({content: "holding..."});

            // Centre the map on Singapore
            var mapCenter = new google.maps.LatLng(1.35,103.851959);
            var mapOptions = {
                zoom: 12,
                center: mapCenter
            };

            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            var oReq = new XMLHttpRequest(); //New request object
            
            oReq.onload = function() { 
                        // Create an object containing LatLng and population for each hawker centre.
                        var hawkerMap = {};
                        var mapArray=JSON.parse(this.responseText);
            //            alert(this.responseText);
                            
            //	    document.getElementById("divDebug").innerHTML=this.responseText;
                            
                        for(var i=1;i<mapArray.length;i++){
//                        for(var i=11;i<20;i++){
                                    if (mapArray[i] != false && mapArray[i][0]!="[Name]") {
                                                hawkerMap[i]={
                                                            id: i,
                                                            name: mapArray[i][0],
                                                            address: mapArray[i][1],
                                                            center: new google.maps.LatLng(mapArray[i][2], mapArray[i][3]),
                                                            lat: mapArray[i][2],
                                                            lng: mapArray[i][3]
                                                };
                                    }
                        }
            
                        for (var hawkerCntr in hawkerMap) {
                                    /*         
                                    var marker1 = new MarkerWithLabel({
                                                position: hawkerMap[hawkerCntr].center,
                                                map: map,
                                                labelContent: hawkerMap[hawkerCntr].id,
                                                labelAnchor: new google.maps.Point(22, 0),
                                                labelClass: "labels", // the CSS class for the label
                                                labelStyle: {opacity: 0.75}
                                              });
                                    */
                                    var marker = new google.maps.Marker({
                                    //            icon:       {path: google.maps.SymbolPath.CIRCLE,scale: 4},
                                                position:   hawkerMap[hawkerCntr].center,
                                                map:        map,
                                                title:      hawkerMap[hawkerCntr].id+'. '+hawkerMap[hawkerCntr].name,
                                                content:    '<div class="content">'+'<h3>'+hawkerMap[hawkerCntr].id+'. '+hawkerMap[hawkerCntr].name+'</h3>'+
                                                            hawkerMap[hawkerCntr].address.replace("Singapore","<br />Singapore")+'<br><br>'+
                                                            hawkerMap[hawkerCntr].lat+','+hawkerMap[hawkerCntr].lng+'</div>'
                                    });
                                    
                                    gmarkers.push(marker);
                                    
                                    document.getElementById('map-list').innerHTML
                                                +='<div class="map-list-item">'+hawkerMap[hawkerCntr].id+'. '+'<a href="javascript:sideClick('+(gmarkers.length-1)+')">'
                                                +hawkerMap[hawkerCntr].name+'</a>'
                                                +'<br>'+hawkerMap[hawkerCntr].address.replace("Singapore","<br />Singapore")+'</div>';
                        
                                    var infowindow = new google.maps.InfoWindow();
                                    google.maps.event.addListener(marker, 'click', (function(marker) {
                                                return function() {
                                                            infowindow.setContent(this.content);
                                                            infowindow.open(map, marker);
                                                }
                                    })(marker));
                        }
            };

	oReq.open("get", "php/getHawkerSG.php", true);
	oReq.send();

}

function sideClick(i) {
            google.maps.event.trigger(gmarkers[i], "click");
}

google.maps.event.addDomListener(window, 'load', initialize);
