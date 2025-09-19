import React from "react";

const IframeLoading = ({heading}) => {
    return (
        <div className="flex-1 md:pt-4">
            <div className="w-full h-[740px] bg-accent rounded-lg animate-pulse ">
                <div className='pt-4 text-center'>{heading}</div>
                <div className="p-8 h-full flex flex-wrap">
                    {[
                        "w-33", "w-33", "w-22", "w-42", "w-42", "w-42", "w-22", "w-42", "w-42", "w-12",
                        "w-22", "w-12", "w-22", "w-42", "w-22", "w-42", "w-42", "w-12", "w-12", "w-12",
                        "w-12", "w-32", "w-42", "w-32", "w-42", "w-22", "w-32", "w-22", "w-12", "w-32",
                        "w-32", "w-12", "w-22", "w-32", "w-12", "w-18", "w-32", "w-32", "w-32", "w-12",
                        "w-32", "w-32"
                    ].map((width, idx) => (
                        <div
                            key={idx}
                            className={`${width} h-4 bg-foreground rounded animate-pulse mx-auto mb-2`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IframeLoading;
