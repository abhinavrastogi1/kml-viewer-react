# GeoJSON KML File Viewer

This project allows you to upload KML files, convert them to GeoJSON, and view them on an interactive map. You can also explore the details of the KML file, such as geometry types and calculate the total lengths of `LineString` and `MultiLineString` geometries.

## Features

- **Upload KML files**: Upload KML files and see their contents on an interactive map.
- **View geometry summary**: Get a summary of all geometry types in the KML file.
- **Detailed geometry info**: Calculate and view the total length of `LineString` and `MultiLineString` geometries.

---

## Installation

To get started, clone the repository and install the required dependencies:

1. **Clone the repository**
      ` git clone https://github.com/yourusername/geojson-kml-viewer.git`
2. **Install dependencies**
    `npm install`

3. **Run the Project**
    `npm run dev `



## Tech Stack

- **React**:JavaScript library for building user interfaces.
- **TailwindCSS**- Utility-first CSS framework for styling.
- **Turf.js** - Geospatial library for geometry calculations.
- **react-leaflet** - React wrapper for the Leaflet map component.
- **togeojson** - Converts KML to GeoJSON.
