"use client"
import { Video } from '@imagekit/next';

type VideoComponentProps = {
    src: string;
    className?: string;
}

const VideoComponent = ({ src, className }: VideoComponentProps) => {
    return (
        <div className={className}>
            <Video
                urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                src={src}
                controls
                transformation={[{
                    width: 1928, height: 1080, q: 90,
                    overlay: {
                        type: "text",
                        text: "Hello",
                        transformation: [
                            { fontSize: 20, fontColor: "FF0000" } // Specify font size and color of the text
                        ]
                    }
                }]}
            />
        </div>
    )
}

export default VideoComponent