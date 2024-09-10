const parseLocale = function (locale) {
    const localeRegex = /^(?<lang>.{2})(?:-(?<country>.{2}))*$/;
    const match = locale.match(localeRegex);

    if ( !match || !match.groups ) {
        throw new Error(`Locale ${locale} does not match regex ${localeRegex}`);
    }

    return {
        lang: match.groups.lang,
        locale: match.groups.country ? `${match.groups.lang}-${match.groups.country}` : match.groups.lang
    };
};

export default parseLocale;
