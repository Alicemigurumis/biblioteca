import { Media, Tag } from '../types';

// Movies
export const movies: Media[] = [
  {
    id: 'm1',
    type: 'movies',
    title: 'Inception',
    year: '2010',
    coverImage: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    tags: ['Sci-Fi', 'Action', 'Thriller'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    creator: 'Christopher Nolan',
    dateAdded: '2023-04-15',
    reviewText: 'Mind-bending and visually stunning. One of Nolan\'s best works that requires multiple viewings to fully appreciate.',
    additionalInfo: {
      runtime: '148 min',
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page']
    }
  },
  {
    id: 'm2',
    type: 'movies',
    title: 'The Shawshank Redemption',
    year: '1994',
    coverImage: 'https://images.pexels.com/photos/4065906/pexels-photo-4065906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    tags: ['Drama'],
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    creator: 'Frank Darabont',
    dateAdded: '2023-03-10',
    reviewText: 'A timeless masterpiece about hope and redemption. The character development and storytelling are unparalleled.',
    additionalInfo: {
      runtime: '142 min',
      cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton']
    }
  },
  {
    id: 'm3',
    type: 'movies',
    title: 'Parasite',
    year: '2019',
    coverImage: 'https://images.pexels.com/photos/8828186/pexels-photo-8828186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    tags: ['Thriller', 'Drama', 'Comedy'],
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    creator: 'Bong Joon Ho',
    dateAdded: '2023-05-22',
    reviewText: 'A brilliant social commentary that seamlessly blends genres. Unpredictable and thought-provoking throughout.',
    additionalInfo: {
      runtime: '132 min',
      cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong']
    }
  },
  {
    id: 'm4',
    type: 'movies',
    title: 'The Dark Knight',
    year: '2008',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    tags: ['Action', 'Crime', 'Drama'],
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    creator: 'Christopher Nolan',
    dateAdded: '2023-02-05',
    reviewText: 'Heath Ledger\'s Joker is unforgettable. A superhero film that transcends the genre and becomes a compelling crime drama.',
    additionalInfo: {
      runtime: '152 min',
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart']
    }
  },
  {
    id: 'm5',
    type: 'movies',
    title: 'Pulp Fiction',
    year: '1994',
    coverImage: 'https://images.pexels.com/photos/5727885/pexels-photo-5727885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    tags: ['Crime', 'Drama'],
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    creator: 'Quentin Tarantino',
    dateAdded: '2023-01-18',
    reviewText: 'Tarantino at his best. Nonlinear storytelling, memorable dialogue, and iconic scenes make this a modern classic.',
    additionalInfo: {
      runtime: '154 min',
      cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson']
    }
  },
  {
    id: 'm6',
    type: 'movies',
    title: 'Everything Everywhere All at Once',
    year: '2022',
    coverImage: 'https://images.pexels.com/photos/6203796/pexels-photo-6203796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    tags: ['Action', 'Adventure', 'Sci-Fi'],
    description: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.',
    creator: 'Daniel Kwan, Daniel Scheinert',
    dateAdded: '2023-06-14',
    reviewText: 'A mind-bending journey that balances action, emotion, and absurdist humor perfectly. Michelle Yeoh delivers an outstanding performance.',
    additionalInfo: {
      runtime: '139 min',
      cast: ['Michelle Yeoh', 'Stephanie Hsu', 'Ke Huy Quan']
    }
  }
];

// TV Shows
export const tvShows: Media[] = [
  {
    id: 't1',
    type: 'tv-shows',
    title: 'Breaking Bad',
    year: '2008-2013',
    coverImage: 'https://images.pexels.com/photos/6611936/pexels-photo-6611936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    tags: ['Crime', 'Drama', 'Thriller'],
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    creator: 'Vince Gilligan',
    dateAdded: '2023-01-10',
    reviewText: 'The character development of Walter White from mild-mannered teacher to ruthless drug kingpin is unmatched in television history.',
    additionalInfo: {
      seasons: 5,
      episodes: 62
    }
  },
  {
    id: 't2',
    type: 'tv-shows',
    title: 'Succession',
    year: '2018-2023',
    coverImage: 'https://images.pexels.com/photos/7245493/pexels-photo-7245493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    tags: ['Drama'],
    description: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.',
    creator: 'Jesse Armstrong',
    dateAdded: '2023-05-30',
    reviewText: 'Sharp writing, incredible performances, and an unflinching look at wealth and power. One of the best shows of the decade.',
    additionalInfo: {
      seasons: 4,
      episodes: 39
    }
  },
  {
    id: 't3',
    type: 'tv-shows',
    title: 'The Wire',
    year: '2002-2008',
    coverImage: 'https://images.pexels.com/photos/4004374/pexels-photo-4004374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    tags: ['Crime', 'Drama', 'Thriller'],
    description: 'Baltimore drug scene, seen through the eyes of drug dealers and law enforcement.',
    creator: 'David Simon',
    dateAdded: '2023-02-20',
    reviewText: 'A profound and realistic portrayal of urban life in America. Each season explores different institutions and their impact on society.',
    additionalInfo: {
      seasons: 5,
      episodes: 60
    }
  },
  {
    id: 't4',
    type: 'tv-shows',
    title: 'Fleabag',
    year: '2016-2019',
    coverImage: 'https://images.pexels.com/photos/5662857/pexels-photo-5662857.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    tags: ['Comedy', 'Drama'],
    description: 'A comedy series adapted from the award-winning play about a young woman trying to cope with life in London whilst coming to terms with a recent tragedy.',
    creator: 'Phoebe Waller-Bridge',
    dateAdded: '2023-03-15',
    reviewText: 'Phoebe Waller-Bridge creates a character that is flawed, complex, and utterly compelling. The fourth-wall breaking narration adds another layer of intimacy.',
    additionalInfo: {
      seasons: 2,
      episodes: 12
    }
  }
];

// Books
export const books: Media[] = [
  {
    id: 'b1',
    type: 'books',
    title: 'The Midnight Library',
    year: '2020',
    coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4,
    tags: ['Fiction', 'Fantasy', 'Philosophy'],
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    creator: 'Matt Haig',
    dateAdded: '2023-04-05',
    reviewText: 'A thought-provoking exploration of regret and possibility. The concept is fascinating, though some of the parallel lives feel rushed.',
    additionalInfo: {
      pages: 304,
      publisher: 'Viking'
    }
  },
  {
    id: 'b2',
    type: 'books',
    title: 'Project Hail Mary',
    year: '2021',
    coverImage: 'https://images.pexels.com/photos/4153146/pexels-photo-4153146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    tags: ['Sci-Fi', 'Adventure'],
    description: 'A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian.',
    creator: 'Andy Weir',
    dateAdded: '2023-05-12',
    reviewText: 'Andy Weir delivers another science-heavy, character-driven space adventure. The friendship that develops is unexpected and heartwarming.',
    additionalInfo: {
      pages: 496,
      publisher: 'Ballantine Books'
    }
  },
  {
    id: 'b3',
    type: 'books',
    title: 'Educated',
    year: '2018',
    coverImage: 'https://images.pexels.com/photos/3747163/pexels-photo-3747163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    tags: ['Memoir', 'Biography'],
    description: 'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    creator: 'Tara Westover',
    dateAdded: '2023-02-28',
    reviewText: 'A powerful testament to the importance of education and self-invention. Westover\'s journey is both shocking and inspiring.',
    additionalInfo: {
      pages: 334,
      publisher: 'Random House'
    }
  },
  {
    id: 'b4',
    type: 'books',
    title: 'The Song of Achilles',
    year: '2011',
    coverImage: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    tags: ['Historical Fiction', 'Fantasy', 'Romance'],
    description: 'A tale of gods, kings, immortal fame, and the human heart, The Song of Achilles is a dazzling literary feat that brilliantly reimagines Homer\'s enduring masterwork, The Iliad.',
    creator: 'Madeline Miller',
    dateAdded: '2023-03-20',
    reviewText: 'Miller\'s prose is lyrical and evocative. She brings the ancient world to life while creating a love story that feels timeless and profound.',
    additionalInfo: {
      pages: 352,
      publisher: 'Ecco'
    }
  },
  {
    id: 'b5',
    type: 'books',
    title: 'Klara and the Sun',
    year: '2021',
    coverImage: 'https://images.pexels.com/photos/3651820/pexels-photo-3651820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4,
    tags: ['Sci-Fi', 'Literary Fiction'],
    description: 'From the bestselling author of Never Let Me Go and The Remains of the Day, a novel that asks, what does it mean to love?',
    creator: 'Kazuo Ishiguro',
    dateAdded: '2023-06-02',
    reviewText: 'Ishiguro explores consciousness and humanity through the perspective of an artificial friend. Subtle and moving in its examination of love and sacrifice.',
    additionalInfo: {
      pages: 303,
      publisher: 'Knopf'
    }
  }
];

// All media combined
export const allMedia: Media[] = [...movies, ...tvShows, ...books];

// Tags
export const tags: Tag[] = [
  { id: 'tag1', name: 'Sci-Fi', mediaCount: 5, coverImage: 'https://images.pexels.com/photos/6203796/pexels-photo-6203796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'tag2', name: 'Drama', mediaCount: 8, coverImage: 'https://images.pexels.com/photos/4065906/pexels-photo-4065906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'tag3', name: 'Action', mediaCount: 4, coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'tag4', name: 'Thriller', mediaCount: 5, coverImage: 'https://images.pexels.com/photos/8828186/pexels-photo-8828186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'tag5', name: 'Comedy', mediaCount: 3, coverImage: 'https://images.pexels.com/photos/5662857/pexels-photo-5662857.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'tag6', name: 'Fantasy', mediaCount: 3, coverImage: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'tag7', name: 'Crime', mediaCount: 4, coverImage: 'https://images.pexels.com/photos/5727885/pexels-photo-5727885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'tag8', name: 'Biography', mediaCount: 1, coverImage: 'https://images.pexels.com/photos/3747163/pexels-photo-3747163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'tag9', name: 'Romance', mediaCount: 1, coverImage: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'tag10', name: 'Adventure', mediaCount: 2, coverImage: 'https://images.pexels.com/photos/4153146/pexels-photo-4153146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
];

// Helper function to get media by type
export const getMediaByType = (type: 'movies' | 'tv-shows' | 'books') => {
  return allMedia.filter(media => media.type === type);
};

// Helper function to get media by id
export const getMediaById = (id: string) => {
  return allMedia.find(media => media.id === id);
};

// Helper function to get media by tag
export const getMediaByTag = (tagName: string) => {
  return allMedia.filter(media => media.tags.includes(tagName));
};

// Helper function to get recently added media
export const getRecentlyAddedMedia = (limit = 6) => {
  return [...allMedia]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, limit);
};

// Helper function to get top rated media
export const getTopRatedMedia = (limit = 6) => {
  return [...allMedia]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};