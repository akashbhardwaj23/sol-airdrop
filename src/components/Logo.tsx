
import Image from "next/image";

export function Logo(){
    return (
        <div className="absolute flex justify-center top-16 w-full mb-8 ">
        <Image
          src={"https://solana.com/favicon.png"}
          width={600}
          height={600}
          style={{width : "auto", height : "auto"}}
          alt="solana-image"
        />
      </div>
    )
}