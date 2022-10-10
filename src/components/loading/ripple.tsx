import "./Ripple.css";

export type RippleProps = {
    color?: string,
    size?: number,
    duration?: number,
    className?: string,
    [key: string]: any
}

const LoadingRipple = () => {
    return (
        <div className="container loading-ripple">
            <div className="loading-ripple__item"></div>
            <div className="loading-ripple__item"></div>
            <div className="loading-ripple__item"></div>
        </div>
    )
}

export default LoadingRipple;