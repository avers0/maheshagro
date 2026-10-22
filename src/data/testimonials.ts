export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  crop?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ramkishan Sharma",
    location: "Daulta, Rajasthan",
    quote: "Mahesh Agro has been my go-to store for over 20 years. The quality of seeds and fertilizers is always genuine, and the staff provides excellent guidance on crop management.",
    rating: 5,
    crop: "Wheat & Mustard",
  },
  {
    name: "Suresh Patel",
    location: "Sangaria, Rajasthan",
    quote: "I saw a 30% increase in my soybean yield after following their recommendations. Truly experts in agriculture!",
    rating: 5,
    crop: "Soybean",
  },
  {
    name: "Mohan Verma",
    location: "Madhosinghpura, Rajasthan",
    quote: "The weather and mandi price tools on their website are very helpful for planning. Best agriculture center in the region.",
    rating: 5,
    crop: "Cotton & Bajra",
  },
  {
    name: "Lakhan Singh",
    location: "Jaipur, Rajasthan",
    quote: "Always genuine products, fair prices, and expert advice. Rohit Ji and the team are always ready to help us with any farming issue.",
    rating: 5,
    crop: "Paddy",
  },
];
