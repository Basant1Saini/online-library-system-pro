/**
 * The initial state containing a list of books categorized by genre.
 * @type {{ books: Array<{ id: number, title: string, author: string, category: string, description: string, rating: number }> }}
 */
export const initialState = {
    books: [
    { id: 1, title: 'The White Tiger', author: 'Aravind Adiga', category: 'Fiction', description: 'A darkly humorous perspective on India\'s class struggle in a globalized world, winner of the Booker Prize.', rating: 4.3 },
    { id: 2, title: 'Midnight\'s Children', author: 'Salman Rushdie', category: 'Fiction', description: 'A historical and magical realist novel about India\'s transition from British colonialism to independence.', rating: 4.2 },
    { id: 3, title: 'The God of Small Things', author: 'Arundhati Roy', category: 'Fiction', description: 'A family saga set in Kerala, exploring love, caste, and forbidden relationships.', rating: 4.4 },
    { id: 4, title: 'A Suitable Boy', author: 'Vikram Seth', category: 'Fiction', description: 'A sweeping tale of four families in post-partition India, one of the longest novels in English.', rating: 4.7 },
    { id: 5, title: 'Train to Pakistan', author: 'Khushwant Singh', category: 'Fiction', description: 'A poignant narrative of the partition of India and its impact on a small village.', rating: 4.5 },
    { id: 6, title: 'The Guide', author: 'R.K. Narayan', category: 'Fiction', description: 'The story of Raju, a tour guide who becomes a spiritual guide, set in the fictional town of Malgudi.', rating: 4.1 },
    { id: 7, title: 'The Discovery of India', author: 'Jawaharlal Nehru', category: 'Non-Fiction', description: 'An exploration of Indian history and culture by India\'s first Prime Minister, written in prison.', rating: 4.6 },
    { id: 8, title: 'India After Gandhi', author: 'Ramachandra Guha', category: 'Non-Fiction', description: 'A comprehensive analysis of the history of independent India from 1947 onwards.', rating: 4.8 },
    { id: 9, title: 'The Argumentative Indian', author: 'Amartya Sen', category: 'Non-Fiction', description: 'An exploration of the rich traditions of argument and debate in Indian culture and history.', rating: 4.5 },
    { id: 10, title: 'An Era of Darkness', author: 'Shashi Tharoor', category: 'Non-Fiction', description: 'A critical reflection on the British Empire in India and its lasting impact.', rating: 4.4 },
    { id: 11, title: 'Nine Lives', author: 'William Dalrymple', category: 'Non-Fiction', description: 'In search of the sacred in modern India, exploring religious devotion across the subcontinent.', rating: 4.3 },
    { id: 12, title: 'My Story', author: 'Kamala Das', category: 'Non-Fiction', description: 'An autobiographical work by one of India\'s most celebrated poets and writers.', rating: 4.2 },
    { id: 13, title: 'The Calcutta Chromosome', author: 'Amitav Ghosh', category: 'Sci-Fi', description: 'A medical thriller that mixes science fiction with colonial history and malaria research.', rating: 4.1 },
    { id: 14, title: 'The Immortals of Meluha', author: 'Amish Tripathi', category: 'Sci-Fi', description: 'The first book in the Shiva Trilogy, reimagining Lord Shiva as a human hero in ancient India.', rating: 4.5 },
    { id: 15, title: 'The Secret of the Nagas', author: 'Amish Tripathi', category: 'Sci-Fi', description: 'The second book in the Shiva Trilogy, continuing the mythological adventure.', rating: 4.4 },
    { id: 16, title: 'River of Gods', author: 'Ian McDonald', category: 'Sci-Fi', description: 'A cyberpunk novel set in a futuristic India in 2047, exploring AI and biotechnology.', rating: 4.0 },
    { id: 17, title: 'The Rozabal Line', author: 'Ashwin Sanghi', category: 'Sci-Fi', description: 'A thriller that weaves together history, religion, and conspiracy theories.', rating: 3.9 },
    { id: 18, title: 'Sultana\'s Dream', author: 'Rokeya Sakhawat Hossain', category: 'Sci-Fi', description: 'A pioneering feminist utopian story from 1905, set in a world ruled by women.', rating: 4.2 }
  ],
};