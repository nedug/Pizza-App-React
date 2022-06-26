import React from 'react';
import ContentLoader from 'react-content-loader';


export const SkeletonPizza = (props: {}) => {

    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#d3cfcf"
            {...props}
        >
            <circle cx="137" cy="130" r="120" />
            <rect x="0" y="275" rx="10" ry="10" width="280" height="19" />
            <rect x="-1" y="390" rx="14" ry="14" width="130" height="25" />
            <rect x="163" y="380" rx="15" ry="15" width="118" height="40" />
            <rect x="0" y="320" rx="13" ry="13" width="280" height="40" />
        </ContentLoader>
    )
};


