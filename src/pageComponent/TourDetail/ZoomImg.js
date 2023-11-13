import Image from "next/image";
import {
  TransformWrapper,
  TransformComponent,
  useControls
} from "react-zoom-pan-pinch";

function ZoomImg({img}) {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className="absolute top-[0.5vw] left-[0.5vw] z-10 flex">
        <button className="text-[1.6vw] w-[1.8vw] h-[1.8vw] rounded-full bg-[#333] text-white leading-[1.8vw]" onClick={() => zoomIn()}>+</button>
        <button className="text-[1.6vw] mx-[1vw] w-[1.8vw] h-[1.8vw] rounded-full bg-[#333] text-white leading-[1.8vw]" onClick={() => zoomOut()}>-</button>
        <button className="text-[1vw]" onClick={() => resetTransform()}>reset</button>
      </div>
    );
  };
  return (
    <TransformWrapper>
      <Controls />
      <TransformComponent>
        <Image src ={img?.sourceUrl} quality={100} width={1000} height={1000} className="object-contain h-[75vh]" alt={img?.altText}/>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default ZoomImg;
