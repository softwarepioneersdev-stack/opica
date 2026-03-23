import { ReactNode } from "react";

type cardProps = {
    children?: ReactNode;
    className?: string;
    gradient?:boolean
}


const Card = ({ children, className }: cardProps) => {
    return (
        <div className={`${className} bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center"`}>{children}</div>
    )
}

const CardHeader = ({ children, className,gradient }: cardProps) => {
    let style:string = ''
    gradient ? style = " bg-gradient-to-l from-navy to-navy-mid" : style = "";
    return (
        <div className={`${className + " " +  style} `}>
            {children}
        </div >
    )
}

const CardContent = ({ children, className }: cardProps) => {
    return (
        <div className={`${className} flex flex-col gap-2 p-2`}>
            {children}
        </div>
    )
}

const Actions = ({ children, className }: cardProps) => {
    return <div className={`${className} flex justify-center flex-col md:flex-row m-0 gap-2`} >{children}</div>
}

export {
    Card, Actions, CardContent, CardHeader,
}