import { Link } from 'react-router-dom'

type containerProps = {
    col?: number;
    children: any;
    className?: string;
    bg?: string;
}

const GridContainer = ({ col, children, className, bg }: containerProps) => {
    let columns = col;
    // { window.outerWidth <= 920 ? columns = col / 3 : window.innerWidth <= 720 ? columns = col / 3 : columns = col / 4 };
    return (
        <div className={`${className} grid grid-cols-${columns} gap-2 items-center bg-${bg} mb-16`} >
            {children}
        </div>
    )
}

const FlexContainer = ({ className = "", children, bg = "transparent" }: containerProps) => {
    return (
        <div className={`flex flex-col md:flex-row  bg-${bg} w-full gap-5 p-0 lg:p-2  ${className} `}>
            {children}
        </div>
    );
}
type emptyProps = {
    icon: string;
    header: String;
}
const EmptyContainer = ({ icon, header }: emptyProps) => {
    return (
        <div className="w-40 m-auto text-center  py-16 text-gray-400">
            <div className="text-4xl mb-2">{icon}</div>
            <p className="font-bold">{header}</p>
        </div>
    )
}

const LogoContainer = () => {
    return (
        <Link to="/" className="inline-flex items-center gap-2.5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="blue">
                <path d="M12 2C12 2 8 6 4 9C6 11 8 13 8 16C8 18.2 9.8 20 12 20C14.2 20 16 18.2 16 16C16 13 18 11 20 9C16 6 12 2 12 2Z" fill="#2563EB" />
                <path d="M12 20C12 20 10 21.5 10 22.5C10 23 11 23.5 12 23.5C13 23.5 14 23 14 22.5C14 21.5 12 20 12 20Z" fill="#06B6D4" />
            </svg>
            <span className="font-black text-2xl text-navy">عِفَّة</span>
        </Link>
    )
}

const Footer = () => {
    return (
        <>
            <p className="flex flex-col items-center gap-2 md:flex-row text-xs text-gray-400 mt-6">
                <div>
                    <span>• Privacy Policy</span>
                    <span>• Terms of Service</span>
                </div>
                <span>© 2026 Opica. All rights reserved.</span>
            </p>
        </>
    )
}

export { FlexContainer, GridContainer, EmptyContainer, LogoContainer, Footer }