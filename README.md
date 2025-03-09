GeoJSON KML File Viewer

This project allows you to upload KML files, convert them to GeoJSON, and view them on an interactive map. You can also explore the details of the KML file like geometry types and calculate the total lengths of LineString and MultiLineString geometries.

Features
Upload a KML file and see its contents on a map.
View a summary of all geometry types in the KML file.
View detailed information like total length of LineString and MultiLineString geometries.


Installation
Clone the repository
git clone https://github.com/yourusername/geojson-kml-viewer.git

Install dependencies

cd geojson-kml-viewer
npm install

Run the project
npm start


How to Use

Upload a KML file by clicking the Choose File button.
After the file is uploaded, it will be displayed on a map. You can then explore the summary and details of the KML file.
Summary: It shows a count of different geometry types present in the KML.
Details: Shows the total length (in kilometers) of LineString and MultiLineString geometries in the uploaded KML.


Tech Stack:
React
TailwindCSS for styling
Turf.js for geometry calculations
react-leaflet for the map component
togeojson to convert KML to GeoJSON
