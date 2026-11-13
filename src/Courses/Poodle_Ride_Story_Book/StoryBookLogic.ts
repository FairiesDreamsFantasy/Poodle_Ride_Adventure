export interface BookPage {
  text: string;
  imageAlt: string;
}

export const STORY_BOOK_PAGES: BookPage[] = [
  {
    text: "Once upon a time, a group of poodles gathered for a special tea party.",
    imageAlt: "Three poodles sitting at a wooden table with tea cups. One is blue, one is yellow, and one is green."
  },
  {
    text: "They lived in a welcoming house with mirrored walls that reflected the beauty of the dream forest.",
    imageAlt: "A cozy room with mirrors on the walls, reflecting a forest of blue and pink flowers."
  },
  {
    text: "The sun was golden, and the river Nile flowed nearby, where elephants bathed peacefully.",
    imageAlt: "A golden sun over a river. An elephant is in the background near some palm trees."
  },
  {
    text: "And they all lived happily ever after in the world of dreams.",
    imageAlt: "The poodles waving from their front porch under a rainbow sky."
  }
];

export interface ToyState {
  isRiding: boolean;
  currentPage: number;
  isRocking: boolean;
}

export const INITIAL_TOY_STATE: ToyState = {
  isRiding: false,
  currentPage: 0,
  isRocking: false
};
