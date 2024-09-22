import mark1 from "./mark1";
import mark2 from "./mark2";
import mark3 from "./mark3";
import mark4 from "./mark4";
import mark5 from "./mark5";
import mark6 from "./mark6";
import mark7 from "./mark7";
import mark8 from "./mark8";
import mark9 from "./mark9";
import mark10 from "./mark10";
import mark11 from "./mark11";
import mark12 from "./mark12";
import mark13 from "./mark13";
import mark14 from "./mark14";
import mark15 from "./mark15";
import mark16 from "./mark16";

const all_chapters = [];

for (let i = 1; i <= 16; i++) {
  const mark = require(`./mark${i}`).default; // Use default if it's a default export
  all_chapters.push(...mark);
}


const mark = [
  // { name: "All Chapters", content:  all_chapters},
  { name: "Chapter 1", content: mark1 },
  { name: "Chapter 2", content: mark2 },
  { name: "Chapter 3", content: mark3 },
  { name: "Chapter 4", content: mark4 },
  { name: "Chapter 5", content: mark5 },
  { name: "Chapter 6", content: mark6 },
  { name: "Chapter 7", content: mark7 },
  { name: "Chapter 8", content: mark8 },
  { name: "Chapter 9", content: mark9 },
  { name: "Chapter 10", content: mark10 },
  { name: "Chapter 11", content: mark11 },
  { name: "Chapter 12", content: mark12 },
  { name: "Chapter 13", content: mark13 },
  { name: "Chapter 14", content: mark14 },
  { name: "Chapter 15", content: mark15 },
  { name: "Chapter 16", content: mark16 },
];

export default mark;
