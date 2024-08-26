const CustomMapMarker = () => {
  const markerContentArray = [
    '<div class="w-[42px] h-[42px] relative">',
    '<img src="https://waasrzvnijhadqtenzsq.supabase.co/storage/v1/object/public/product/3x_map-marker.png" alt="Custom Marker" />',
    "</div>",
  ];

  return markerContentArray.join("");
};

export default CustomMapMarker;
