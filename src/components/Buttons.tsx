type btnProps = {
    style?: "primary" | "secondary" | "outline" | "ghost" | "colored" | "gradient" ;
    className?: string;
    children: any;
    color?: string;
    onClick?:any;
}

export const Button = ({ style, children, className,onClick }: btnProps) => {
let type
    switch (style) {
        case "primary": type = "bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"; break;
        case "secondary": type = "bg-navy font-bold rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition-all"; break;
        case "outline": type = "border border-blue-200 text-gray-600 font-semibold rounded-lg px-3 py-1.5 text-sm hover:border-gray-300 hover:text-blue-600 transition-all"; break;
        case "ghost": type = "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all visited:bg-blue-50 text-blue-600 font-bold text-gray-500 hover:bg-gray-100 hover:text-navy "; break;
        case "colored": type = "flex items-center justify-center py-3 bg-navy rounded-xl text-white font-bold text-sm hover:bg-blue-700 transition-all"; break;
    }

    return <button onClick={onClick} className={`${className} ${type}`}>{children}</button>
}