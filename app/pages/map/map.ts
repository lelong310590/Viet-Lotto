import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation, Toast, GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleMapsMarkerIcon} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/map/map.html'
})
export class Map {

  public mapPosition: any;
  public map: GoogleMap;

  constructor(private navCtrl: NavController, private platform: Platform, private http: Http) {
      platform.ready().then(() => {
        this.loadMap();
      });
  }

  public loadMap() {
    // Get data marker  
    this.http.get('http://loto.halogi.com/store').map(res => res.json()).subscribe(data => {
        this.mapPosition = data;
       
        let map = new GoogleMap('map', {
            zoom: 15
        });

        map.on(GoogleMapsEvent.MAP_READY).subscribe( 
            function() {
                map.setMyLocationEnabled(true);
                map.setZoom(15);

                Geolocation.getCurrentPosition().then((resp) => {
                    let lat =  resp.coords.latitude; 
                    let long = resp.coords.longitude;
                    let coord = new GoogleMapsLatLng(lat, long); // Current Position
                    map.setCenter(coord);
                    map.animateCamera({
                      'target': coord,
                      'zoom': 18,
                    });

                    Toast.show("Chọn một đại lý bán vé ở gần bạn và bắt đầu tham gia", '3000', 'center').subscribe(
                        toast => {
                            console.log(toast);
                        }
                    );

                    // console.log(data);
                    addMarkers(data, function(markers) {
                      markers[markers.length - 1].showInfoWindow();
                    });
                })
                
                function addMarkers(data, callback) {
                  var markers = [];
                  function onMarkerAdded(marker) {
                    markers.push(marker);
                    if (markers.length === data.length) {
                      callback(markers);
                    }
                  }
                  
                  data.forEach(element => {
                      map.addMarker({
                        'position': new GoogleMapsLatLng(element.location.lat, element.location.lng),
                        'title': element.title
                      }).then(onMarkerAdded);
                  });
                }
                
            } 
        );
    });
    
   
  }
}
