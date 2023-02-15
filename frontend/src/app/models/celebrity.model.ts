

export interface Celebrity {
    _id: string;
    id: string;
    date: string;
    month: string;
    category: string[],
    categoryId: string[],
    name: string,
    otherName: string,
    nickName: string,
    fullname: string,
    height: string,
    weight: string,
    gender: string,
    profession: string,
    professionId: string,
    eyeColor: string,
    hairColor: string,
    imgSrc: string,
    politicalParty: string,
    politicalPartyImgSrc: string,
    dob: {
        date: string,
        month: string,
        year: string
    },
    dod: {
        date: string,
        month: string,
        year: string
    },
    deathCause: string,
    placeOfDeath: string,
    birthPlace: string,
    nationality: string,
    hometown: string,
    school: string,
    collegeUniversity: string,
    qualification: string,
    religion: string,
    zodiacSign: string,
    bloodGroup: string,
    foodHabit: string,
    address: string,
    hobbies: string,
    debut: {
        lyrical: string,
        lyricalImgSrc: string,
        punjabiFilm: string,
        punjabiFilmImgSrc: string,
        bollywoodFilm: string,
        bollywoodFilmImgSrc: string,
        hollywoodFilm: string,
        hollywoodFilmImgSrc: string,
        tollywoodFilm: string,
        tollywoodFilmImgSrc: string,
        tamilFilm: string,
        tamilFilmImgSrc: string,
        kannadaFilm: string,
        kannadaFilmImgSrc: string,
        punjabiAlbum: string,
        punjabiAlbumImgSrc: string,
        hindiAlbum: string,
        hindiAlbumImgSrc: string,
        singles: string,
        singlesImgSrc: string,
        musicDirection: string,
        musicDirectionImgSrc: string,
        filmDirection: string,
        filmDirectionImgSrc: string,
        tv: string,
        tvImgSrc: string,
        webSeries: string,
        webSeriesImgSrc: string,
        production: string,
        productionImgSrc: string,
        filmWriter: string,
        filmWriterImgSrc: string,
        lastSong: string,
        lastSongImgSrc: string,
        lastFilm: string,
        lastFilmImgSrc: ``
    },
    awards: [
        {
            year: string,
            award: string
        }
    ],
    controversies: [
        {
            title: string,
            controversy: string
        }
    ],
    maritalStatus: string,
    affairs: string,
    affairsImgSrc: string,
    wifeOrHusband: string,
    wifeOrHusbandImgSrc: string,
    fiance: string,
    fianceImgSrc: string,
    children: {
        son: string,
        sonImgSrc: string,
        sonImgSrc1: string,
        sonImgSrc2: string,
        daughter: string,
        daughterImgSrc: string
    },
    parents: {
        father: string,
        fatherImgSrc: string,
        mother: string,
        motherImgSrc: string
    },
    siblings: {
        brother: string,
        brotherImgSrc: string,
        sister: string,
        sisterImgSrc: string
    },
    favourites: {
        fruit: string,
        beverages: string,
        actor: string,
        actress: string,
        singer: string,
        fashionBrand: string,
        colour: string,
        destination: string,
        sports: string,
        sportsman: string,
        dress: string,
        song: string,
        film: string
    }
    styleQoutient: {
        carsCollection: string,
        imgSrc: string
    },
    moneyFactor: {
        earning: string,
        netWorth: string,
        imgSrc: string
      },
    tattoos: {
          tattoo: string,
          tattooImgSrc: string,
          imgCaption: string,
          videoSrc: string
        },
    facts: {
        smoke: string,
        alcoholic: string
      },
    otherFacts: [
        {
          fact: string,
          imgSrc: string,
          imgCaption: string,
          videoSrc: string,
          instaLink: string
        }
    ],
    description: string
}