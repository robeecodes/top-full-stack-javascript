import img from "./odinImg.png";

export default function odinImg() {
    const image = document.createElement("img");
    image.src = img;

    document.body.appendChild(image);
}
