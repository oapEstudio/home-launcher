const buildDomainVariants = (hostname: string): string[] => {
    if (!hostname) return [];
    const parts = hostname.split('.');
    if (parts.length <= 1) {
        return [hostname];
    }

    const variants: string[] = [];
    for (let i = 0; i < parts.length - 1; i += 1) {
        const domain = parts.slice(i).join('.');
        variants.push(domain);
        variants.push(`.${domain}`);
    }

    variants.push(hostname);
    variants.push(`.${hostname}`);

    return Array.from(new Set(variants));
};

export const clearClientCookies = (): void => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return;
    }

    const cookies = document.cookie ? document.cookie.split(';') : [];
    if (cookies.length === 0) {
        return;
    }

    const expiration = 'Thu, 01 Jan 1970 00:00:00 GMT';
    const baseAttributes = `expires=${expiration}; path=/`;
    const domainVariants = buildDomainVariants(window.location.hostname);

    cookies.forEach((cookie) => {
        const separatorIndex = cookie.indexOf('=');
        const name = (separatorIndex >= 0 ? cookie.substring(0, separatorIndex) : cookie).trim();
        if (!name) {
            return;
        }

        document.cookie = `${name}=; ${baseAttributes}`;
        domainVariants.forEach((domain) => {
            document.cookie = `${name}=; ${baseAttributes}; domain=${domain}`;
        });
    });
};