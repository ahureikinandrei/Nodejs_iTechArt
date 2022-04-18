export const docDefinition = {
    content: [
        'By default paragraphs are stacked one on top of (or actually - below) another. ',
        "It's possible however to split any paragraph (or even the whole document) into columns.\n\n",
        'Here we go with 2 star-sized columns, with justified text and gap set to 20:\n\n',
        {
            image: 'fonts/sampleImage.jpg',
        },
        {
            columns: [
                {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                },
                {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                },
                {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                },
            ],
        },
        "\n\nOh, don't forget, we can use everything from styling examples (named styles, custom overrides) here as well.\n\n",
        "For instance - our next paragraph will use the 'bigger' style (with fontSize set to 15 and italics - true). We'll split it into three columns and make sure they inherit the style:\n\n",
        {
            style: 'bigger',
            columns: [
                "First column (BTW - it's defined as a single string value. pdfmake will turn it into appropriate structure automatically and make sure it inherits the styles",
                {
                    fontSize: 20,
                    text: "In this column, we've overriden fontSize to 20. It means the content should have italics=true (inherited from the style) and be a little bit bigger",
                },
                {
                    style: 'header',
                    text: "Last column does not override any styling properties, but applies a new style (header) to itself. Eventually - texts here have italics=true (from bigger) and derive fontSize from the style. OK, but which one? Both styles define it. As we already know from our styling examples, multiple styles can be applied to the element and their order is important. Because 'header' style has been set after 'bigger' its fontSize takes precedence over the fontSize from 'bigger'. This is how it works. You will find more examples in the unit tests.",
                },
            ],
        },
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
        },
        bigger: {
            fontSize: 15,
            italics: true,
        },
    },
    defaultStyle: {
        columnGap: 20,
    },
};

export const createDocDefinition = (imagePath: string) => {
    const docDefinitionWhitImage = {
        content: [
            'By default paragraphs are stacked one on top of (or actually - below) another. ',
            "It's possible however to split any paragraph (or even the whole document) into columns.\n\n",
            'Here we go with 2 star-sized columns, with justified text and gap set to 20:\n\n',
            {
                image: imagePath,
                width: 150,
                height: 150,
            },
            {
                columns: [
                    {
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                    },
                    {
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                    },
                    {
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                    },
                ],
            },
            "\n\nOh, don't forget, we can use everything from styling examples (named styles, custom overrides) here as well.\n\n",
            "For instance - our next paragraph will use the 'bigger' style (with fontSize set to 15 and italics - true). We'll split it into three columns and make sure they inherit the style:\n\n",
            {
                style: 'bigger',
                columns: [
                    "First column (BTW - it's defined as a single string value. pdfmake will turn it into appropriate structure automatically and make sure it inherits the styles",
                    {
                        fontSize: 20,
                        text: "In this column, we've overriden fontSize to 20. It means the content should have italics=true (inherited from the style) and be a little bit bigger",
                    },
                    {
                        style: 'header',
                        text: "Last column does not override any styling properties, but applies a new style (header) to itself. Eventually - texts here have italics=true (from bigger) and derive fontSize from the style. OK, but which one? Both styles define it. As we already know from our styling examples, multiple styles can be applied to the element and their order is important. Because 'header' style has been set after 'bigger' its fontSize takes precedence over the fontSize from 'bigger'. This is how it works. You will find more examples in the unit tests.",
                    },
                ],
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
            bigger: {
                fontSize: 15,
                italics: true,
            },
        },
        defaultStyle: {
            columnGap: 20,
        },
    };

    return docDefinitionWhitImage;
};
