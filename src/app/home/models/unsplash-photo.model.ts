interface UnsplashPhotoUrls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

interface UnsplashPhotoUser {
    name: string;
    portfolio_url: string;
    links: {
        portfolio: string;
    };
    profile_image: {
        small: string;
        medium: string;
        large: string;
    };
}


export interface UnsplashPhoto {
    urls: UnsplashPhotoUrls;
    user: UnsplashPhotoUser;
}
