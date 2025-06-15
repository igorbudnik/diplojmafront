import L from "leaflet";
import "./cluster.css";

export const createClusterCustomIcon = (cluster: L.MarkerCluster) => {
  const count = cluster.getChildCount();
  const lightness = 100 - Math.min(count * 2, 70);

  return L.divIcon({
    html: `
      <div style="
        background-color: hsla(0, 0%, ${lightness}%, 0.7);
        width: 40px;
        height: 40px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${count <= 30 ? "black" : "white"};
        font-weight: bold;
        font-size: 12px;
        text-shadow: 0 0 2px black;
      ">
        ${count}
      </div>
    `,
    className: "marker-cluster-custom",
    iconSize: [40, 40],
  });
};
