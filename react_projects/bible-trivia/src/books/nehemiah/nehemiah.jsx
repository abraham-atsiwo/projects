
import nehemiah1 from "./nehemiah1";
import nehemiah2 from "./nehemiah2";
import nehemiah3 from "./nehemiah3";
import nehemiah4 from "./nehemiah4";
import nehemiah5 from "./nehemiah5";
import nehemiah6 from "./nehemiah6"
import nehemiah7 from "./nehemiah7"
import nehemiah8 from "./nehemiah8"
import nehemiah9 from "./nehemiah9"
import nehemiah10 from "./nehemiah10"
import nehemiah11 from "./nehemiah11"
import nehemiah12 from "./nehemiah12"
import nehemiah13 from "./nehemiah13"


const all_chapters = [];

for (let i = 1; i <= 13; i++) {
  const nehemiah = require(`./nehemiah${i}`).default; // Use default if it's a default export
  all_chapters.push(...nehemiah);
}


const nehemiah = [
  { name: "All Chapters", content: all_chapters },
    { name: "Chapter 1", content: nehemiah1 },
    { name: "Chapter 2", content: nehemiah2 },
    { name: "Chapter 3", content: nehemiah3 },
    { name: "Chapter 4", content: nehemiah4 },
    { name: "Chapter 5", content: nehemiah5 },
    { name: "Chapter 6", content: nehemiah6 },
    { name: "Chapter 7", content: nehemiah7 },
    { name: "Chapter 8", content: nehemiah8 },
    { name: "Chapter 9", content: nehemiah9  },
    { name: "Chapter 10", content: nehemiah10 },
    { name: "Chapter 11", content: nehemiah11 },
    { name: "Chapter 12", content: nehemiah12 },
    { name: "Chapter 13", content: nehemiah13 },
  ];
  
  export default nehemiah;