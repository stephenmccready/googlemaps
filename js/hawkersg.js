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
                        for(var i=1;i<mapArray.length;i++){
                                    if (mapArray[i] != false && mapArray[i][0]!="[Name]") {
                                                hawkerMap[i]={
                                                            id: i,
                                                            name: mapArray[i][0],
                                                            address: mapArray[i][1],
                                                            center: new google.maps.LatLng(mapArray[i][2], mapArray[i][3]),
                                                };
                                    }
                        }
                        
                        // Create a marker for each hawker centre
                        for (var hawkerCntr in hawkerMap) {
                                    var marker = new google.maps.Marker({
                                                position:   hawkerMap[hawkerCntr].center,
                                                map:        map,
                                                title:      hawkerMap[hawkerCntr].id+'. '+hawkerMap[hawkerCntr].name,
                                                content:    '<div id="content">'+'<h3>'+hawkerMap[hawkerCntr].id+'. '+hawkerMap[hawkerCntr].name+'</h3>'+
                                                            hawkerMap[hawkerCntr].address.replace("Singapore","<br />Singapore")+
                                                            '<table><tr>'+
                                                            '<td><b></b></td><td class="tdRight">'+''+'</td><td></td><td></td></tr>'+
                                                            '</table>'+'</div>'
                                    });
                                    
                                    gmarkers.push(marker);
                                    
                                    // Append each hawker centre to the list on the side bar with a clickable name
                                    document.getElementById('map-list').innerHTML
                                                +=hawkerMap[hawkerCntr].id+'. '+'<a href="javascript:sideClick('+(gmarkers.length-1)+')">'
                                                +hawkerMap[hawkerCntr].name+'</a>'
                                                +'<br>'+hawkerMap[hawkerCntr].address.replace("Singapore","<br />Singapore")+'<br>';
                        
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

// When the name on the sidebar is clicked, it triggers a marker click (as if you had clicked the marker for the infowindow to pop up)
function sideClick(i) {
            google.maps.event.trigger(gmarkers[i], "click");
}

google.maps.event.addDomListener(window, 'load', initialize);
