const game = [
  {
    id: "halo",
    title: "HALO",
    imageSrc: "/img/halo.jpeg",
    imageAlt: "HALO cover",
    website: "https://www.xbox.com/en-US/games/halo",

    genre: "Action",
    artStyle: "Sci-Fi",
    tag: "FPS",
    playerMode: "Multiplayer",
    playTime: "Long",
    difficulty: "Normal",
    rating: "Popular",

    developer: "Bungie",
    publishDate: "2001-11-15",

    description:
      "A sci-fi FPS featuring large-scale battles, co-op campaigns, and competitive multiplayer modes.",
    averageRating: 4.5,
    userRating: null,

    comments: [
      {
        id: "c1",
        author: "User123",
        time: "2 days ago",
        text: "Really enjoyed the campaign and co-op mode.",
      },
      {
        id: "c2",
        author: "Gamer456",
        time: "1 week ago",
        text: "Multiplayer is fun, but needs more maps.",
      },
      {
        id: "c3",
        author: "NewPlayer",
        time: "3 weeks ago",
        text: "Great tutorial and amazing graphics.",
      },
    ],
  },

  {
    id: "sekiro",
    title: "Sekiro",
    imageSrc: "/img/Sekiro.jpg",
    imageAlt: "Sekiro cover",
    website: "https://www.fromsoftware.jp",

    genre: "Action",
    artStyle: "Soulslike",
    tag: "Sword Combat",
    playerMode: "Single Player",
    playTime: "Medium",
    difficulty: "Hard",
    rating: "Top Rated",

    developer: "FromSoftware",
    publishDate: "2019-03-22",

    description: "A challenging action game focused on precise sword combat and stealth.",
    averageRating: 4.9,
    userRating: null,
    comments: []
  },

  {
    id: "animal-crossing",
    title: "Animal Crossing",
    imageSrc: "/img/animalcrossing.avif",
    imageAlt: "Animal Crossing cover",
    website: "https://animalcrossing.nintendo.com/new-horizons/",

    genre: "RPG",
    artStyle: "Cute",
    tag: "Animals",
    playerMode: "Single Player",
    playTime: "Long",
    difficulty: "Easy",
    rating: "Relaxing",

    developer: "Nintendo EPD",
    publishDate: "2020-03-20",

    description: "Animal Crossing is a relaxing social simulation game.",
    averageRating: 4.8,
    userRating: null,
    comments: []
  },

  {
    id: "league-legends",
    title: "League of Legends",
    imageSrc: "/img/league.jpg",
    imageAlt: "League of Legends cover",
    website: "https://www.leagueoflegends.com/en-us/",

    genre: "MOBA",
    artStyle: "Fantasy",
    tag: "Competitive",
    playerMode: "Multiplayer",
    playTime: "Medium",
    difficulty: "Hard",
    rating: "Popular",

    developer: "Riot Games",
    publishDate: "2009-10-27",

    description: "A fast-paced competitive MMORPG-style MOBA game.",
    averageRating: 3.5,
    userRating: null,
    comments: []
  },

  {
    id: "elden-ring",
    title: "Elden Ring",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    imageAlt: "Elden Ring cover",
    website: "https://store.steampowered.com/app/1245620/ELDEN_RING/",

    genre: "RPG",
    artStyle: "Fantasy",
    tag: "Open World",
    playerMode: "Single Player",
    playTime: "Long (20~60h)",
    difficulty: "Hardcore",
    rating: "Top Rated",

    developer: "FromSoftware",
    publishDate: "2022-02-25",

    description:
      "An action RPG set in a vast open world crafted by Hidetaka Miyazaki and George R.R. Martin. Explore the Lands Between, conquer demigods, and claim the Elden Ring.",
    averageRating: 4.9,
    userRating: null,
    comments: [
      { id: "er-c1", author: "TarnishedOne", time: "1 day ago", text: "Best open world RPG I've ever played. Every corner hides something incredible." },
      { id: "er-c2", author: "SoulsFan", time: "5 days ago", text: "Challenging but incredibly rewarding. The world design is unmatched." }
    ]
  },

  {
    id: "stardew-valley",
    title: "Stardew Valley",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
    imageAlt: "Stardew Valley cover",
    website: "https://store.steampowered.com/app/413150/Stardew_Valley/",

    genre: "Simulation",
    artStyle: "Pixel / Retro",
    tag: "Crafting",
    playerMode: "Single Player",
    playTime: "Endless / Replayable",
    difficulty: "Easy",
    rating: "Hidden Gems",

    developer: "ConcernedApe",
    publishDate: "2016-02-26",

    description:
      "Inherit your grandfather's farm and build it from scratch. Grow crops, raise animals, mine for resources, and build relationships with the townspeople.",
    averageRating: 4.9,
    userRating: null,
    comments: [
      { id: "sv-c1", author: "FarmerJane", time: "2 days ago", text: "So relaxing and charming. Made by a single developer — truly impressive." },
      { id: "sv-c2", author: "CozyGamer", time: "1 week ago", text: "I've put 400 hours in and still find new things to do." }
    ]
  },

  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    imageAlt: "Cyberpunk 2077 cover",
    website: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",

    genre: "RPG",
    artStyle: "Sci-Fi",
    tag: "Open World",
    playerMode: "Single Player",
    playTime: "Long (20~60h)",
    difficulty: "Normal",
    rating: "Trending",

    developer: "CD Projekt Red",
    publishDate: "2020-12-10",

    description:
      "A story-driven open-world RPG set in the megalopolis Night City. Play as V, a mercenary outlaw pursuing a one-of-a-kind implant that is the key to immortality.",
    averageRating: 4.4,
    userRating: null,
    comments: [
      { id: "cp-c1", author: "NightCityV", time: "3 days ago", text: "Post-patch this game is phenomenal. Night City feels truly alive." }
    ]
  },

  {
    id: "witcher-3",
    title: "The Witcher 3: Wild Hunt",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    imageAlt: "The Witcher 3 cover",
    website: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/",

    genre: "RPG",
    artStyle: "Fantasy",
    tag: "Story-rich",
    playerMode: "Single Player",
    playTime: "Very Long (60+h)",
    difficulty: "Normal",
    rating: "Award-winning",

    developer: "CD Projekt Red",
    publishDate: "2015-05-19",

    description:
      "Play as a professional monster hunter in a visually stunning fantasy universe. Track down the Child of Prophecy in a morally complex, open-world RPG.",
    averageRating: 4.9,
    userRating: null,
    comments: [
      { id: "w3-c1", author: "GeraltFan", time: "4 days ago", text: "The best RPG ever made. 200 hours and I still find new quests." },
      { id: "w3-c2", author: "QuestRunner", time: "2 weeks ago", text: "Side quests are better than most games' main stories." }
    ]
  },

  {
    id: "hollow-knight",
    title: "Hollow Knight",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
    imageAlt: "Hollow Knight cover",
    website: "https://store.steampowered.com/app/367520/Hollow_Knight/",

    genre: "Adventure",
    artStyle: "Hand-drawn",
    tag: "Exploration",
    playerMode: "Single Player",
    playTime: "Medium (5~20h)",
    difficulty: "Hard",
    rating: "Hidden Gems",

    developer: "Team Cherry",
    publishDate: "2017-02-24",

    description:
      "A beautifully hand-crafted metroidvania set in the vast underground kingdom of Hallownest. Explore twisting caverns, battle tainted creatures, and unravel an ancient mystery.",
    averageRating: 4.8,
    userRating: null,
    comments: [
      { id: "hk-c1", author: "BugKnight", time: "1 week ago", text: "Incredible atmosphere and tight controls. One of the best indie games ever." }
    ]
  },

  {
    id: "portal-2",
    title: "Portal 2",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg",
    imageAlt: "Portal 2 cover",
    website: "https://store.steampowered.com/app/620/Portal_2/",

    genre: "Puzzle",
    artStyle: "Sci-Fi",
    tag: "Story-rich",
    playerMode: "Local Co-op",
    playTime: "Short (< 5h)",
    difficulty: "Normal",
    rating: "Award-winning",

    developer: "Valve",
    publishDate: "2011-04-19",

    description:
      "Use a portal gun to solve mind-bending puzzles in Aperture Science. Featuring a hilarious story and a brilliantly designed co-op campaign.",
    averageRating: 4.9,
    userRating: null,
    comments: [
      { id: "p2-c1", author: "GladosFan", time: "3 days ago", text: "Still the gold standard for puzzle games. The writing is chef's kiss." },
      { id: "p2-c2", author: "CoopMaster", time: "1 week ago", text: "The co-op mode is an absolute blast with a friend." }
    ]
  },

  {
    id: "red-dead-2",
    title: "Red Dead Redemption 2",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    imageAlt: "Red Dead Redemption 2 cover",
    website: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/",

    genre: "Adventure",
    artStyle: "Realistic",
    tag: "Open World",
    playerMode: "Single Player",
    playTime: "Very Long (60+h)",
    difficulty: "Normal",
    rating: "Award-winning",

    developer: "Rockstar Games",
    publishDate: "2019-12-05",

    description:
      "Epic tale of life in America's unforgiving heartland. The game's vast and atmospheric world provides the foundation for a brand new online multiplayer experience.",
    averageRating: 4.8,
    userRating: null,
    comments: [
      { id: "rdr-c1", author: "CowboyArthur", time: "2 days ago", text: "The most immersive open world ever created. Arthur Morgan is an unforgettable character." }
    ]
  },

  {
    id: "celeste",
    title: "Celeste",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg",
    imageAlt: "Celeste cover",
    website: "https://store.steampowered.com/app/504230/Celeste/",

    genre: "Puzzle",
    artStyle: "Pixel / Retro",
    tag: "Story-rich",
    playerMode: "Single Player",
    playTime: "Short (< 5h)",
    difficulty: "Hardcore",
    rating: "Award-winning",

    developer: "Maddy Makes Games",
    publishDate: "2018-01-25",

    description:
      "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain in this precise platformer. Features a heartfelt story about mental health.",
    averageRating: 4.8,
    userRating: null,
    comments: [
      { id: "cel-c1", author: "PlatformKing", time: "5 days ago", text: "The best modern platformer. The story made me cry and the gameplay made me rage (in a good way)." }
    ]
  },

  {
    id: "among-us",
    title: "Among Us",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
    imageAlt: "Among Us cover",
    website: "https://store.steampowered.com/app/945360/Among_Us/",

    genre: "Strategy",
    artStyle: "Cartoon",
    tag: "Multiplayer",
    playerMode: "Online Co-op",
    playTime: "Short (< 5h)",
    difficulty: "Easy",
    rating: "Most Played",

    developer: "Innersloth",
    publishDate: "2018-06-15",

    description:
      "Work together to prepare your spaceship for departure, but beware — impostors among the crew are working to sabotage your mission and eliminate the crew.",
    averageRating: 4.0,
    userRating: null,
    comments: [
      { id: "au-c1", author: "SusPlayer", time: "1 week ago", text: "Perfect party game. Gets hilarious with the right group of friends." }
    ]
  },

  {
    id: "god-of-war",
    title: "God of War",
    imageSrc: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
    imageAlt: "God of War cover",
    website: "https://store.steampowered.com/app/1593500/God_of_War/",

    genre: "Action",
    artStyle: "Realistic",
    tag: "Story-rich",
    playerMode: "Single Player",
    playTime: "Medium (5~20h)",
    difficulty: "Hard",
    rating: "Award-winning",

    developer: "Santa Monica Studio",
    publishDate: "2022-01-14",

    description:
      "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods. A second chance for a father as he teaches his son Atreus the ways of their world.",
    averageRating: 4.9,
    userRating: null,
    comments: [
      { id: "gow-c1", author: "BoyPlayer", time: "3 days ago", text: "Masterpiece. The relationship between Kratos and Atreus is beautifully written." },
      { id: "gow-c2", author: "NordicFan", time: "1 week ago", text: "Combat is incredibly satisfying and the world design is stunning." }
    ]
  }
];

export default game;
