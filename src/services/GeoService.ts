export interface ICoordinates {
  accuracy: Number
  latitude: Number
  longitude: Number
}

export const getGeoLocation = (): any => {
  navigator.geolocation.getCurrentPosition( (position) => {

    console.log('Geoservice1', position);

      const coordinates: ICoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      }
      console.log('Geoservice2', coordinates);
      
      return coordinates;
    },
    (error => {
      console.error("Error Code = " + error.code + " - " + error.message);
    }), {enableHighAccuracy: true}
  );
}
