export type Movie = {
  id: string;
  title: string;
  thumbnail: string;
  banner: string;
  hlsUrl: string;
  tag?: string;
  poster?: string;
  releaseYear?: number;
  description?: string;
};

export const movies: Movie[] = [
  {
    id: 'prince',
    title: 'Prince',
    thumbnail: 'https://img2.dharvix.com/prince_thumbnail.jpg',
    banner: 'https://img2.dharvix.com/Prince_banner.png',
    poster: 'https://img2.dharvix.com/Prince_poster.png',
    hlsUrl:
      'https://stream2.dharvix.com/c5b7c749-7b9a-4a7a-bc32-e7409bb6c429/playlist.m3u8',
    tag: 'Action',
    releaseYear: 2021,
    description:
      'A high-octane action thriller about a lone agent navigating dangerous political games. When loyalties blur and every corner hides a new threat, the agent must outsmart powerful enemies and confront their past to survive. Expect pulse-pounding set pieces, unexpected betrayals, and a relentless pace that keeps you on edge.',
  },
  {
    id: 'love-story-1998',
    title: 'Love Story 1998',
    thumbnail: 'https://img2.dharvix.com/love%20story_thumbnail.jpg',
    banner: 'https://img2.dharvix.com/LoveStory_banner.png',
    poster: 'https://img2.dharvix.com/LoveStory1998_poster.png',
    hlsUrl:
      'https://stream2.dharvix.com/f6d00a05-a224-4257-bfcf-fa4b205d7ee4/playlist.m3u8',
    tag: 'Romance',
    releaseYear: 1998,
    description:
      'An intimate romantic drama following two souls finding love against the odds. Spanning years of chance encounters and quiet moments, this story explores how memory, sacrifice, and stubborn devotion shape a bond that refuses to break. Tender performances and bittersweet turns culminate in a deeply human portrait of love.',
  },
  {
    id: 'alpha',
    title: 'Alpha',
    thumbnail: 'https://img2.dharvix.com/Alpha_banner.png',
    banner: 'https://img2.dharvix.com/Alpha_banner.png',
    poster: 'https://img2.dharvix.com/Alpha_poster.png',
    hlsUrl:
      'https://stream2.dharvix.com/a0683ab3-638f-4c9d-a9f6-f9ddc1df09e5/playlist.m3u8',
    tag: 'Drama',
    releaseYear: 2019,
    description:
      "A character-driven drama about loss, hope, and the ties that bind. Through careful, haunting visuals and intimate storytelling, it traces the fragile reconnections between estranged family members and the small, stubborn ways they heal. It's a quiet yet powerful study of resilience and the choices that define us.",
  },
  {
    id: 'held-for-ransom',
    title: 'Held for Ransom',
    thumbnail: 'https://img2.dharvix.com/Heldforransom_thumbnail.jpg',
    banner: 'https://img2.dharvix.com/HeldToRansom_banner.png',
    poster: 'https://img2.dharvix.com/HeldForRansom_poster.png',
    hlsUrl:
      'https://stream2.dharvix.com/ac7dcece-3b9d-419e-aa39-739b25aa26f2/playlist.m3u8',
    tag: 'Thriller',
    releaseYear: 2017,
    description:
      "A tense thriller about a family's fight to survive when everything is taken. As pressure mounts, secrets emerge and alliances falter in a race against time. With tight pacing and harrowing confrontations, the film tests the limits of courage and the cost of survival.",
  },
  {
    id: 'alien-attack',
    title: 'Alien Attack',
    thumbnail: 'https://img2.dharvix.com/Alianattack_thumbnail.jpg',
    banner: 'https://img2.dharvix.com/AlienAttack_banner.png',
    poster: 'https://img2.dharvix.com/AlienAttack_Poster.png',
    hlsUrl:
      'https://stream2.dharvix.com/eb741106-ce31-4e51-b2dc-2facfe609ecf/playlist.m3u8',
    tag: 'Sci-Fi',
    releaseYear: 2023,
    description:
      'A sci-fi spectacle where humanity faces an otherworldly threat and must unite. Cosmic-scale action collides with intimate human drama as disparate characters are drawn together to face an existential danger. Expect inventive visuals, relentless stakes, and a story about what it means to be human under pressure.',
  },
];
