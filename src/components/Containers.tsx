
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


const Footer = () => {
    return (
        <>

            {/* ── Footer ── */}
            < footer
                className="bg-white/95 flex flex-col-reverse gap-8 md:flex-row  justify-between items-center dark:bg-gray-900/95 dark:text-white text-gray-700 h-[fit-content] p-8 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-sm"
            >
                <span  className={"text-center text-2"} style={{ fontSize: ".8rem", textAlign: 'center' }}>
                    © 2026 The Precise Curator. All rights reserved.
                </span>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                    {['Privacy Policy', 'Terms of Service', 'Contact Support', 'Documentation'].map((link) => (
                        <a key={link} href="#" style={{ fontSize: 10.5, textDecoration: 'none' }}>
                            {link}
                        </a>
                    ))}
                </div>
            </footer >
        </>
    )
}

export { FlexContainer, GridContainer, EmptyContainer, Footer }