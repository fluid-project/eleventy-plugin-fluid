const parseLocale = function (locale) {
    const match = locale.match(/^(?<lang>.{2})(?:-(?<country>.{2}))*$/);

    if ( !match || !match.groups ) {
        throw `Locale ${locale} does not match regex ${this.configuration.localeRegex}`;
    }

    return {
        lang: match.groups.lang,
        locale: match.groups.country ? `${match.groups.lang}-${match.groups.country}` : match.groups.lang
    };
};

export default parseLocale;
