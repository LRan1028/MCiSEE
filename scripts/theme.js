let system = 'light';

const themeChanged = (() => {
    const value = $('.theme').val();
    if (!value) {
        $('.theme').find('mdui-segmented-button[value="system"]').click();
        $('.theme').val('system');
        return;
    };
    switch (value) {
        case 'light':
            $('#theme').attr('href', '../assets/light.css');
            $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23101010&line=%236b63ff');
            break;
        case 'dark':
            $('#theme').attr('href', '../assets/dark.css');
            $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23ffffff&line=%236b63ff');
            break;
        case 'system':
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) system = 'dark';
            $('#theme').attr('href', `../assets/${system}.css`);
            $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23101010&line=%236b63ff');
            if (system == 'dark') {
                $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23ffffff&line=%236b63ff');
            };
            break;
        case 'classic':
            const classic = new CSSStyleSheet();
            classic.insertRule(`
            div.background {
                background-image: url('../assets/image/classic.png');
                transform: none;
                filter: none;
            }`);
            $('#theme').attr('href', '../assets/light.css');
            document.adoptedStyleSheets = [classic];
            $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23101010&line=%236b63ff');
            break;
    };
});
$('.theme').change(themeChanged);
themeChanged();

// 监听变化
$(window.matchMedia('(prefers-color-scheme: dark)')).change((event) => {
    system = 'light';
    if (event.matches) system = 'dark';
    if ($('.theme').val() == 'system') themeChanged();
});
